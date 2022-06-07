import { GameState } from "../../domain";

export interface ITicTacToeDataSource {
  readGameState(): Promise<{ gameState: GameState; history: Array<GameState> }>;

  saveGameState(gameState: GameState, history: Array<GameState>): Promise<void>;
}
