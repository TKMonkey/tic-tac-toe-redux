import { Game } from "../../entities";
import { Movement } from "../../value_objects";
import { CommandUseCase } from "../command_use_case";

export interface PlayMovementParam {
  readonly game: Game;
  readonly movement: Movement;
}

export class PlayMovement implements CommandUseCase<PlayMovementParam> {
  execute(input: PlayMovementParam): void {
    const { game, movement } = input;
    game.playMovement(movement);
  }
}
