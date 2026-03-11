// src/data/isl_dictionary.js
//
// ISL Dictionary — maps English words to ISLRTC video URLs
//
// Source: ISLRTC (Indian Sign Language Research & Training Centre)
// Website: https://islrtc.nic.in/
//
// HOW TO ADD MORE WORDS:
// 1. Go to https://islrtc.nic.in/
// 2. Search for the word
// 3. Right-click the video → Copy video URL
// 4. Add it here as:  "word": "https://..."
//
// FORMAT:
// "word_in_lowercase": "direct_video_url"

export const ISL_DICTIONARY = {

  // ── Greetings ──────────────────────────────────────────
  "hello":        "https://islrtc.nic.in/sites/default/files/Hello.mp4",
  "hi":           "https://islrtc.nic.in/sites/default/files/Hello.mp4",
  "namaste":      "https://islrtc.nic.in/sites/default/files/Namaste.mp4",
  "goodbye":      "https://islrtc.nic.in/sites/default/files/Goodbye.mp4",
  "bye":          "https://islrtc.nic.in/sites/default/files/Goodbye.mp4",
  "welcome":      "https://islrtc.nic.in/sites/default/files/Welcome.mp4",
  "sorry":        "https://islrtc.nic.in/sites/default/files/Sorry.mp4",
  "please":       "https://islrtc.nic.in/sites/default/files/Please.mp4",
  "thank":        "https://islrtc.nic.in/sites/default/files/Thankyou.mp4",
  "thanks":       "https://islrtc.nic.in/sites/default/files/Thankyou.mp4",
  "yes":          "https://islrtc.nic.in/sites/default/files/Yes.mp4",
  "no":           "https://islrtc.nic.in/sites/default/files/No.mp4",

  // ── Common words ───────────────────────────────────────
  "i":            "https://islrtc.nic.in/sites/default/files/I.mp4",
  "you":          "https://islrtc.nic.in/sites/default/files/You.mp4",
  "we":           "https://islrtc.nic.in/sites/default/files/We.mp4",
  "they":         "https://islrtc.nic.in/sites/default/files/They.mp4",
  "he":           "https://islrtc.nic.in/sites/default/files/He.mp4",
  "she":          "https://islrtc.nic.in/sites/default/files/She.mp4",
  "this":         "https://islrtc.nic.in/sites/default/files/This.mp4",
  "that":         "https://islrtc.nic.in/sites/default/files/That.mp4",
  "what":         "https://islrtc.nic.in/sites/default/files/What.mp4",
  "where":        "https://islrtc.nic.in/sites/default/files/Where.mp4",
  "when":         "https://islrtc.nic.in/sites/default/files/When.mp4",
  "why":          "https://islrtc.nic.in/sites/default/files/Why.mp4",
  "how":          "https://islrtc.nic.in/sites/default/files/How.mp4",
  "who":          "https://islrtc.nic.in/sites/default/files/Who.mp4",
  "good":         "https://islrtc.nic.in/sites/default/files/Good.mp4",
  "bad":          "https://islrtc.nic.in/sites/default/files/Bad.mp4",
  "big":          "https://islrtc.nic.in/sites/default/files/Big.mp4",
  "small":        "https://islrtc.nic.in/sites/default/files/Small.mp4",
  "help":         "https://islrtc.nic.in/sites/default/files/Help.mp4",
  "understand":   "https://islrtc.nic.in/sites/default/files/Understand.mp4",
  "know":         "https://islrtc.nic.in/sites/default/files/Know.mp4",
  "learn":        "https://islrtc.nic.in/sites/default/files/Learn.mp4",
  "teach":        "https://islrtc.nic.in/sites/default/files/Teach.mp4",
  "read":         "https://islrtc.nic.in/sites/default/files/Read.mp4",
  "write":        "https://islrtc.nic.in/sites/default/files/Write.mp4",
  "question":     "https://islrtc.nic.in/sites/default/files/Question.mp4",
  "answer":       "https://islrtc.nic.in/sites/default/files/Answer.mp4",
  "correct":      "https://islrtc.nic.in/sites/default/files/Correct.mp4",
  "wrong":        "https://islrtc.nic.in/sites/default/files/Wrong.mp4",
  "again":        "https://islrtc.nic.in/sites/default/files/Again.mp4",
  "slow":         "https://islrtc.nic.in/sites/default/files/Slow.mp4",
  "fast":         "https://islrtc.nic.in/sites/default/files/Fast.mp4",
  "stop":         "https://islrtc.nic.in/sites/default/files/Stop.mp4",
  "start":        "https://islrtc.nic.in/sites/default/files/Start.mp4",
  "wait":         "https://islrtc.nic.in/sites/default/files/Wait.mp4",
  "come":         "https://islrtc.nic.in/sites/default/files/Come.mp4",
  "go":           "https://islrtc.nic.in/sites/default/files/Go.mp4",
  "open":         "https://islrtc.nic.in/sites/default/files/Open.mp4",
  "close":        "https://islrtc.nic.in/sites/default/files/Close.mp4",
  "today":        "https://islrtc.nic.in/sites/default/files/Today.mp4",
  "tomorrow":     "https://islrtc.nic.in/sites/default/files/Tomorrow.mp4",
  "yesterday":    "https://islrtc.nic.in/sites/default/files/Yesterday.mp4",
  "morning":      "https://islrtc.nic.in/sites/default/files/Morning.mp4",
  "evening":      "https://islrtc.nic.in/sites/default/files/Evening.mp4",
  "night":        "https://islrtc.nic.in/sites/default/files/Night.mp4",
  "time":         "https://islrtc.nic.in/sites/default/files/Time.mp4",
  "day":          "https://islrtc.nic.in/sites/default/files/Day.mp4",
  "week":         "https://islrtc.nic.in/sites/default/files/Week.mp4",
  "month":        "https://islrtc.nic.in/sites/default/files/Month.mp4",
  "year":         "https://islrtc.nic.in/sites/default/files/Year.mp4",
  "name":         "https://islrtc.nic.in/sites/default/files/Name.mp4",
  "home":         "https://islrtc.nic.in/sites/default/files/Home.mp4",
  "school":       "https://islrtc.nic.in/sites/default/files/School.mp4",
  "class":        "https://islrtc.nic.in/sites/default/files/Class.mp4",
  "book":         "https://islrtc.nic.in/sites/default/files/Book.mp4",
  "exam":         "https://islrtc.nic.in/sites/default/files/Exam.mp4",
  "work":         "https://islrtc.nic.in/sites/default/files/Work.mp4",
  "water":        "https://islrtc.nic.in/sites/default/files/Water.mp4",
  "food":         "https://islrtc.nic.in/sites/default/files/Food.mp4",

  // ── Numbers ────────────────────────────────────────────
  "one":          "https://islrtc.nic.in/sites/default/files/One.mp4",
  "two":          "https://islrtc.nic.in/sites/default/files/Two.mp4",
  "three":        "https://islrtc.nic.in/sites/default/files/Three.mp4",
  "four":         "https://islrtc.nic.in/sites/default/files/Four.mp4",
  "five":         "https://islrtc.nic.in/sites/default/files/Five.mp4",
  "six":          "https://islrtc.nic.in/sites/default/files/Six.mp4",
  "seven":        "https://islrtc.nic.in/sites/default/files/Seven.mp4",
  "eight":        "https://islrtc.nic.in/sites/default/files/Eight.mp4",
  "nine":         "https://islrtc.nic.in/sites/default/files/Nine.mp4",
  "ten":          "https://islrtc.nic.in/sites/default/files/Ten.mp4",

  // ── Colors ─────────────────────────────────────────────
  "red":          "https://islrtc.nic.in/sites/default/files/Red.mp4",
  "blue":         "https://islrtc.nic.in/sites/default/files/Blue.mp4",
  "green":        "https://islrtc.nic.in/sites/default/files/Green.mp4",
  "yellow":       "https://islrtc.nic.in/sites/default/files/Yellow.mp4",
  "black":        "https://islrtc.nic.in/sites/default/files/Black.mp4",
  "white":        "https://islrtc.nic.in/sites/default/files/White.mp4",

  // ── Math / Science (for classroom use) ────────────────
  "add":          "https://islrtc.nic.in/sites/default/files/Add.mp4",
  "subtract":     "https://islrtc.nic.in/sites/default/files/Subtract.mp4",
  "multiply":     "https://islrtc.nic.in/sites/default/files/Multiply.mp4",
  "divide":       "https://islrtc.nic.in/sites/default/files/Divide.mp4",
  "equal":        "https://islrtc.nic.in/sites/default/files/Equal.mp4",
  "number":       "https://islrtc.nic.in/sites/default/files/Number.mp4",
  "math":         "https://islrtc.nic.in/sites/default/files/Mathematics.mp4",
  "science":      "https://islrtc.nic.in/sites/default/files/Science.mp4",
  "computer":     "https://islrtc.nic.in/sites/default/files/Computer.mp4",
  "internet":     "https://islrtc.nic.in/sites/default/files/Internet.mp4",
  "problem":      "https://islrtc.nic.in/sites/default/files/Problem.mp4",
  "example":      "https://islrtc.nic.in/sites/default/files/Example.mp4",
  "important":    "https://islrtc.nic.in/sites/default/files/Important.mp4",

};

