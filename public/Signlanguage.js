// ---------------------------------------------------------------------
// Rule-based sign language recognition.
//
// MediaPipe's HandLandmarker gives us 21 (x, y, z) points per detected
// hand, every frame, running entirely in the browser. Everything below
// that is plain geometry — distances, angles, simple motion tracking —
// matched against a hand-written table of shapes. No training data, no
// model beyond the landmark detector itself.
//
// SCOPE / HONESTY NOTE — read before relying on this for anything real:
// This recognizes a FIXED, hand-picked vocabulary of single-hand poses
// and simple motions. It is NOT full ISL or ASL recognition. Real sign
// languages routinely use two hands, facial expression ("non-manual
// markers"), and grammar that a geometry ruleset cannot capture. Within
// the fingerspelling alphabet, a handful of letters (M/N/S/T, and C/H/R)
// look extremely similar to a classifier that only knows "which fingers
// are extended" — those are documented as unsupported below rather than
// guessed at unreliably. Word mode (the phrase list) is the reliable
// path; Alphabet mode is a best-effort fallback for spelling things that
// aren't in the word list, not the primary way to communicate.
//
// The distance thresholds here (0.06, 0.07, 1.15, etc., all in MediaPipe's
// normalized 0–1 image-space units) are reasonable starting points, not
// tuned against a real webcam — there's no camera in the environment this
// was written in. Expect to nudge them after testing with actual hands,
// lighting, and camera distance. They're grouped at the top for that.
//
// SOURCING — what's actually verified vs. still a placeholder:
// indiansignlanguage.org (linked by the project owner) is a real ISL
// dictionary, but each entry is an image/video with no written geometric
// description, and there's no way for this code (or a text-only fetch)
// to watch a video and read hand positions off it. What *is* sourced from
// text is Accenture's 2022 "Fostering Inclusion Through Indian Sign
// Language" training transcript, which confirms two things worth acting
// on: (1) "Yes" and "No" in real ISL are a head nod / head shake, not a
// hand shape at all — the WORD_SIGNS table below no longer guesses a hand
// gesture for these; they're detected from head motion instead (see
// FaceLandmarker/head-motion code further down). (2) ISL fingerspelling
// is NOT identical to ASL fingerspelling (the transcript describes ISL
// "S" as two extended fingers, not the ASL closed fist used in
// ALPHABET_SIGNS below) — so treat ALPHABET_SIGNS as an ASL-shaped
// placeholder, not verified ISL, until someone can compare it against
// real ISL letter images/screenshots. Everything else in WORD_SIGNS below
// is still an invented, geometrically-distinguishable stand-in — not a
// confirmed ISL sign — pending the same kind of check.
// ---------------------------------------------------------------------

