import { Word } from "./word";
import { getRandomWord } from "./dictionary";
import * as readline from "readline";
import * as fs from "fs";

const SAVE_FILE = "savegame.json";

export class Game {
  word: Word;
  maxAttempts: number;
  attempts: number = 0;
  rl: readline.Interface;

  constructor(
    wordToGuess: string,
    maxAttempts: number = 6,
    attempts: number = 0,
    guessedLetters: Set<string> = new Set()
  ) {
    this.word = new Word(wordToGuess, guessedLetters);
    this.maxAttempts = maxAttempts;
    this.attempts = attempts;
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    this.displayStatus();
  }

  static loadGame(): Game {
    if (fs.existsSync(SAVE_FILE)) {
      const saveData = JSON.parse(fs.readFileSync(SAVE_FILE, "utf-8"));
      console.log("Reprise de la partie sauvegardée.");
      return new Game(
        saveData.wordToGuess,
        saveData.maxAttempts,
        saveData.attempts,
        new Set(saveData.guessedLetters)
      );
    } else {
      const wordToGuess = getRandomWord();
      console.log("Aucune sauvegarde trouvée. Nouvelle partie !");
      return new Game(wordToGuess, 6);
    }
  }

  handleLetterGuess(letter: string): void {
    const isCorrect = this.word.guessLetter(letter);
    if (!isCorrect) this.attempts++;
    this.displayStatus();
  }

  handleWordGuess(wordGuess: string): void {
    if (wordGuess.toLowerCase() === this.word.getHiddenWord()) {
      console.log("Félicitations, vous avez trouvé le mot !");
      this.word.revealWord();
    } else {
      console.log(`Le mot "${wordGuess}" n'est pas correct.`);
    }
    this.displayStatus();
  }

  displayStatus(): void {
    console.log(`Mot: ${this.word.getDisplayWord()}`);
    console.log(`Tentatives restantes: ${this.maxAttempts - this.attempts}`);
    if (this.word.isComplete()) {
      console.log("Félicitations, vous avez gagné !");
      fs.unlinkSync(SAVE_FILE);
      if (this.rl) {
        this.rl.close();
      }
    } else if (this.attempts >= this.maxAttempts) {
      console.log(
        `Vous avez perdu ! Le mot était : ${this.word.getHiddenWord()}`
      );
      fs.unlinkSync(SAVE_FILE);
      if (this.rl) {
        this.rl.close();
      }
    }
  }

  saveGame(): void {
    const saveData = {
      wordToGuess: this.word.getHiddenWord(),
      maxAttempts: this.maxAttempts,
      attempts: this.attempts,
      guessedLetters: Array.from(this.word.getGuessedLetters()),
    };
    fs.writeFileSync(SAVE_FILE, JSON.stringify(saveData), "utf-8");
  }

  guess(input: string): void {
    if (this.isGameOver()) {
      console.log("Le jeu est terminé !");
      return;
    }

    if (input.length === 1) {
      this.handleLetterGuess(input);
    } else {
      this.handleWordGuess(input);
    }
    this.saveGame();
  }

  isGameOver(): boolean {
    return this.word.isComplete() || this.attempts >= this.maxAttempts;
  }

  play(): void {
    const askForInput = () => {
      this.rl.question("Proposez une lettre ou un mot: ", (input) => {
        this.guess(input);
        if (!this.isGameOver()) {
          askForInput();
        }
      });
    };
    askForInput();
  }
}
