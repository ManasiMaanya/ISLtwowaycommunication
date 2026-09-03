// ---------- State ----------

const state = {
  role: "A",       // which side this device/browser represents
  lang: "en",       // the ONE display+speak+input language for this device right now
};

// Local message history for this device. Each message stores its original
// text/language plus both translations, so re-rendering after a language
// toggle never needs to re-fetch anything already translated once.
const messages = []; // { id, side, originLang, en, gu, timestamp }
let msgCounter = 0;

const els = {
  roomInput: document.getElementById("roomInput"),
  dot: document.getElementById("connectionDot"),
  connText: document.getElementById("connectionText"),
  translateBadge: document.getElementById("translateBadge"),
  chatFeed: document.getElementById("chatFeed"),
  chatInput: document.getElementById("chatInput"),
  chatMic: document.getElementById("chatMic"),
  chatSend: document.getElementById("chatSend"),
  demoBtn: document.getElementById("demoScriptBtn"),
  demoStatus: document.getElementById("demoStatus"),
  localVideo: document.getElementById("localVideo"),
  remoteVideo: document.getElementById("remoteVideo"),
  videoPlaceholder: document.getElementById("videoPlaceholder"),
  startCallBtn: document.getElementById("startCallBtn"),
  camToggle: document.getElementById("camToggle"),
  micToggle: document.getElementById("micToggle"),
  signOverlay: document.getElementById("signOverlay"),
  signToggleBtn: document.getElementById("signToggleBtn"),
  signStatus: document.getElementById("signStatus"),
  signBuffer: document.getElementById("signBuffer"),
  signBufferClear: document.getElementById("signBufferClear"),
};

// ---------- Google Translate availability check ----------

let translateAvailable = false;

fetch("/api/translate-status")
  .then((r) => r.json())
  .then((data) => {
    translateAvailable = !!data.available;
    const providerLabel = { sarvam: "Sarvam AI", google: "Google Translate", mymemory: "MyMemory (free)" }[data.provider] || data.provider;
    els.translateBadge.textContent = translateAvailable
      ? `Translate: ${providerLabel}`
      : "Translate: off (using phrase list)";
    els.translateBadge.classList.add(translateAvailable ? "on" : "off");
  })
  .catch(() => {
    els.translateBadge.textContent = "Translate: off (using phrase list)";
    els.translateBadge.classList.add("off");
  });

// Calls the server-side proxy so the API key never lives in the browser.
// Returns null on any failure so the caller can fall back to the phrase list.
async function translateText(text, targetLang) {
  if (!translateAvailable) return null;
  try {
    const res = await fetch("/api/translate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, target: targetLang === "gu" ? "gu" : "en" }),
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.translated || null;
  } catch {
    return null;
  }
}

// Given text in a known source language, resolve what it should read as
// in BOTH languages (en + gu), preferring Google Translate and falling
// back to the fixed phrase list. The source language's own slot is just
// the original text, unchanged.
async function resolveBothLanguages(text, sourceLang) {
  const otherLang = sourceLang === "en" ? "gu" : "en";
  let otherText = await translateText(text, otherLang);

  if (!otherText) {
    const match = matchPhrase(text, sourceLang);
    if (match) otherText = match[otherLang];
  }

  return {
    [sourceLang]: text,
    [otherLang]: otherText, // may be null if nothing matched — handled at render time
  };
}

// ---------- Socket connection ----------

const socket = io();

function joinRoom() {
  const room = els.roomInput.value.trim() || "demo";
  socket.emit("join", { room, role: state.role });
}

socket.on("connect", () => {
  els.dot.classList.remove("dot--off");
  els.dot.classList.add("dot--on");
  els.connText.textContent = "connected";
  joinRoom();
});

socket.on("disconnect", () => {
  els.dot.classList.remove("dot--on");
  els.dot.classList.add("dot--off");
  els.connText.textContent = "disconnected";
});

socket.on("status", (data) => {
  els.connText.textContent = `${data.message} · ${data.count} in room`;
});

els.roomInput.addEventListener("change", joinRoom);

// ---------- Role toggle (which side this device is) ----------

document.querySelectorAll(".role-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".role-btn").forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    state.role = btn.dataset.role;
    joinRoom();
    renderAllMessages(); // re-render so mine/theirs alignment updates
  });
});

