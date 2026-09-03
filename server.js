const express = require("express");
const http = require("http");
const fs = require("fs");
const path = require("path");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("public"));
app.use(express.json());

// ---------- Translate provider config ----------
// Reads config.json (gitignored) if present:
//   { "sarvamApiKey": "...", "googleTranslateApiKey": "..." }
// Priority: Sarvam (best for Gujarati) -> Google (if configured) -> MyMemory
// (free, no key, always available as the last resort).
let sarvamApiKey = null;
let translateApiKey = null; // Google
try {
  const configPath = path.join(__dirname, "config.json");
  if (fs.existsSync(configPath)) {
    const config = JSON.parse(fs.readFileSync(configPath, "utf8"));
    sarvamApiKey = config.sarvamApiKey || null;
    translateApiKey = config.googleTranslateApiKey || null;
  }
} catch (err) {
  console.warn("Could not read config.json — falling back to free translation only.", err.message);
}

function activeProvider() {
  if (sarvamApiKey) return "sarvam";
  if (translateApiKey) return "google";
  return "mymemory";
}

app.get("/api/translate-status", (req, res) => {
  res.json({
    available: true, // MyMemory works with no key at all, so this is always true
    provider: activeProvider(),
  });
});

// Proxy endpoint: translates server-side so any API key stays out of the
// browser. Tries Sarvam first (best quality for Gujarati), then Google if
// configured, then MyMemory (free, no key, no billing card, small daily
// limit — good enough for a hackathon demo) as the last resort.
app.post("/api/translate", async (req, res) => {
  const { text, target } = req.body || {};
  if (!text || !target) {
    return res.status(400).json({ error: "Missing text or target language." });
  }
  const source = target === "gu" ? "en" : "gu";

  // --- Try Sarvam first, only if a key is configured ---
  if (sarvamApiKey) {
    try {
      const response = await fetch("https://api.sarvam.ai/translate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "api-subscription-key": sarvamApiKey,
        },
        body: JSON.stringify({
          input: text,
          source_language_code: `${source}-IN`,
          target_language_code: `${target}-IN`,
        }),
      });
      const data = await response.json();
      if (response.ok && data.translated_text) {
        return res.json({ translated: data.translated_text, provider: "sarvam" });
      }
      console.warn("Sarvam translate failed, trying next provider:", data.error || data);
    } catch (err) {
      console.warn("Sarvam translate error, trying next provider:", err.message);
    }
  }

  // --- Try Google Translate next, only if a key is configured ---
  if (translateApiKey) {
    try {
      const url = `https://translation.googleapis.com/language/translate2?key=${translateApiKey}`;
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ q: text, target, format: "text" }),
      });
      const data = await response.json();
      if (response.ok) {
        return res.json({ translated: data.data.translations[0].translatedText, provider: "google" });
      }
      console.warn("Google Translate failed, falling back to MyMemory:", data.error?.message);
    } catch (err) {
      console.warn("Google Translate error, falling back to MyMemory:", err.message);
    }
  }

  // --- Free fallback: MyMemory (no key, no billing, small daily limit) ---
  try {
    const langpair = `${source}|${target}`;
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${langpair}`;
    const response = await fetch(url);
    const data = await response.json();

    const translated = data?.responseData?.translatedText;
    if (translated && data.responseStatus === 200) {
      return res.json({ translated, provider: "mymemory" });
    }
    return res.status(503).json({ error: "MyMemory couldn't translate that." });
  } catch (err) {
    return res.status(503).json({ error: err.message });
  }
});

// Track how many clients are in each room so the UI can show connection status.
const roomCounts = {};

io.on("connection", (socket) => {
  let joinedRoom = null;
  let joinedRole = null;

  socket.on("join", ({ room, role }) => {
    joinedRoom = room || "demo";
    joinedRole = role || "A";
    socket.join(joinedRoom);

    roomCounts[joinedRoom] = (roomCounts[joinedRoom] || 0) + 1;

    // Tell everyone in the room the current connection status.
    io.to(joinedRoom).emit("status", {
      count: roomCounts[joinedRoom],
      message: `${joinedRole} joined room "${joinedRoom}"`,
    });
  });

  // A message from one side (typed or recognized speech) gets relayed
  // to everyone else in the room. Payload carries the original text,
  // the language it was entered in, and (if matched) the phrase key.
  socket.on("message", (payload) => {
    if (!joinedRoom) return;
    socket.to(joinedRoom).emit("message", payload);
  });

  // ---------- WebRTC signaling relay ----------
  // The server never touches audio/video itself — it just passes these
  // three message types between the two peers in the room so they can
  // negotiate a direct peer-to-peer connection.
  socket.on("webrtc-offer", (payload) => {
    if (!joinedRoom) return;
    socket.to(joinedRoom).emit("webrtc-offer", payload);
  });

  socket.on("webrtc-answer", (payload) => {
    if (!joinedRoom) return;
    socket.to(joinedRoom).emit("webrtc-answer", payload);
  });

  socket.on("webrtc-ice-candidate", (payload) => {
    if (!joinedRoom) return;
    socket.to(joinedRoom).emit("webrtc-ice-candidate", payload);
  });

  socket.on("disconnect", () => {
    if (joinedRoom) {
      roomCounts[joinedRoom] = Math.max(0, (roomCounts[joinedRoom] || 1) - 1);
      io.to(joinedRoom).emit("status", {
        count: roomCounts[joinedRoom],
        message: `${joinedRole || "A user"} disconnected`,
      });
    }
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, "0.0.0.0", () => {
  console.log(`\nTwo-way translator running.`);
  console.log(`On this laptop, open:  http://localhost:${PORT}`);
  console.log(`On other devices (same wifi), open: http://<this-laptop-IP>:${PORT}`);
  console.log(`Find your IP with "ipconfig" (Windows) or "ifconfig"/"ipconfig getifaddr en0" (Mac)\n`);
});