import { CommandUseCase } from "../command_use_case";
import { SaveGameParam } from "../storage";
import { PlayMovementParam } from "./play_movement";

export class PlayMovementAndSaveDecorator
  implements CommandUseCase<PlayMovementParam>
{
  constructor(
    private saveGame: CommandUseCase<SaveGameParam, Promise<void>>,
    private decorated: CommandUseCase<PlayMovementParam>
  ) {}

  execute(input: PlayMovementParam): void {
    const { game } = input;
    this.decorated.execute(input);

    this.saveGame.execute({ gameState: game.state, history: game.history });
  }
}
