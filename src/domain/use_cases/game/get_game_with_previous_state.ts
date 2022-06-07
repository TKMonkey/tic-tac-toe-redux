import { Game, GameState } from "../../entities";
import { QueryUseCase } from "../query_use_case";

export interface GetGameWithPreviousStateParam {
  readonly newGameState: GameState;
  readonly currentGameState: GameState;
  readonly history: Array<GameState>;
}

export class GetGameWithPreviousState
  implements QueryUseCase<GetGameWithPreviousStateParam, Game>
{
  execute(input: GetGameWithPreviousStateParam): Game {
    const { newGameState, currentGameState, history } = input;
    const game = new Game(currentGameState, history);
    game.moveToPreviousGameState(newGameState);
    return game;
  }
}
