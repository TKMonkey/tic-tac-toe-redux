import { GameState } from "../entities";

export interface ITicTacToeRepository {
  saveGameState(gameState: GameState, history: Array<GameState>): Promise<void>;

  readGameState(): Promise<{ gameState: GameState; history: Array<GameState> }>;
}