// ---------- Single language toggle (display + speak + input) ----------

document.querySelectorAll("#globalLangToggle .lang-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelectorAll("#globalLangToggle .lang-btn").forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    state.lang = btn.dataset.lang;
    renderAllMessages(); // re-render every message in the newly selected language
  });
});

// ---------- Feed rendering ----------
// The feed always shows every message in `messages`, rendered in
// state.lang — never the original wording of a message sent in a
// different language.

// A message can end up missing one language's text if, at send time,
// both the translate API call and the phrase-list fallback failed for
// that direction (e.g. a translate hiccup, or the phrase just isn't in
// PHRASES). Previously that was permanent — the bubble would show
// "[couldn't translate]" in that language forever, even after toggling
// back and forth, while every other message switched fine. This retries
// resolution for a single message and patches it in place if it succeeds.
async function fillMissingTranslation(msg) {
  const missingLang = !msg.en ? "en" : (!msg.gu ? "gu" : null);
  if (!missingLang || msg._retrying) return false;

  msg._retrying = true;
  const sourceText = msg[msg.originLang];

  let result = await translateText(sourceText, missingLang);
  if (!result) {
    const match = matchPhrase(sourceText, msg.originLang);
    if (match) result = match[missingLang];
  }

  msg._retrying = false;
  if (result) {
    msg[missingLang] = result;
    return true;
  }
  return false;
}

function renderAllMessages() {
  els.chatFeed.innerHTML = "";

  if (messages.length === 0) {
    els.chatFeed.innerHTML = '<p class="feed-empty">Messages will appear here, shown in the language you\'ve selected above — for both sides.</p>';
    return;
  }

  messages.forEach((msg) => {
    const displayText = msg[state.lang];

    // Missing translation for the language currently on screen — retry
    // in the background and re-render once (if ever) it resolves.
    if (!displayText && !msg._retrying) {
      fillMissingTranslation(msg).then((filled) => {
        if (filled) renderAllMessages();
      });
    }

    const mine = msg.side === state.role;

    const bubble = document.createElement("div");
    bubble.className = "bubble " + (mine ? "mine" : "theirs") + (displayText ? "" : " unmatched");

    const textSpan = document.createElement("span");
    textSpan.className = state.lang === "gu" ? "gu-text" : "";
    textSpan.textContent = displayText || "[couldn't translate]";
    bubble.appendChild(textSpan);

    const metaEl = document.createElement("span");
    metaEl.className = "meta";
    metaEl.textContent = `Side ${msg.side} · ${msg.timestamp}`;
    bubble.appendChild(metaEl);

    els.chatFeed.appendChild(bubble);
  });

  els.chatFeed.scrollTop = els.chatFeed.scrollHeight;
}

// ---------- Text-to-speech ----------

function speak(text, lang) {
  if (!text || !("speechSynthesis" in window)) return;
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = lang === "gu" ? "gu-IN" : "en-IN";
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utter);
}

// ---------- Sending a message ----------

// Shared by the typed/spoken send flow and by sign-language recognition
// (see setupSignInput below) — both just need to hand over some text and
// the language it's in, and get it resolved, stored, rendered, and
// broadcast the same way.
async function dispatchOutgoingMessage(text, sourceLang) {
  if (!text) return;

  const both = await resolveBothLanguages(text, sourceLang);

  const msg = {
    id: ++msgCounter,
    side: state.role,
    originLang: sourceLang,
    en: both.en,
    gu: both.gu,
    timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
  };

  messages.push(msg);
  renderAllMessages();

  socket.emit("message", msg);
}

async function sendMessage() {
  const text = els.chatInput.value.trim();
  if (!text) return;

  const sourceLang = state.lang; // you type/speak in whatever you're currently displaying
  await dispatchOutgoingMessage(text, sourceLang);

  els.chatInput.value = "";
}

els.chatSend.addEventListener("click", sendMessage);
els.chatInput.addEventListener("keydown", (e) => { if (e.key === "Enter") sendMessage(); });

// ---------- Receiving a message ----------

