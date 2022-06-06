import {
  Game,
  Movement,
  CommandUseCase,
  PlayMovementParam,
} from "../../../domain";
import { ITicTacToePresenter } from "../presenter";
import { ITicTacToeController } from "./i_tic_tac_toe_controller";

export class TicTacToeController implements ITicTacToeController {
  constructor(
    private game: Game,
    private presenter: ITicTacToePresenter,
    private readonly playMovementUseCase: CommandUseCase<PlayMovementParam>
  ) {}

  playMovement(movement: Movement): void {
    const param: PlayMovementParam = {
      game: this.game,
      movement,
    };
    this.playMovementUseCase.execute(param);
    this.presenter.changeGameState(this.game.state);
  }
}
