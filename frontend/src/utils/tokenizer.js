// src/utils/tokenizer.js
// Converts a sentence into a queue of sign tokens

import { ISL_DICTIONARY, FINGERSPELLING, SKIP_WORDS } from "../data/isl_dictionary.js";

/**
 * Takes a raw transcript sentence and returns an array of sign tokens.
 * Each token is either:
 *   { type: "sign",   word, videoUrl }         → known ISL word
 *   { type: "spell",  word, letters: [...] }   → fingerspell unknown word
 *   { type: "text",   word }                   → show as text only (skip words)
 */
export function tokenizeSentence(sentence) {
  // Clean and split into words
  const words = sentence
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")   // remove punctuation
    .split(/\s+/)
    .filter(Boolean);

  const tokens = [];

  for (const word of words) {
    if (!word) continue;

    // Skip filler words silently
    if (SKIP_WORDS.has(word)) continue;

    // Check ISL dictionary first
    if (ISL_DICTIONARY[word]) {
      tokens.push({
        type: "sign",
        word,
        videoUrl: ISL_DICTIONARY[word],
      });
      continue;
    }

    // Try stemming: remove common suffixes and check again
    const stem = simpleStem(word);
    if (stem !== word && ISL_DICTIONARY[stem]) {
      tokens.push({
        type: "sign",
        word,          // show original word
        videoUrl: ISL_DICTIONARY[stem],
      });
      continue;
    }

    // Unknown word → show as text label
    // (fingerspelling can be added later when ISLRTC letter videos are verified)
    tokens.push({
      type: "text",
      word,
    });
  }

  return tokens;
}

/**
 * Very simple suffix stripper — helps match "teaching" → "teach", "questions" → "question"
 */
function simpleStem(word) {
  const suffixes = ["ing", "tion", "ed", "er", "est", "ly", "s", "es"];
  for (const suffix of suffixes) {
    if (word.endsWith(suffix) && word.length > suffix.length + 2) {
      return word.slice(0, -suffix.length);
    }
  }
  return word;
}
