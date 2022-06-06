import { Game, Movement, Player } from "../../../../domain";
import { PlayMovement } from "../../../../domain/use_cases";

describe("PlayMovement", () => {
  it("Should change game status", () => {
    // Arrange
    const game = new Game();
    const playMovement = new PlayMovement();

    // Act
    const movement = new Movement(1, Player.X);
    playMovement.execute({ game, movement });

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

    expect(game.state).toStrictEqual(expectedValue);
  });
});

export {};