// Fingerspelling map — each letter A-Z
// Used as fallback when a word is not in the dictionary
export const FINGERSPELLING = {
  "a": "https://islrtc.nic.in/sites/default/files/A.mp4",
  "b": "https://islrtc.nic.in/sites/default/files/B.mp4",
  "c": "https://islrtc.nic.in/sites/default/files/C.mp4",
  "d": "https://islrtc.nic.in/sites/default/files/D.mp4",
  "e": "https://islrtc.nic.in/sites/default/files/E.mp4",
  "f": "https://islrtc.nic.in/sites/default/files/F.mp4",
  "g": "https://islrtc.nic.in/sites/default/files/G.mp4",
  "h": "https://islrtc.nic.in/sites/default/files/H.mp4",
  "i": "https://islrtc.nic.in/sites/default/files/I.mp4",
  "j": "https://islrtc.nic.in/sites/default/files/J.mp4",
  "k": "https://islrtc.nic.in/sites/default/files/K.mp4",
  "l": "https://islrtc.nic.in/sites/default/files/L.mp4",
  "m": "https://islrtc.nic.in/sites/default/files/M.mp4",
  "n": "https://islrtc.nic.in/sites/default/files/N.mp4",
  "o": "https://islrtc.nic.in/sites/default/files/O.mp4",
  "p": "https://islrtc.nic.in/sites/default/files/P.mp4",
  "q": "https://islrtc.nic.in/sites/default/files/Q.mp4",
  "r": "https://islrtc.nic.in/sites/default/files/R.mp4",
  "s": "https://islrtc.nic.in/sites/default/files/S.mp4",
  "t": "https://islrtc.nic.in/sites/default/files/T.mp4",
  "u": "https://islrtc.nic.in/sites/default/files/U.mp4",
  "v": "https://islrtc.nic.in/sites/default/files/V.mp4",
  "w": "https://islrtc.nic.in/sites/default/files/W.mp4",
  "x": "https://islrtc.nic.in/sites/default/files/X.mp4",
  "y": "https://islrtc.nic.in/sites/default/files/Y.mp4",
  "z": "https://islrtc.nic.in/sites/default/files/Z.mp4",
};

// Words to skip entirely (articles, filler words with no sign equivalent)
export const SKIP_WORDS = new Set([
  "a", "an", "the", "is", "are", "was", "were", "be", "been",
  "being", "have", "has", "had", "do", "does", "did", "will",
  "would", "could", "should", "may", "might", "shall", "can",
  "of", "in", "on", "at", "to", "for", "with", "by", "from",
  "up", "about", "into", "through", "during", "it", "its",
]);
