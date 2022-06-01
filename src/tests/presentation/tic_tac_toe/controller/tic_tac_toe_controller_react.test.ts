import { Game, Movement, Player } from "../../../../domain";
import {
  CommandUseCase,
  PlayMovementParam,
} from "../../../../domain/use_cases";
import { TicTacToeControllerReact } from "../../../../presentation/tic_tac_toe";

describe("TicTacToeControllerReact", () => {
  it("Should call PlayMovement use case with proper data", () => {
    // Arrange
    class A implements CommandUseCase<PlayMovementParam> {
      constructor(private receivedInput?: PlayMovementParam) {}

      execute(input: PlayMovementParam): void {
        this.receivedInput = input;
      }

      get input(): PlayMovementParam | undefined {
        return this.receivedInput;
      }
    }

    const a = new A();
    const game = new Game();
    const ticTacToeController = new TicTacToeControllerReact(game, a);
    const movement = new Movement(1, Player.X);

    // Act
    ticTacToeController.playMovement(movement);

    // Assert
    expect(a.input).toStrictEqual({ game, movement });
  });
});

export {};
