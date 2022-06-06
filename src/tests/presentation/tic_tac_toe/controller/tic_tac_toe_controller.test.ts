import { Game, GameState, Movement, Player } from "../../../../domain";
import {
  CommandUseCase,
  PlayMovementParam,
} from "../../../../domain/use_cases";
import { TicTacToeController } from "../../../../presentation/tic_tac_toe";
import { ITicTacToePresenter } from "../../../../presentation/tic_tac_toe/presenter";

describe("TicTacToeController", () => {
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

    class TTTP implements ITicTacToePresenter {
      changeGameState(gameState: GameState): void {}
    }

    const a = new A();
    const game = new Game();
    const presenter = new TTTP();
    const ticTacToeController = new TicTacToeController(game, presenter, a);
    const movement = new Movement(1, Player.X);

    // Act
    ticTacToeController.playMovement(movement);

    // Assert
    expect(a.input).toStrictEqual({ game, movement });
  });

  it("Should call ITicTacToePresenter with new game state", () => {
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

    class TTTP implements ITicTacToePresenter {
      constructor(private receivedInput?: GameState) {}

      changeGameState(gameState: GameState): void {
        this.receivedInput = gameState;
      }

      get input(): GameState | undefined {
        return this.receivedInput;
      }
    }

    const a = new A();
    const game = new Game();
    const presenter = new TTTP();
    const ticTacToeController = new TicTacToeController(game, presenter, a);
    const movement = new Movement(1, Player.X);

    // Act
    ticTacToeController.playMovement(movement);

    // Assert
    expect(presenter.input).toStrictEqual(game.state);
  });
});
