import { GameState, Player, ValidPosition } from "../../domain";
import { ITicTacToeDataSource } from "../../infrastructure";
import { IKeyValueStorage } from "../key_value_storage";

export class LocalDataSource implements ITicTacToeDataSource {
  private gameStateKey = "gameState";
  private historyKey = "history";

  constructor(private keyValueStorage: IKeyValueStorage) {}

  async readGameState(): Promise<{
    gameState: GameState;
    history: Array<GameState>;
  }> {
    const gameState = await this.keyValueStorage.readString(this.gameStateKey);
    const json = JSON.parse(gameState || "{}");

    const history = await this.keyValueStorage.readString(this.historyKey);

    const parsedGameState = GameStateDto.fromJson(json);
    const historyJson = JSON.parse(history || "[]") as Array<Object>;
    const parsedHistory = historyJson.map((json) => {
      return GameStateDto.fromJson(json);
    });

    return { gameState: parsedGameState, history: parsedHistory };
  }

  async saveGameState(
    gameState: GameState,
    history: Array<GameState>
  ): Promise<void> {
    await this.keyValueStorage.save(this.gameStateKey, gameState);
    await this.keyValueStorage.save(this.historyKey, history);
  }
}

class GameStateDto {
  static fromJson(json: any): GameState {
    const possibleKeys = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    const possibleValues = new Set([Player.O, Player.X, undefined]);

    let newGameState = {
      0: undefined,
      1: undefined,
      2: undefined,
      3: undefined,
      4: undefined,
      5: undefined,
      6: undefined,
      7: undefined,
      8: undefined,
    };

    possibleKeys.forEach((key: number, _, __) => {
      if (!json.hasOwnProperty(key) || !possibleValues.has(json[key])) {
        return;
      }

      const value = json[key];
      newGameState[key as ValidPosition] = value;
    });
    return newGameState;
  }
}
