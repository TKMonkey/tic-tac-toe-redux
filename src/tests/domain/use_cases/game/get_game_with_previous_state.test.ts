import { Game, Movement, Player } from "../../../../domain";
import { GetGameWithPreviousState } from "../../../../domain/use_cases";

describe("GetGameWithPreviousState", () => {
  it("Should change game status and history properly", () => {
    // Arrange
    const game = new Game();
    const getGameWithPreviousState = new GetGameWithPreviousState();

    // Act
    const movement1 = new Movement(1, Player.X);
    const movement2 = new Movement(0, Player.O);
    const movement3 = new Movement(2, Player.X);

    game.playMovement(movement1);
    game.playMovement(movement2);
    game.playMovement(movement3);

    const newGame = getGameWithPreviousState.execute({
      newGameState: {
        0: undefined,
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

    // Assert
    const expectedValue = {
      0: undefined,
      1: Player.X,
      2: undefined,
      3: undefined,
      4: undefined,
      5: undefined,
      6: undefined,
      7: undefined,
      8: undefined,
    };

    expect({
      state: newGame.state,
      history: newGame.history,
    }).toStrictEqual({
      state: { ...expectedValue },
      history: [
        {
          0: undefined,
          1: undefined,
          2: undefined,
          3: undefined,
          4: undefined,
          5: undefined,
          6: undefined,
          7: undefined,
          8: undefined,
        },
      ],
    });
  });
});
