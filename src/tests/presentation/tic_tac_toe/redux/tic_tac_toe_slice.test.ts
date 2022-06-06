import { Player } from "../../../../domain";
import { TicTacToeViewModel, gameStateChanged } from "../../../../presentation";
import reducer from "../../../../presentation/tic_tac_toe/redux/tic_tac_toe_slice";

describe("TicTacToeReducer", () => {
  test("it should return new state after movement", () => {
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
      gameOver: false,
      gameState: initialGameState,
      nextPlayer: Player.X,
      winner: undefined,
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
      gameOver: false,
      gameState: finalGameState,
      nextPlayer: Player.O,
      winner: undefined,
    });
  });
});
