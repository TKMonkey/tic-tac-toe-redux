import { Movement } from "../../../domain";

export interface ITicTacToeController {
  playMovement(movement: Movement): void;
}
