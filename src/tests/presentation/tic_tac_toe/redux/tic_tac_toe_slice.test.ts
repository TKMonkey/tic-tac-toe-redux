import { Player } from "../../../../domain";
import { TicTacToeViewModel, gameStateChanged } from "../../../../presentation";
import reducer from "../../../../presentation/tic_tac_toe/redux/tic_tac_toe_slice";

describe("TicTacToeReducer", () => {
  test("it should return new state after movement with next player Player.O", () => {
    // Arrange

    const initialGameState = {
      0: undefined,
      1: undefined,
      2: undefined,
      3: undefined,
      4: undefined,
      5: undefined,
      6: Player.O,
      7: Player.X,
      8: undefined,
    };

    const initialState: TicTacToeViewModel = {
      gameState: initialGameState,
      nextPlayer: Player.X,
      status: "",
    };

    const finalGameState = {
      0: undefined,
      1: undefined,
      2: undefined,
      3: undefined,
      4: undefined,
      5: Player.X,
      6: Player.O,
      7: Player.X,
      8: undefined,
    };

    // Act

    const newState: TicTacToeViewModel = reducer(
      initialState,
      gameStateChanged({
        game: finalGameState,
      })
    );

    // Assert

    expect(newState).toStrictEqual({
      gameState: finalGameState,
      nextPlayer: Player.O,
      status: `Next player is: ${Player.O}`,
    });
  });

  test("it should return new state after movement with next player Player.X", () => {
    // Arrange

    const initialGameState = {
      0: undefined,
      1: undefined,
      2: undefined,
      3: undefined,
      4: undefined,
      5: Player.X,
      6: Player.O,
      7: Player.X,
      8: undefined,
    };

    const initialState: TicTacToeViewModel = {
      gameState: initialGameState,
      nextPlayer: Player.X,
      status: "",
    };

    const finalGameState = {
      0: undefined,
      1: undefined,
      2: undefined,
      3: undefined,
      4: Player.O,
      5: Player.X,
      6: Player.O,
      7: Player.X,
      8: undefined,
    };

    // Act

    const newState: TicTacToeViewModel = reducer(
      initialState,
      gameStateChanged({
        game: finalGameState,
      })
    );

    // Assert

    expect(newState).toStrictEqual({
      gameState: finalGameState,
      nextPlayer: Player.X,
      status: `Next player is: ${Player.X}`,
    });
  });

  test("it should return new state after movement when Player.X won", () => {
    // Arrange

    const initialGameState = {
      0: undefined,
      1: undefined,
      2: undefined,
      3: undefined,
      4: Player.X,
      5: Player.X,
      6: Player.O,
      7: Player.O,
      8: undefined,
    };

    const initialState: TicTacToeViewModel = {
      gameState: initialGameState,
      nextPlayer: Player.X,
      status: "",
    };

    const finalGameState = {
      0: undefined,
      1: undefined,
      2: undefined,
      3: Player.X,
      4: Player.X,
      5: Player.X,
      6: Player.O,
      7: Player.O,
      8: undefined,
    };

    // Act

    const newState: TicTacToeViewModel = reducer(
      initialState,
      gameStateChanged({
        game: finalGameState,
      })
    );

    // Assert

    expect(newState).toStrictEqual({
      gameState: finalGameState,
      nextPlayer: Player.O,
      status: `The winner is: ${Player.X}`,
    });
  });

  test("it should return new state after movement when Player.O won", () => {
    // Arrange

    const initialGameState = {
      0: undefined,
      1: undefined,
      2: Player.X,
      3: undefined,
      4: Player.X,
      5: Player.X,
      6: Player.O,
      7: Player.O,
      8: undefined,
    };

    const initialState: TicTacToeViewModel = {
      gameState: initialGameState,
      nextPlayer: Player.X,
      status: "",
    };

    const finalGameState = {
      0: undefined,
      1: undefined,
      2: Player.X,
      3: undefined,
      4: Player.X,
      5: Player.X,
      6: Player.O,
      7: Player.O,
      8: Player.O,
    };

    // Act

    const newState: TicTacToeViewModel = reducer(
      initialState,
      gameStateChanged({
        game: finalGameState,
      })
    );

    // Assert

    expect(newState).toStrictEqual({
      gameState: finalGameState,
      nextPlayer: Player.X,
      status: `The winner is: ${Player.O}`,
    });
  });

  test("it should return new state after movement with status no one won", () => {
    // Arrange

    const initialGameState = {
      0: undefined,
      1: Player.X,
      2: Player.O,
      3: Player.O,
      4: Player.O,
      5: Player.X,
      6: Player.X,
      7: Player.O,
      8: Player.X,
    };

    const initialState: TicTacToeViewModel = {
      gameState: initialGameState,
      nextPlayer: Player.X,
      status: "",
    };

    const finalGameState = {
      0: Player.X,
      1: Player.X,
      2: Player.O,
      3: Player.O,
      4: Player.O,
      5: Player.X,
      6: Player.X,
      7: Player.O,
      8: Player.X,
    };

    // Act

    const newState: TicTacToeViewModel = reducer(
      initialState,
      gameStateChanged({
        game: finalGameState,
      })
    );

    // Assert

    expect(newState).toStrictEqual({
      gameState: finalGameState,
      nextPlayer: Player.O,
      status: `No one won :(`,
    });
  });
});
