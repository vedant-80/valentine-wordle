import { WORDS, VALID_WORDS } from "../constants/wordlist";

export const isWordInWordList = (word: string) => {
  return VALID_WORDS.includes(word.toLowerCase());
};

export const isWinningWord = (word: string) => {
  return solution === word;
};

export const getWordOfDay = () => {
  // Get the start of today (midnight) in milliseconds
  const now = new Date();
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const startOfTodayMs = startOfToday.getTime();

  const nowMs = Date.now();
  const msInDay = 86400000;

  // Calculate days since today (0 = today, 1 = tomorrow, etc.)
  const daysSinceToday = Math.floor((nowMs - startOfTodayMs) / msInDay);
  if (daysSinceToday >= WORDS.length) {
    return WORDS[8].toUpperCase();
  } else {
    return WORDS[daysSinceToday].toUpperCase();
  }
};

export const solution = getWordOfDay();
