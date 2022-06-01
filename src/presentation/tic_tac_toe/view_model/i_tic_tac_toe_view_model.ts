import { GameState, Player } from "../../../domain";

export interface TicTacToeViewModel {
  nextPlayer: Player;
  winner: Player | undefined;
  gameState: GameState;
}
