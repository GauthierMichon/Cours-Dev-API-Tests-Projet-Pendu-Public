import { Game } from "../game";
import * as fs from "fs";

jest.mock("readline");

const SAVE_FILE = "savegame.json";

describe("Game - Pendu", () => {
  let game: Game;

  beforeEach(() => {
    if (fs.existsSync(SAVE_FILE)) {
      fs.unlinkSync(SAVE_FILE);
    }

    game = new Game("développement", 6);
  });

  afterEach(() => {
    if (fs.existsSync(SAVE_FILE)) {
      fs.unlinkSync(SAVE_FILE);
    }
  });

  it("devrait sauvegarder l'état du jeu et le restaurer correctement", () => {});

  it("devrait ne pas permettre de deviner plus de tentatives que le maximum autorisé", () => {
    game.guess("z");
    game.guess("x");
    game.guess("q");
    game.guess("j");
    game.guess("k");
    game.guess("w");

    expect(game.isGameOver()).toBe(true);
    expect(game["attempts"]).toBeLessThanOrEqual(game["maxAttempts"]);
  });

  it("doit gérer correctement le chargement d'une partie après la suppression d'un fichier de sauvegarde", () => {});
});
