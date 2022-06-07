import { Game } from "../../entities";
import { ITicTacToeRepository } from "../../repositories";
import { NoParam } from "../no_param";
import { QueryUseCase } from "../query_use_case";

export class GetInitialGame implements QueryUseCase<NoParam, Promise<Game>> {
  constructor(private repository: ITicTacToeRepository) {}

  async execute(_: NoParam): Promise<Game> {
    const { gameState, history } = await this.repository.readGameState();

    return new Game(gameState, history);
  }
}
