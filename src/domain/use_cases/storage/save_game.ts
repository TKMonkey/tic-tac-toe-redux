import { GameState } from "../../entities";
import { ITicTacToeRepository } from "../../repositories";
import { CommandUseCase } from "../command_use_case";

export interface SaveGameParam {
  gameState: GameState;
  history: Array<GameState>;
}

export class SaveGame implements CommandUseCase<SaveGameParam, Promise<void>> {
  constructor(private repository: ITicTacToeRepository) {}

  async execute(input: SaveGameParam): Promise<void> {
    await this.repository.saveGameState(input.gameState, input.history);
  }
}