socket.on("message", (msg) => {
  messages.push(msg);
  renderAllMessages();

  // Speak it aloud in this device's current language, since the other
  // side already sent both translations pre-computed.
  const displayText = msg[state.lang];
  speak(displayText, state.lang);
});

// ---------- Speech-to-text (mic button) ----------

function setupMic() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    els.chatMic.addEventListener("click", () => {
      alert("Speech recognition isn't supported in this browser. Try Chrome, or use the text input instead.");
    });
    return;
  }

  const recognition = new SpeechRecognition();
  recognition.continuous = false;
  recognition.interimResults = false;

  els.chatMic.addEventListener("click", () => {
    recognition.lang = state.lang === "gu" ? "gu-IN" : "en-IN";
    els.chatMic.classList.add("listening");
    recognition.start();
  });

  recognition.addEventListener("result", (event) => {
    const transcript = event.results[0][0].transcript;
    els.chatInput.value = transcript;
  });

  recognition.addEventListener("end", () => {
    els.chatMic.classList.remove("listening");
  });

  recognition.addEventListener("error", () => {
    els.chatMic.classList.remove("listening");
  });
}

setupMic();

// ---------- Demo script runner ----------
// Steps through DEMO_CONVERSATION automatically, alternating which side
// "speaks" by temporarily switching state.role for each line — useful
// as a rehearsal/fallback when testing solo in one browser tab.

let demoRunning = false;

async function runDemoScript() {
  if (demoRunning) return;
  demoRunning = true;
  els.demoBtn.disabled = true;
  const originalRole = state.role;

  for (let i = 0; i < DEMO_CONVERSATION.length; i++) {
    const line = DEMO_CONVERSATION[i];
    const side = line.speaker === "Teacher" ? "A" : "B";

    // Temporarily act as that side for this line, without touching the toggle UI.
    state.role = side;

    els.demoStatus.textContent = `${line.speaker} (${i + 1}/${DEMO_CONVERSATION.length}) …`;
    els.chatInput.value = state.lang === "gu" ? line.gu : line.en;
    await new Promise((r) => setTimeout(r, 700));
    await sendMessage();
    await new Promise((r) => setTimeout(r, 1800));
  }

  state.role = originalRole;
  els.demoStatus.textContent = "Demo script complete.";
  els.demoBtn.disabled = false;
  demoRunning = false;
}

els.demoBtn.addEventListener("click", runDemoScript);

// ---------- WebRTC video call ----------
// Peer-to-peer video/audio between the two people in the room.
// The Socket.io server only relays the signaling messages (offer/answer/
// ICE candidates) below — it never touches the actual audio/video stream.

const rtcConfig = {
  iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
};

let localStream = null;
let peerConnection = null;
let callStarted = false;

async function startVideoCall() {
  if (callStarted) return;
  callStarted = true;
  els.startCallBtn.textContent = "Video starting…";
  els.startCallBtn.disabled = true;

  try {
    localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
  } catch (err) {
    alert("Couldn't access camera/microphone: " + err.message);
    callStarted = false;
    els.startCallBtn.textContent = "Start video";
    els.startCallBtn.disabled = false;
    return;
  }

  els.localVideo.srcObject = localStream;
  els.startCallBtn.textContent = "Video on";
  els.camToggle.disabled = false;
  els.micToggle.disabled = false;

  setupPeerConnection();

  const offer = await peerConnection.createOffer();
  await peerConnection.setLocalDescription(offer);
  socket.emit("webrtc-offer", { offer, room: els.roomInput.value.trim() || "demo" });
}

function setupPeerConnection() {
  peerConnection = new RTCPeerConnection(rtcConfig);

  localStream.getTracks().forEach((track) => {
    peerConnection.addTrack(track, localStream);
  });

  peerConnection.ontrack = (event) => {
    els.remoteVideo.srcObject = event.streams[0];
    els.videoPlaceholder.style.display = "none";
  };

  peerConnection.onicecandidate = (event) => {
    if (event.candidate) {
      socket.emit("webrtc-ice-candidate", {
        candidate: event.candidate,
        room: els.roomInput.value.trim() || "demo",
      });
    }
  };
}

