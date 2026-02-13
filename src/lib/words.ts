import { WORDS, VALID_WORDS } from "../constants/wordlist";

export const isWordInWordList = (word: string) => {
  return VALID_WORDS.includes(word.toLowerCase());
};

export const isWinningWord = (word: string) => {
  return solution === word;
};

export const getWordOfDay = () => {
  // Get the start of today (midnight) in milliseconds
  return WORDS[8].toUpperCase();
};

export const solution = getWordOfDay();
