import { GameState, Movement } from "../../../domain";

export interface ITicTacToeController {
  playMovement(movement: Movement): void;
  jumpToGameState(gameState: GameState): void;
}