(function () {
  const TASKS_VISION_URL = "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.14";
  const MODEL_URL =
    "https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task";
  const FACE_MODEL_URL =
    "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task";

  // ---- tunables ----
  const T = {
    extendedRatio: 1.15,       // tip-to-wrist vs pip-to-wrist ratio to call a finger "extended"
    pinchDist: 0.06,           // thumb tip to another point counts as "touching"
    nearDist: 0.07,            // thumb tip "resting near" a knuckle
    hookBandLow: 0.9,          // partial-curl band (for X) — lower bound
    hookBandHigh: 1.15,        // partial-curl band (for X) — upper bound
    holdMs: 650,               // how long a static pose must be stable before it fires
    motionWindowMs: 900,       // how far back we look for motion patterns
    motionMinRange: 0.045,     // minimum normalized movement to count as real motion (vs. hand tremor)
    circleMinAngle: 4.6,       // radians of cumulative rotation to call something a circle (~265°)
    cooldownMs: 1400,          // minimum gap between two firings of the same word/letter
    letterPauseMs: 1400,       // pause with no new letter before a fingerspelled buffer auto-sends
    sampleIntervalMs: 90,      // throttle classification (not detection) to ~11/s
  };

  // ---- geometry helpers ----
  function dist(a, b) {
    return Math.hypot(a.x - b.x, a.y - b.y, (a.z || 0) - (b.z || 0));
  }

  function getFingerState(lm) {
    const wrist = lm[0];
    return {
      thumb: dist(wrist, lm[4]) > dist(wrist, lm[2]) * T.extendedRatio,
      index: dist(wrist, lm[8]) > dist(wrist, lm[6]) * T.extendedRatio,
      middle: dist(wrist, lm[12]) > dist(wrist, lm[10]) * T.extendedRatio,
      ring: dist(wrist, lm[16]) > dist(wrist, lm[14]) * T.extendedRatio,
      pinky: dist(wrist, lm[20]) > dist(wrist, lm[18]) * T.extendedRatio,
    };
  }

  function shapeMatches(state, shape) {
    for (const f of ["thumb", "index", "middle", "ring", "pinky"]) {
      const want = shape[f];
      if (want === null || want === undefined) continue;
      if (state[f] !== want) return false;
    }
    return true;
  }

  function positionBucket(lm) {
    const y = lm[0].y;
    if (y < 0.38) return "high";
    if (y > 0.68) return "low";
    return "mid";
  }

  // ---- extra geometric checks beyond the finger-extended booleans ----
  const V = {
    thumbUp: (lm) => lm[4].y < lm[0].y - 0.08 && lm[4].y < lm[3].y,
    thumbDown: (lm) => lm[4].y > lm[0].y + 0.08 && lm[4].y > lm[3].y,
    pinchThumbIndex: (lm) => dist(lm[4], lm[8]) < T.pinchDist,
    thumbNearIndexPip: (lm) => dist(lm[4], lm[6]) < T.nearDist,
    thumbBetweenIndexMiddle: (lm) => dist(lm[4], { x: (lm[5].x + lm[9].x) / 2, y: (lm[5].y + lm[9].y) / 2 }) < T.nearDist,
    thumbNearMiddleMcp: (lm) => dist(lm[4], lm[9]) < T.nearDist,
    thumbNearRingMcp: (lm) => dist(lm[4], lm[13]) < T.nearDist,
    indexHooked: (lm) => {
      const r = dist(lm[0], lm[8]) / dist(lm[0], lm[6]);
      return r > T.hookBandLow && r < T.hookBandHigh;
    },
  };

  // ---- Word mode vocabulary ----
  // Priority order matters: earlier entries are tried first when more than
  // one would otherwise match the same frame.
  const WORD_SIGNS = [
    { word: "good", shape: { thumb: true, index: false, middle: false, ring: false, pinky: false }, motion: "none", validate: V.thumbUp },
    { word: "bad", shape: { thumb: true, index: false, middle: false, ring: false, pinky: false }, motion: "none", validate: V.thumbDown },
    { word: "food", shape: { thumb: null, index: false, middle: false, ring: false, pinky: false }, motion: "none", position: "mid", validate: V.pinchThumbIndex },
    { word: "restroom", shape: { thumb: null, index: false, middle: false, ring: false, pinky: false }, motion: "none", validate: V.thumbBetweenIndexMiddle },
    { word: "sorry", shape: { thumb: false, index: false, middle: false, ring: false, pinky: false }, motion: "circle" },
    { word: "water", shape: { thumb: false, index: true, middle: true, ring: true, pinky: false }, motion: "none" },
    { word: "name", shape: { thumb: null, index: true, middle: true, ring: false, pinky: false }, motion: "none" },
    { word: "help", shape: { thumb: false, index: true, middle: false, ring: false, pinky: true }, motion: "none" },
    { word: "understand", shape: { thumb: null, index: true, middle: false, ring: false, pinky: false }, motion: "flick" },
    { word: "question", shape: { thumb: null, index: true, middle: false, ring: false, pinky: false }, motion: "circle" },
    { word: "stop", shape: { thumb: null, index: true, middle: true, ring: true, pinky: true }, motion: "chop" },
    { word: "please", shape: { thumb: null, index: true, middle: true, ring: true, pinky: true }, motion: "circle" },
    { word: "hello", shape: { thumb: null, index: true, middle: true, ring: true, pinky: true }, motion: "oscillate-h" },
    { word: "thankyou", shape: { thumb: null, index: true, middle: true, ring: true, pinky: true }, motion: "none", position: "high" },
    { word: "wait", shape: { thumb: null, index: true, middle: true, ring: true, pinky: true }, motion: "none", position: "mid" },
  ];
  // "Yes" and "No" aren't in this table on purpose — see the head-motion
  // code below; sourced material says real ISL signs them with the head,
  // not a hand shape, so matching them here would just be wrong.
  //
  // "teacher" and "howareyou"/"iamfine" from the phrase list are left out
  // too — real ISL/ASL signs for them are two-handed, and inventing a
  // single-hand stand-in would just collide with something else here
  // without actually being a real sign.

  // ---- Alphabet mode vocabulary (ASL one-handed manual alphabet, approximate) ----
  // C, H, J, R, Z are intentionally omitted: J and Z need a drawn-motion
  // trace this ruleset doesn't attempt, and C/H/R are close enough to
  // other letters here (curl amount for C, "two fingers together" for H
  // and R) that guessing would just be noise. K/P and G/Q share a shape
  // and are told apart only by hand height (P and Q pointed downward) —
  // that's a weak signal, so expect occasional mix-ups there.
  const ALPHABET_SIGNS = [
    { letter: "F", shape: { thumb: null, index: false, middle: true, ring: true, pinky: true }, validate: V.pinchThumbIndex },
    { letter: "O", shape: { thumb: null, index: false, middle: false, ring: false, pinky: false }, validate: V.pinchThumbIndex },
    { letter: "S", shape: { thumb: false, index: false, middle: false, ring: false, pinky: false }, validate: V.thumbNearIndexPip },
    { letter: "T", shape: { thumb: null, index: false, middle: false, ring: false, pinky: false }, validate: V.thumbBetweenIndexMiddle },
    { letter: "M", shape: { thumb: false, index: false, middle: false, ring: false, pinky: false }, validate: V.thumbNearRingMcp },
    { letter: "N", shape: { thumb: false, index: false, middle: false, ring: false, pinky: false }, validate: V.thumbNearMiddleMcp },
    { letter: "X", shape: { thumb: null, index: false, middle: false, ring: false, pinky: false }, validate: V.indexHooked },
    { letter: "P", shape: { thumb: true, index: true, middle: true, ring: false, pinky: false }, position: "low" },
    { letter: "Q", shape: { thumb: true, index: true, middle: false, ring: false, pinky: false }, position: "low" },
    { letter: "K", shape: { thumb: true, index: true, middle: true, ring: false, pinky: false } },
    { letter: "G", shape: { thumb: true, index: true, middle: false, ring: false, pinky: false } },
    { letter: "B", shape: { thumb: false, index: true, middle: true, ring: true, pinky: true } },
    { letter: "W", shape: { thumb: false, index: true, middle: true, ring: true, pinky: false } },
    { letter: "U", shape: { thumb: false, index: true, middle: true, ring: false, pinky: false } },
    { letter: "V", shape: { thumb: null, index: true, middle: true, ring: false, pinky: false } },
    { letter: "D", shape: { thumb: null, index: true, middle: false, ring: false, pinky: false } },
    { letter: "L", shape: { thumb: true, index: true, middle: false, ring: false, pinky: false } },
    { letter: "Y", shape: { thumb: true, index: false, middle: false, ring: false, pinky: true } },
    { letter: "I", shape: { thumb: false, index: false, middle: false, ring: false, pinky: true } },
    { letter: "A", shape: { thumb: true, index: false, middle: false, ring: false, pinky: false } },
    { letter: "E", shape: { thumb: false, index: false, middle: false, ring: false, pinky: false } }, // fallback closed fist
  ];

  function findMatch(table, state, lm, motion, position) {
    for (const entry of table) {
      if (!shapeMatches(state, entry.shape)) continue;
      if (entry.motion && entry.motion !== motion) continue;
      if (!entry.motion && motion !== "none") continue; // static entries need a still hand
      if (entry.position && entry.position !== position) continue;
      if (entry.validate && !entry.validate(lm)) continue;
      return entry.word || entry.letter;
    }
    return null;
  }

  // ---- motion tracking ----
  // We keep a short rolling buffer of the wrist point over time and derive
  // a coarse motion label from it each sample.
  class MotionTracker {
    constructor() {
      this.buffer = []; // { x, y, t }
    }
    push(lm, t) {
      this.buffer.push({ x: lm[0].x, y: lm[0].y, t });
      const cutoff = t - T.motionWindowMs;
      while (this.buffer.length && this.buffer[0].t < cutoff) this.buffer.shift();
    }
    reset() {
      this.buffer = [];
    }
    classify() {
      const buf = this.buffer;
      if (buf.length < 4) return "none";

      const xs = buf.map((p) => p.x);
      const ys = buf.map((p) => p.y);
      const xRange = Math.max(...xs) - Math.min(...xs);
      const yRange = Math.max(...ys) - Math.min(...ys);

      // Circle: total unwrapped angle around the buffer's own centroid.
      const cx = xs.reduce((a, b) => a + b, 0) / xs.length;
      const cy = ys.reduce((a, b) => a + b, 0) / ys.length;
      const radius = buf.reduce((sum, p) => sum + Math.hypot(p.x - cx, p.y - cy), 0) / buf.length;
      if (radius > 0.03) {
        let total = 0;
        let prevAngle = Math.atan2(buf[0].y - cy, buf[0].x - cx);
        for (let i = 1; i < buf.length; i++) {
          const angle = Math.atan2(buf[i].y - cy, buf[i].x - cx);
          let d = angle - prevAngle;
          if (d > Math.PI) d -= 2 * Math.PI;
          if (d < -Math.PI) d += 2 * Math.PI;
          total += d;
          prevAngle = angle;
        }
        if (Math.abs(total) > T.circleMinAngle) return "circle";
      }

      // Chop: a fast, mostly-downward move in the last ~300ms after being
      // relatively still before that.
      const recent = buf.filter((p) => p.t > buf[buf.length - 1].t - 300);
      if (recent.length >= 2) {
        const dy = recent[recent.length - 1].y - recent[0].y;
        const dx = Math.abs(recent[recent.length - 1].x - recent[0].x);
        if (dy > 0.09 && dx < 0.05) return "chop";
      }

      // Oscillation: count direction reversals along the dominant axis.
      if (xRange < T.motionMinRange && yRange < T.motionMinRange) return "none";
      const horizontal = xRange > yRange * 1.4;
      const vertical = yRange > xRange * 1.4;
      if (horizontal || vertical) {
        const series = horizontal ? xs : ys;
        let reversals = 0;
        let dir = 0;
        for (let i = 1; i < series.length; i++) {
          const d = series[i] - series[i - 1];
          if (Math.abs(d) < 0.01) continue;
          const newDir = d > 0 ? 1 : -1;
          if (dir !== 0 && newDir !== dir) reversals++;
          dir = newDir;
        }
        if (horizontal && reversals >= 2 && xRange > T.motionMinRange) return "oscillate-h";
        if (vertical) {
          const span = buf[buf.length - 1].t - buf[0].t;
          if (reversals >= 2) return "oscillate-v";
          if (reversals >= 1 && span < 450 && yRange < 0.09) return "flick";
        }
      }

      return "none";
    }
  }

  // ---- skeleton drawing (visual feedback only) ----
  const CONNECTIONS = [
    [0, 1], [1, 2], [2, 3], [3, 4],
    [0, 5], [5, 6], [6, 7], [7, 8],
    [0, 9], [9, 10], [10, 11], [11, 12],
    [0, 13], [13, 14], [14, 15], [15, 16],
    [0, 17], [17, 18], [18, 19], [19, 20],
    [5, 9], [9, 13], [13, 17],
  ];

  function drawHand(ctx, lm, w, h, color) {
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.beginPath();
    for (const [a, b] of CONNECTIONS) {
      ctx.moveTo(lm[a].x * w, lm[a].y * h);
      ctx.lineTo(lm[b].x * w, lm[b].y * h);
    }
    ctx.stroke();
    ctx.fillStyle = color;
    for (const p of lm) {
      ctx.beginPath();
      ctx.arc(p.x * w, p.y * h, 3, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // ---- main recognizer ----
  class SignRecognizer {
    constructor({ video, canvas, onStatus, onRecognized, onLetterProgress }) {
      this.video = video;
      this.canvas = canvas;
      this.ctx = canvas.getContext("2d");
      this.onStatus = onStatus || (() => {});
      this.onRecognized = onRecognized || (() => {});
      this.onLetterProgress = onLetterProgress || (() => {});

      this.landmarker = null;
      this.faceLandmarker = null;
      this.running = false;
      this.mode = "word"; // 'word' | 'alphabet'
      this.motion = new MotionTracker();
      this.headMotion = new MotionTracker(); // tracks the nose tip, for real ISL yes/no (head nod/shake)

      this.lastSampleT = 0;
      this.candidateKey = null;
      this.candidateSince = 0;
      this.lastFiredKey = null;
      this.lastFiredT = 0;

      this.letterBuffer = "";
      this.lastLetterT = 0;
      this._loop = this._loop.bind(this);
    }

    setMode(mode) {
      this.mode = mode;
      this.candidateKey = null;
      this.headMotion.reset();
      this.letterBuffer = "";
      this.onLetterProgress("");
    }

    clearBuffer() {
      this.letterBuffer = "";
      this.onLetterProgress("");
    }

    async _ensureLandmarker() {
      if (this.landmarker && this.faceLandmarker) return;
      this.onStatus("Loading hand tracker…");
      const vision = await import(/* webpackIgnore: true */ `${TASKS_VISION_URL}/vision_bundle.mjs`);
      const filesetResolver = await vision.FilesetResolver.forVisionTasks(`${TASKS_VISION_URL}/wasm`);
      this.landmarker = await vision.HandLandmarker.createFromOptions(filesetResolver, {
        baseOptions: { modelAssetPath: MODEL_URL, delegate: "GPU" },
        runningMode: "VIDEO",
        numHands: 1,
      });
      // Only needed for "yes"/"no" (real ISL signs these with a head
      // nod/shake, not a hand shape — see the sourcing note at the top of
      // this file). A second model is genuine extra load time and
      // per-frame cost; if that's not worth it for your setup, this whole
      // block plus the head-motion check in _processFrame can be removed
      // and yes/no dropped back to a hand-shape approximation instead.
      this.faceLandmarker = await vision.FaceLandmarker.createFromOptions(filesetResolver, {
        baseOptions: { modelAssetPath: FACE_MODEL_URL, delegate: "GPU" },
        runningMode: "VIDEO",
        numFaces: 1,
      });
    }

    async start(mode) {
      if (this.running) return;
      this.mode = mode || this.mode;
      try {
        await this._ensureLandmarker();
      } catch (err) {
        this.onStatus("Couldn't load the sign tracker: " + err.message);
        return;
      }
      this.running = true;
      this.onStatus(this.mode === "alphabet" ? "Watching for letters…" : "Watching for signs…");
      requestAnimationFrame(this._loop);
    }

    stop() {
      this.running = false;
      this.headMotion.reset();
      if (this.ctx) this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.onStatus("");
    }

    _loop(t) {
      if (!this.running) return;
      if (this.video.videoWidth && this.video.videoHeight) {
        if (this.canvas.width !== this.video.videoWidth || this.canvas.height !== this.video.videoHeight) {
          this.canvas.width = this.video.videoWidth;
          this.canvas.height = this.video.videoHeight;
        }
        this._processFrame(t);
      }
      requestAnimationFrame(this._loop);
    }

    _processFrame(t) {
      let result;
      try {
        result = this.landmarker.detectForVideo(this.video, t);
      } catch {
        return;
      }

      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      const haveHand = result && result.landmarks && result.landmarks.length > 0;
      if (!haveHand) {
        this.motion.reset();
        this.candidateKey = null;
      } else {
        drawHand(this.ctx, result.landmarks[0], this.canvas.width, this.canvas.height, "#3FBFAD");
      }

      // Throttle classification independent of the render/detection rate.
      if (t - this.lastSampleT < T.sampleIntervalMs) return;
      this.lastSampleT = t;

      // Head motion (yes/no) — only checked in Word mode, since Alphabet
      // mode has no use for it and it's an extra model inference per frame.
      let headKey = null;
      if (this.mode === "word" && this.faceLandmarker) {
        headKey = this._classifyHead(t);
      } else {
        this.headMotion.reset();
      }

      let handKey = null;
      let handMotion = "none";
      if (haveHand) {
        const lm = result.landmarks[0];
        this.motion.push(lm, t);
        handMotion = this.motion.classify();
        const state = getFingerState(lm);
        const position = positionBucket(lm);
        const table = this.mode === "alphabet" ? ALPHABET_SIGNS : WORD_SIGNS;
        handKey = findMatch(table, state, lm, handMotion, position);
      }

      // A head nod/shake is the more specific, more deliberate signal —
      // prefer it over whatever the hand happens to be doing at the time.
      const key = headKey || handKey;

      this._drawLabel(key, handMotion);
      this._evaluateHold(key, t);
    }

    _classifyHead(t) {
      let faceResult;
      try {
        faceResult = this.faceLandmarker.detectForVideo(this.video, t);
      } catch {
        return null;
      }
      if (!faceResult || !faceResult.faceLandmarks || faceResult.faceLandmarks.length === 0) {
        this.headMotion.reset();
        return null;
      }
      // Landmark 1 is approximately the nose tip in MediaPipe's face mesh
      // topology — close enough for tracking nod/shake motion, not meant
      // to be a precise facial-landmark reference point.
      const nose = faceResult.faceLandmarks[0][1];
      this.headMotion.push([nose], t); // MotionTracker only reads index 0
      const motion = this.headMotion.classify();
      if (motion === "oscillate-v") return "yes";
      if (motion === "oscillate-h") return "no";
      return null;
    }

    _drawLabel(key, motion) {
      if (!key) return;
      this.ctx.font = "20px sans-serif";
      this.ctx.fillStyle = "#E8B23C";
      this.ctx.strokeStyle = "rgba(0,0,0,0.6)";
      this.ctx.lineWidth = 3;
      const label = this.mode === "alphabet" ? key : key;
      this.ctx.strokeText(label, 10, 26);
      this.ctx.fillText(label, 10, 26);
    }

    _evaluateHold(key, t) {
      if (!key) {
        this.candidateKey = null;
        return;
      }

      if (key !== this.candidateKey) {
        this.candidateKey = key;
        this.candidateSince = t;
        return;
      }

      const held = t - this.candidateSince;
      const cooledDown = key !== this.lastFiredKey || t - this.lastFiredT > T.cooldownMs;
      const motionEntry =
        (this.mode === "alphabet" ? ALPHABET_SIGNS : WORD_SIGNS).find((e) => (e.word || e.letter) === key) || {};
      const isHeadMotion = key === "yes" || key === "no";
      const requiredHold = isHeadMotion || (motionEntry.motion && motionEntry.motion !== "none") ? 250 : T.holdMs;

      if (held >= requiredHold && cooledDown) {
        this.lastFiredKey = key;
        this.lastFiredT = t;
        this.candidateKey = null;
        this._fire(key);
      }
    }

    _fire(key) {
      if (this.mode === "word") {
        this.onStatus("Signed: " + key);
        this.onRecognized(key);
        return;
      }

      // Alphabet mode: buffer letters, auto-send the assembled word after
      // a pause rather than sending single letters one at a time.
      this.letterBuffer += key;
      this.lastLetterT = performance.now();
      this.onLetterProgress(this.letterBuffer);
      this._scheduleBufferFlush();
    }

    _scheduleBufferFlush() {
      const snapshotT = this.lastLetterT;
      setTimeout(() => {
        if (this.lastLetterT !== snapshotT) return; // a newer letter arrived, this timer is stale
        if (!this.letterBuffer) return;
        const word = this.letterBuffer.toLowerCase();
        this.letterBuffer = "";
        this.onLetterProgress("");
        this.onStatus("Spelled: " + word);
        this.onRecognized(word);
      }, T.letterPauseMs);
    }
  }

  window.SignLanguage = { SignRecognizer, WORD_SIGNS, ALPHABET_SIGNS };
})();