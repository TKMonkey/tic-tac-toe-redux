import { Movement, Player, ValidPosition } from "../value_objects";

export type GameState = {
  [key in ValidPosition]: Player | undefined;
};

const initialGameState: GameState = {
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

export class Game {
  constructor(
    private currentState: GameState = initialGameState,
    private _history: Array<GameState> = []
  ) {}

  public get isFinished(): boolean {
    return (
      this.movementsCount === 9 || !!this.calculateWinner(this.currentState)
    );
  }

  public get winner(): Player | undefined {
    return this.calculateWinner(this.currentState);
  }

  public get state(): GameState {
    return { ...this.currentState };
  }
  public get history(): Array<GameState> {
    return [...this._history];
  }

  public get nextMovement(): Player {
    return this.movementsCount % 2 === 0 ? Player.X : Player.O;
  }

  public playMovement(movement: Movement) {
    const squares: GameState = { ...this.currentState };

    const squareIsAlreadyOccupied = !!squares[movement.position];
    const isNotPlayerTurn = this.nextMovement !== movement.player;

    if (squareIsAlreadyOccupied || isNotPlayerTurn || this.isFinished) {
      return;
    }

    squares[movement.position] = movement.player;

    this._history = this.getHistory(squares);
    this.currentState = squares;
  }

  public moveToPreviousGameState(gameState: GameState) {
    this._history = this.getHistory(gameState);
    this.currentState = { ...gameState };
  }

  private getHistory(newGameState: GameState): Array<GameState> {
    const serializedGameState = JSON.stringify(newGameState);
    const currentStatePosition = this._history.findIndex((v, i, obj) => {
      return JSON.stringify(v) === serializedGameState;
    });
    let newHistory = [...this._history];
    if (currentStatePosition === -1) {
      newHistory.push({ ...this.currentState });
    } else {
      newHistory = newHistory.slice(0, currentStatePosition);
    }

    return newHistory;
  }

  private get movementsCount(): number {
    const validPositions: Array<ValidPosition> = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    return validPositions
      .map((vP) => this.currentState[vP])
      .filter((value: Player | undefined) => !!value).length;
  }

  private calculateWinner(gameState: GameState): Player | undefined {
    const lines: Array<Array<ValidPosition>> = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        gameState[a] &&
        gameState[a] === gameState[b] &&
        gameState[a] === gameState[c]
      ) {
        return gameState[a];
      }
    }
    return undefined;
  }
}
