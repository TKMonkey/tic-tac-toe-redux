import { Player } from "../../../../domain";
import {
  gameStateChanged,
  TicTacToeStore,
  TicTacToePresenterRedux,
} from "../../../../presentation";

describe("TicTacToePresenterRedux", () => {
  test("Should dispatch gameStateChanged action with proper data", () => {
    // Arrange
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

    const dispatch = jest.fn();
    const store = {
      dispatch,
    };
    const presenter = new TicTacToePresenterRedux(
      store as unknown as TicTacToeStore
    );

    // Act
    presenter.changeGameState(finalGameState);

    // Assert
    expect(dispatch).toHaveBeenCalledWith(
      gameStateChanged({ game: { ...finalGameState } })
    );
  });
});
