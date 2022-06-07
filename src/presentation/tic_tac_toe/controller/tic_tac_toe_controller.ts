import {
  Game,
  Movement,
  CommandUseCase,
  PlayMovementParam,
  GameState,
  QueryUseCase,
  GetGameWithPreviousStateParam,
} from "../../../domain";
import { ITicTacToePresenter } from "../presenter";
import { ITicTacToeController } from "./i_tic_tac_toe_controller";

export class TicTacToeController implements ITicTacToeController {
  constructor(
    private game: Game,
    private presenter: ITicTacToePresenter,
    private readonly playMovementUseCase: CommandUseCase<PlayMovementParam>,
    private readonly jumpToGameStateUseCase: QueryUseCase<
      GetGameWithPreviousStateParam,
      Game
    >
  ) {}

  playMovement(movement: Movement): void {
    const param: PlayMovementParam = {
      game: this.game,
      movement,
    };
    this.playMovementUseCase.execute(param);
    this.presenter.changeGameState(this.game.state, this.game.history);
  }

  jumpToGameState(gameState: GameState): void {
    const param: GetGameWithPreviousStateParam = {
      newGameState: gameState,
      currentGameState: this.game.state,
      history: this.game.history,
    };
    this.game = this.jumpToGameStateUseCase.execute(param);
    this.presenter.changeGameState(this.game.state, this.game.history);
  }
}
