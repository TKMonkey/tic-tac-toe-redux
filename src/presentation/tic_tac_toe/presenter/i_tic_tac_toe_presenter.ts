import { GameState } from "../../../domain";

export interface ITicTacToePresenter {
  changeGameState(gameState: GameState, history: Array<GameState>): void;
}
