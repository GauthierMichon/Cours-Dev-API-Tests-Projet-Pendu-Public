export class Word {
  hiddenWord: string;
  guessedLetters: Set<string>;

  constructor(word: string, guessedLetters: Set<string> = new Set()) {
    this.hiddenWord = word.toLowerCase();
    this.guessedLetters = guessedLetters;
  }

  guessLetter(letter: string): boolean {
    letter = letter.toLowerCase();
    if (!this.guessedLetters.has(letter) && this.hiddenWord.includes(letter)) {
      this.guessedLetters.add(letter);
      return true;
    }
    this.guessedLetters.add(letter);
    return false;
  }

  getDisplayWord(): string {
    return [...this.hiddenWord]
      .map((letter) => (this.guessedLetters.has(letter) ? letter : "_"))
      .join(" ");
  }

  isComplete(): boolean {
    return [...this.hiddenWord].every((letter) =>
      this.guessedLetters.has(letter)
    );
  }

  getHiddenWord(): string {
    return this.hiddenWord;
  }

  revealWord(): void {
    [...this.hiddenWord].forEach((letter) => this.guessedLetters.add(letter));
  }

  getGuessedLetters(): Set<string> {
    return this.guessedLetters;
  }
}
