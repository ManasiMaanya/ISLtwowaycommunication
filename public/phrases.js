// Shared phrase bank — used for matching typed/spoken input to a known phrase
// and looking up its translation + (later) sign clip key.

const PHRASES = [
  { key: "hello",       en: "Hello",              gu: "નમસ્તે" },
  { key: "thankyou",    en: "Thank you",          gu: "આભાર" },
  { key: "yes",         en: "Yes",                gu: "હા" },
  { key: "no",          en: "No",                 gu: "ના" },
  { key: "help",        en: "Help",               gu: "મદદ" },
  { key: "water",       en: "Water",              gu: "પાણી" },
  { key: "food",        en: "Food",               gu: "ખોરાક" },
  { key: "teacher",     en: "Teacher",            gu: "શિક્ષક" },
  { key: "question",    en: "Question",           gu: "પ્રશ્ન" },
  { key: "sorry",       en: "Sorry",              gu: "માફ કરો" },
  { key: "name",        en: "Name",               gu: "નામ" },
  { key: "good",        en: "Good",               gu: "સારું" },
  { key: "bad",         en: "Bad",                gu: "ખરાબ" },
  { key: "restroom",    en: "Restroom",           gu: "શૌચાલય" },
  { key: "stop",        en: "Stop",               gu: "રોકો" },
  { key: "howareyou",   en: "How are you?",       gu: "તમે કેમ છો?" },
  { key: "iamfine",     en: "I am fine",          gu: "હું સારો છું" },
  { key: "please",      en: "Please",             gu: "કૃપા કરીને" },
  { key: "wait",        en: "Wait",               gu: "રાહ જુઓ" },
  { key: "understand",  en: "Understand",         gu: "સમજાય છે" },
];

// Demo conversation script — Teacher <-> Student
// Used by the "Run demo script" button to walk through a rehearsed exchange.
const DEMO_CONVERSATION = [
  { speaker: "Teacher", en: "How are you?",              gu: "તમે કેમ છો?" },
  { speaker: "Student", en: "I am fine, thank you.",     gu: "હું સારો છું, આભાર." },
  { speaker: "Teacher", en: "Do you need help?",         gu: "શું તમને મદદ જોઈએ છે?" },
  { speaker: "Student", en: "Yes, water please.",        gu: "હા, પાણી કૃપા કરીને." },
  { speaker: "Teacher", en: "Okay, wait.",                gu: "ઠીક છે, રાહ જુઓ." },
  { speaker: "Student", en: "Thank you.",                 gu: "આભાર." },
];

// Very small matcher: normalizes input and looks for the closest phrase
// by exact match first, then substring/contains match as a fallback.
function matchPhrase(inputText, lang) {
  if (!inputText) return null;
  const norm = inputText.trim().toLowerCase();

  // exact match in the given language
  let hit = PHRASES.find(p => p[lang].trim().toLowerCase() === norm);
  if (hit) return hit;

  // fuzzy: contains
  hit = PHRASES.find(p => norm.includes(p[lang].trim().toLowerCase()) || p[lang].trim().toLowerCase().includes(norm));
  if (hit) return hit;

  return null;
}

if (typeof module !== "undefined") {
  module.exports = { PHRASES, DEMO_CONVERSATION, matchPhrase };
}