socket.on("webrtc-offer", async ({ offer }) => {
  if (!callStarted) {
    try {
      localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    } catch (err) {
      alert("Incoming video call, but couldn't access camera/microphone: " + err.message);
      return;
    }
    els.localVideo.srcObject = localStream;
    callStarted = true;
    els.startCallBtn.textContent = "Video on";
    els.startCallBtn.disabled = true;
    els.camToggle.disabled = false;
    els.micToggle.disabled = false;
    setupPeerConnection();
  }

  await peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
  const answer = await peerConnection.createAnswer();
  await peerConnection.setLocalDescription(answer);
  socket.emit("webrtc-answer", { answer, room: els.roomInput.value.trim() || "demo" });
});

socket.on("webrtc-answer", async ({ answer }) => {
  if (!peerConnection) return;
  await peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
});

socket.on("webrtc-ice-candidate", async ({ candidate }) => {
  if (!peerConnection) return;
  try {
    await peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
  } catch (err) {
    console.warn("Failed to add ICE candidate", err);
  }
});

els.startCallBtn.addEventListener("click", startVideoCall);

els.camToggle.addEventListener("click", () => {
  if (!localStream) return;
  const videoTrack = localStream.getVideoTracks()[0];
  if (!videoTrack) return;
  videoTrack.enabled = !videoTrack.enabled;
  els.camToggle.textContent = videoTrack.enabled ? "Camera off" : "Camera on";
});

els.micToggle.addEventListener("click", () => {
  if (!localStream) return;
  const audioTrack = localStream.getAudioTracks()[0];
  if (!audioTrack) return;
  audioTrack.enabled = !audioTrack.enabled;
  els.micToggle.textContent = audioTrack.enabled ? "Mute" : "Unmute";
});

// ---------- Sign language input ----------
// Runs a rule-based classifier (see signLanguage.js) over the local
// camera feed. Recognized words/spelled words go straight through
// dispatchOutgoingMessage, exactly like a typed message — the person
// signing doesn't have to also type or tap "send".

let signActive = false;
let signOnlyStream = null; // camera opened just for signing, when no call is running yet
let signMode = "word";

const signRecognizer = window.SignLanguage
  ? new window.SignLanguage.SignRecognizer({
      video: els.localVideo,
      canvas: els.signOverlay,
      onStatus: (text) => { els.signStatus.textContent = text; },
      onLetterProgress: (buffer) => { els.signBuffer.textContent = buffer; },
      onRecognized: (text) => {
        dispatchOutgoingMessage(text, "en");
      },
    })
  : null;

async function toggleSignInput() {
  if (!signRecognizer) {
    alert("Sign input isn't available (signLanguage.js failed to load).");
    return;
  }

  if (signActive) {
    signRecognizer.stop();
    signActive = false;
    els.signToggleBtn.textContent = "🤟 Sign input: off";
    els.signToggleBtn.classList.remove("active");
    els.signStatus.textContent = "";
    if (signOnlyStream && !callStarted) {
      signOnlyStream.getTracks().forEach((t) => t.stop());
      els.localVideo.srcObject = null;
      signOnlyStream = null;
    }
    return;
  }

  // Reuse the call's camera if one is already running; otherwise open a
  // lightweight video-only stream just for signing.
  if (!localStream) {
    try {
      signOnlyStream = await navigator.mediaDevices.getUserMedia({ video: true });
    } catch (err) {
      alert("Couldn't access the camera for sign input: " + err.message);
      return;
    }
    els.localVideo.srcObject = signOnlyStream;
  }

  await signRecognizer.start(signMode);
  signActive = true;
  els.signToggleBtn.textContent = "🤟 Sign input: on";
  els.signToggleBtn.classList.add("active");
}

els.signToggleBtn.addEventListener("click", toggleSignInput);

document.querySelectorAll("#signModeToggle .sign-mode-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelectorAll("#signModeToggle .sign-mode-btn").forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    signMode = btn.dataset.mode;
    if (signRecognizer) signRecognizer.setMode(signMode);
    els.signBuffer.textContent = "";
  });
});

els.signBufferClear.addEventListener("click", () => {
  if (signRecognizer) signRecognizer.clearBuffer();
});