import { GameState, Player } from "../../../domain";

export interface TicTacToeViewModel {
  nextPlayer: Player;
  status: string;
  gameState: GameState;
  history: Array<GameState>;
}
