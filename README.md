# Setu — Two-Way Sign & Speech Bridge (Text/Voice Phase)

This is the current phase of the two-way system: **one shared chat
thread** (not split panels — like a normal WhatsApp conversation),
stacked video call on the right, a single language toggle that controls
what language you type/speak in AND what language every message
displays in, and a real-time connection between two browser
tabs/devices using Socket.io.

Sign-video playback and camera-based sign recognition plug in later —
this phase proves out the two-way connection, unified language mode,
video call, and translation pipeline (Google Translate with a
rule-based phrase-list fallback) that the sign side will hook into.

## How it's laid out

- **Left: one chat thread.** Every message from both sides appears here
  in order, like a normal messaging app — not two separate columns.
- **Right: two stacked video tiles.** Your own camera on top, the other
  person's video below, plus Start video / camera / mic controls.
- **Top: role + language.** "You are Side A / Side B" just labels which
  side this browser tab represents (for bubble alignment and knowing
  who's "you" vs "them"). The single **Display & speak in** toggle sets
  BOTH what language your mic/typing is interpreted as AND what
  language every message in the thread is shown in — your own sent
  messages included. There's no separate "original text" shown anywhere;
  everything in the thread always reads in whichever language you've
  currently selected.

## How the two-way connection works

- `server.js` runs a tiny Node/Socket.io server that relays messages
  between whoever is in the same **room** (a room code, default `demo`).
- When you send a message, this device translates it into **both**
  English and Gujarati right away (Google Translate first, phrase-list
  fallback second) and sends both versions over the socket. That way,
  whichever language the *other* device has toggled to, it can display
  and speak the message instantly without needing its own translate
  call — keeping both sides showing exactly the same wording.
- Toggling your language re-renders the entire thread instantly from
  the already-fetched translations — no new network calls needed for
  messages you've already seen.

You don't need two computers to test this — **open the page in two
browser tabs**, set one to "Side A" and the other to "Side B", and
they'll sync through the same server, same as two separate devices would.

## Video chat (WebRTC)

Click **"Start video"** in the right-hand column. This asks for
camera/mic permission and opens a direct peer-to-peer connection to
whoever else is in the same room — video never passes through the
server, only the initial handshake does. The other person doesn't need
to click anything if they're already in the room; if they load the
page after you start, have them click Start too.

- **Camera off / Camera on** and **Mute / Unmute** toggle your own
  video/audio without ending the call.
- If the picture doesn't appear, it's almost always a firewall or
  network-isolation issue — same root cause as the "other device can't
  open the page" problem (see below).

## Running it

```bash
cd isl-two-way-app
npm install
node server.js
```

You'll see:

```
Two-way translator running.
On this laptop, open:  http://localhost:3000
On other devices (same wifi), open: http://<this-laptop-IP>:3000
```

- **Same laptop, two tabs:** open `http://localhost:3000` twice, set
  one tab to Side A and the other to Side B.
- **Two devices for the real demo:** connect both to the same wifi,
  find your laptop's local IP (`ipconfig` on Windows,
  `ipconfig getifaddr en0` on Mac), open `http://<that-IP>:3000` on the
  second device. Make sure the room code matches on both (default `demo`).
- If a device can't reach the other over wifi, campus/event networks
  often block device-to-device traffic ("client isolation") — a phone
  hotspot from your own phone is a reliable workaround.

## Google Translate (optional — falls back to phrase list without it)

By default, translation uses the built-in 20-phrase list only (no
internet API needed, works offline). To use full Google Translate
instead — so **any** typed or spoken sentence translates, not just the
20 phrases:

1. Get a Google Cloud Translation API key: create a project in
   [Google Cloud Console](https://console.cloud.google.com/), enable the
   **Cloud Translation API**, create an API key under "Credentials."
   (Usage is billed after a free monthly quota — check current pricing
   before a live demo.)
2. Copy `config.example.json` to `config.json` in the project root.
3. Paste your key in:
   ```json
   { "googleTranslateApiKey": "YOUR_KEY_HERE" }
   ```
4. Restart the server. The badge at the top switches from
   "Google Translate: off" to "Google Translate: on."

The key is only ever read server-side (`server.js` proxies the
translate call) — never sent to the browser. `config.json` is
gitignored so you won't accidentally commit your key.

**Fallback behavior:** if Translate is unavailable, invalid, or the API
call fails for any reason (no internet, quota exceeded, etc.), the app
automatically tries the 20-phrase rule-based list instead. If neither
works, the message shows as `[couldn't translate]` with an amber
highlight rather than failing silently — so a mic misfire or unknown
phrase is visible immediately during a live demo, not confusing.

## Editing the phrase list / conversation

Everything lives in `public/phrases.js`:

- `PHRASES` — the 20 word/phrase pairs (English + Gujarati). `key` will
  later double as the filename key for sign video clips (e.g. `help.mp4`).
- `DEMO_CONVERSATION` — the scripted Teacher/Student exchange used by
  the "Run demo script ▸" button, which alternates sides automatically
  as a rehearsal fallback if live mic/typing has issues on stage.
- `matchPhrase()` — the rule-based fallback matching logic.

## What's next (not in this phase)

- Camera + MediaPipe sign detection feeding into the same message flow
  instead of/alongside typed text — separate from the video call above
  (that's just for seeing each other; sign *recognition* still needs
  the landmark/gesture matching work described in the phase plan).
- Sign video clip playback keyed off `key` when a message includes one,
  so a deaf user sees a sign clip alongside the caption.
- Swapping the room code UI for something more demo-proof if needed.
