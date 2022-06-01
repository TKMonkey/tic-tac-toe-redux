import { Game, Movement } from "../../../domain";
import { CommandUseCase, PlayMovementParam } from "../../../domain/use_cases";
import { ITicTacToeController } from "./i_tic_tac_toe_controller";

export class TicTacToeControllerReact implements ITicTacToeController {
  constructor(
    private game: Game,
    private readonly playMovementUseCase: CommandUseCase<PlayMovementParam>
  ) {}

  playMovement(movement: Movement): void {
    const param: PlayMovementParam = {
      game: this.game,
      movement,
    };
    this.playMovementUseCase.execute(param);
  }
}
