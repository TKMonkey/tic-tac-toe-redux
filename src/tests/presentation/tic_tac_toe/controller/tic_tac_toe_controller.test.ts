import { Game, GameState, Movement, Player } from "../../../../domain";
import {
  CommandUseCase,
  GetGameWithPreviousStateParam,
  PlayMovementParam,
  QueryUseCase,
} from "../../../../domain/use_cases";
import { TicTacToeController } from "../../../../presentation/tic_tac_toe";
import { ITicTacToePresenter } from "../../../../presentation/tic_tac_toe/presenter";

class MockPlayMovement implements CommandUseCase<PlayMovementParam> {
  constructor(private receivedInput?: PlayMovementParam) {}

  execute(input: PlayMovementParam): void {
    this.receivedInput = input;
  }

  get input(): PlayMovementParam | undefined {
    return this.receivedInput;
  }
}

class MockJumpToGameState
  implements QueryUseCase<GetGameWithPreviousStateParam, Game>
{
  constructor(
    private gameToReturn?: Game,
    private receivedInput?: GetGameWithPreviousStateParam
  ) {}

  execute(input: GetGameWithPreviousStateParam): Game {
    this.receivedInput = input;
    return this.gameToReturn ?? new Game(input.currentGameState);
  }

  get input(): GetGameWithPreviousStateParam | undefined {
    return this.receivedInput;
  }
}

class TTTP implements ITicTacToePresenter {
  constructor(
    private receivedInput?: GameState,
    private receivedHistory?: Array<GameState>
  ) {}

  changeGameState(gameState: GameState, history: Array<GameState>): void {
    this.receivedInput = gameState;
    this.receivedHistory = history;
  }

  get input(): GameState | undefined {
    return this.receivedInput;
  }

  get history(): Array<GameState> | undefined {
    return this.receivedHistory;
  }
}

describe("TicTacToeController", () => {
  describe("playMovement", () => {
    it("Should call PlayMovement use case with proper data", () => {
      // Arrange

      const a = new MockPlayMovement();
      const b = new MockJumpToGameState();
      const game = new Game();
      const presenter = new TTTP();
      const ticTacToeController = new TicTacToeController(
        game,
        presenter,
        a,
        b
      );
      const movement = new Movement(1, Player.X);

      // Act
      ticTacToeController.playMovement(movement);

      // Assert
      expect(a.input).toStrictEqual({ game, movement });
    });

    it("Should call ITicTacToePresenter with new game state", () => {
      // Arrange
      const playMovement = new MockPlayMovement();
      const jumpToGameState = new MockJumpToGameState();
      const game = new Game();
      const presenter = new TTTP();
      const ticTacToeController = new TicTacToeController(
        game,
        presenter,
        playMovement,
        jumpToGameState
      );
      const movement = new Movement(1, Player.X);

      // Act
      ticTacToeController.playMovement(movement);

      // Assert
      expect({
        input: presenter.input,
        history: presenter.history,
      }).toStrictEqual({ input: game.state, history: game.history });
    });
  });

  describe("jumpToGameState", () => {
    it("Should call JumpToGameState use case with proper data", () => {
      // Arrange
      const a = new MockPlayMovement();
      const b = new MockJumpToGameState();
      const game = new Game();
      const presenter = new TTTP();
      const ticTacToeController = new TicTacToeController(
        game,
        presenter,
        a,
        b
      );
      const movement1 = new Movement(1, Player.X);
      const movement2 = new Movement(0, Player.O);
      const movement3 = new Movement(2, Player.X);
      const movement4 = new Movement(4, Player.O);

      // Act
      ticTacToeController.playMovement(movement1);
      ticTacToeController.playMovement(movement2);
      ticTacToeController.playMovement(movement3);
      ticTacToeController.playMovement(movement4);

      ticTacToeController.jumpToGameState({
        0: Player.O,
        1: Player.X,
        2: undefined,
        3: undefined,
        4: undefined,
        5: undefined,
        6: undefined,
        7: undefined,
        8: undefined,
      });

      // Assert
      expect(b.input).toStrictEqual({
        newGameState: {
          0: Player.O,
          1: Player.X,
          2: undefined,
          3: undefined,
          4: undefined,
          5: undefined,
          6: undefined,
          7: undefined,
          8: undefined,
        },
        currentGameState: game.state,
        history: game.history,
      });
    });

    it("Should call ITicTacToePresenter with new game state", () => {
      // Arrange
      const newGame = new Game({
        0: Player.O,
        1: Player.X,
        2: Player.X,
        3: undefined,
        4: Player.O,
        5: undefined,
        6: undefined,
        7: undefined,
        8: undefined,
      });

      const a = new MockPlayMovement();
      const b = new MockJumpToGameState(newGame);
      const game = new Game();
      const presenter = new TTTP();
      const ticTacToeController = new TicTacToeController(
        game,
        presenter,
        a,
        b
      );
      const movement1 = new Movement(1, Player.X);
      const movement2 = new Movement(0, Player.O);
      const movement3 = new Movement(2, Player.X);
      const movement4 = new Movement(4, Player.O);

      // Act
      ticTacToeController.playMovement(movement1);
      ticTacToeController.playMovement(movement2);
      ticTacToeController.playMovement(movement3);
      ticTacToeController.playMovement(movement4);

      ticTacToeController.jumpToGameState({
        0: Player.O,
        1: Player.X,
        2: undefined,
        3: undefined,
        4: undefined,
        5: undefined,
        6: undefined,
        7: undefined,
        8: undefined,
      });

      // Assert
      expect({
        input: presenter.input,
        history: presenter.history,
      }).toStrictEqual({ input: newGame.state, history: newGame.history });
    });
  });
});
