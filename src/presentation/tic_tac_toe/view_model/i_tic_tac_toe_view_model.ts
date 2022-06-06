import { GameState, Player } from "../../../domain";

export interface TicTacToeViewModel {
  nextPlayer: Player;
  gameOver: boolean;
  winner: Player | undefined;
  gameState: GameState;
}
