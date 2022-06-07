import { GameState, ITicTacToeRepository } from "../../domain";
import { ITicTacToeDataSource } from "./i_tic_tac_toe_data_source";

export class TicTacToeRepository implements ITicTacToeRepository {
  constructor(
    private localDataSource: ITicTacToeDataSource,
    private remoteDataSource: ITicTacToeDataSource
  ) {}

  async readGameState(): Promise<{
    gameState: GameState;
    history: Array<GameState>;
  }> {
    const remoteData = await this.remoteDataSource.readGameState();
    const localData = await this.localDataSource.readGameState();

    const initialData = this.remoteIsInitial(remoteData)
      ? remoteData
      : localData;

    return initialData;
  }

  async saveGameState(
    gameState: GameState,
    history: Array<GameState>
  ): Promise<void> {
    await Promise.all([
      this.localDataSource.saveGameState(gameState, history),
      this.remoteDataSource.saveGameState(gameState, history),
    ]);
  }

  remoteIsInitial(data: {
    gameState: GameState;
    history: Array<GameState>;
  }): boolean {
    const initial = {
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

    return JSON.stringify(data.gameState) === JSON.stringify(initial);
  }
}
