import { Game, Movement, Player } from "../../../domain";

describe("Game", () => {
  it("Should initialize game with all state values undefined", () => {
    // Arrange
    const game = new Game();

    // Act
    const currentState = game.state;

    // Assert
    const initialValue = {
      0: undefined,
      1: undefined,
      2: undefined,
      3: undefined,
      4: undefined,
      5: undefined,
      6: undefined,
      7: undefined,
      8: undefined,
    };

    expect(currentState).toStrictEqual(initialValue);
  });

  it("Should initialize game with received initialState", () => {
    // Arrange
    const initialState = {
      0: undefined,
      1: undefined,
      2: undefined,
      3: Player.X,
      4: undefined,
      5: undefined,
      6: Player.O,
      7: undefined,
      8: undefined,
    };

    const game = new Game(initialState);

    // Act
    const currentState = game.state;

    // Assert
    expect(currentState).toStrictEqual(initialState);
  });

  it("Current winner sould be undefined by default", () => {
    // Arrange
    const game = new Game();

    // Act
    const winner = game.winner;

    // Assert
    expect(winner).toBeUndefined();
  });

  it("isFinished should be false by default", () => {
    // Arrange
    const game = new Game();

    // Act
    const isFinished = game.isFinished;

    // Assert
    expect(isFinished).toBeFalsy();
  });

  it("Should properly handle movement data if value is undefined", () => {
    // Arrange
    const game = new Game();
    const movement = new Movement(6, Player.X);

    // Act
    game.playMovement(movement);
    const currentState = game.state;

    // Assert
    const expectedState = {
      0: undefined,
      1: undefined,
      2: undefined,
      3: undefined,
      4: undefined,
      5: undefined,
      6: Player.X,
      7: undefined,
      8: undefined,
    };

    expect(currentState).toStrictEqual(expectedState);
  });

  it("Should ignore movement data if field is already filled by same player", () => {
    // Arrange
    const initialState = {
      0: undefined,
      1: undefined,
      2: undefined,
      3: undefined,
      4: undefined,
      5: undefined,
      6: Player.X,
      7: undefined,
      8: undefined,
    };
    const game = new Game(initialState);
    const movement = new Movement(6, Player.O);

    // Act
    game.playMovement(movement);
    const currentState = game.state;

    // Assert
    expect(currentState).toStrictEqual(initialState);
  });

  it("Should ignore movement data if field is already filled by different player", () => {
    // Arrange
    const initialState = {
      0: undefined,
      1: undefined,
      2: undefined,
      3: undefined,
      4: undefined,
      5: undefined,
      6: Player.O,
      7: undefined,
      8: undefined,
    };
    const game = new Game(initialState);
    const movement = new Movement(6, Player.X);

    // Act
    game.playMovement(movement);
    const currentState = game.state;

    // Assert
    expect(currentState).toStrictEqual(initialState);
  });

  it("Should ignore movement data if game is already finished", () => {
    // Arrange
    const initialState = {
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

    const game = new Game(initialState);
    const movement = new Movement(0, Player.O);

    // Act
    game.playMovement(movement);
    const currentState = game.state;

    // Assert
    expect(currentState).toStrictEqual(initialState);
  });

  it("Should ignore movement data if is not Player.O turn", () => {
    // Arrange
    const initialState = {
      0: undefined,
      1: undefined,
      2: undefined,
      3: Player.X,
      4: Player.O,
      5: undefined,
      6: undefined,
      7: undefined,
      8: undefined,
    };

    const game = new Game(initialState);
    const movement = new Movement(0, Player.O);

    // Act
    game.playMovement(movement);
    const currentState = game.state;

    // Assert
    expect(currentState).toStrictEqual(initialState);
  });

  it("Should set winner after winning movement by Player.O", () => {
    // Arrange
    const initialState = {
      0: Player.X,
      1: undefined,
      2: undefined,
      3: Player.X,
      4: Player.X,
      5: undefined,
      6: Player.O,
      7: Player.O,
      8: undefined,
    };
    const game = new Game(initialState);
    const movement = new Movement(8, Player.O);

    // Act
    game.playMovement(movement);
    const winner = game.winner;

    // Assert
    expect(winner).toStrictEqual(Player.O);
  });

  it("Should set winner after winning movement by Player.X", () => {
    // Arrange
    const initialState = {
      0: Player.X,
      1: Player.X,
      2: undefined,
      3: undefined,
      4: undefined,
      5: undefined,
      6: Player.O,
      7: Player.O,
      8: undefined,
    };
    const game = new Game(initialState);
    const movement = new Movement(2, Player.X);

    // Act
    game.playMovement(movement);
    const winner = game.winner;

    // Assert
    expect(winner).toStrictEqual(Player.X);
  });

  it("Should set isFinished after winning movement by Player.O", () => {
    // Arrange
    const initialState = {
      0: Player.X,
      1: undefined,
      2: undefined,
      3: Player.X,
      4: Player.X,
      5: undefined,
      6: Player.O,
      7: Player.O,
      8: undefined,
    };

    const game = new Game(initialState);
    const movement = new Movement(8, Player.O);

    // Act
    game.playMovement(movement);
    const isFinished = game.isFinished;

    // Assert
    expect(isFinished).toBeTruthy();
  });

  it("Should set isFinished after winning movement by Player.X", () => {
    // Arrange
    const initialState = {
      0: Player.X,
      1: Player.X,
      2: undefined,
      3: undefined,
      4: undefined,
      5: undefined,
      6: Player.O,
      7: Player.O,
      8: undefined,
    };

    const game = new Game(initialState);
    const movement = new Movement(2, Player.X);

    // Act
    game.playMovement(movement);
    const isFinished = game.isFinished;

    // Assert
    expect(isFinished).toBeTruthy();
  });

  it("Should set isFinished after all fields are filled", () => {
    // Arrange
    const initialState = {
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

    const game = new Game(initialState);
    const movement = new Movement(2, Player.X);

    // Act
    game.playMovement(movement);
    const isFinished = game.isFinished;

    // Assert
    expect(isFinished).toBeTruthy();
  });

  it("Should set previous state", () => {
    // Arrange
    const previousState = {
      0: Player.X,
      1: Player.X,
      2: undefined,
      3: undefined,
      4: undefined,
      5: undefined,
      6: Player.O,
      7: undefined,
      8: undefined,
    };

    const game = new Game();
    const movement1 = new Movement(1, Player.X);
    const movement2 = new Movement(6, Player.O);
    const movement3 = new Movement(0, Player.X);
    const movement4 = new Movement(7, Player.O);

    // Act
    game.playMovement(movement1);
    game.playMovement(movement2);
    game.playMovement(movement3);
    game.playMovement(movement4);

    game.moveToPreviousGameState(previousState);

    // Assert
    expect({ history: game.history, currentState: game.state }).toStrictEqual({
      currentState: { ...previousState },
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
        {
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
        {
          0: undefined,
          1: Player.X,
          2: undefined,
          3: undefined,
          4: undefined,
          5: undefined,
          6: Player.O,
          7: undefined,
          8: undefined,
        },
      ],
    });
  });
});

export {};
