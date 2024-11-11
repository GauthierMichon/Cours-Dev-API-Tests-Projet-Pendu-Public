export const WORDS = [
  "typescript",
  "développement",
  "programmation",
  "ordinateur",
  "javascript",
  "algorithme",
  "interface",
  "bibliothèque",
  "framework",
  "variable",
];

export function getRandomWord(): string {
  const randomIndex = Math.floor(Math.random() * WORDS.length);
  return WORDS[randomIndex];
}
