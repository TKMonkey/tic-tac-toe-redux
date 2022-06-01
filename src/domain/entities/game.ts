import { Movement, Player, ValidPosition } from "../value_objects";

export type GameState = Map<ValidPosition, Player | undefined>;
const initialGameState: GameState = new Map([
  [0, undefined],
  [1, undefined],
  [2, undefined],
  [3, undefined],
  [4, undefined],
  [5, undefined],
  [6, undefined],
  [7, undefined],
  [8, undefined],
]);

export class Game {
  constructor(private currentState: GameState = initialGameState) {}

  public get isFinished(): boolean {
    return !!this.calculateWinner(this.currentState);
  }

  public get winner(): Player | undefined {
    return this.calculateWinner(this.currentState);
  }

  public get state(): GameState {
    return new Map(Array.from(this.currentState.entries()));
  }

  public get nextMovement(): Player {
    return Array.from(this.currentState.values()).filter(
      (value: Player | undefined) => !!value
    ).length %
      2 ===
      0
      ? Player.X
      : Player.O;
  }

  public playMovement(movement: Movement) {
    const squares: Map<ValidPosition, Player | undefined> = new Map(
      Array.from(this.currentState.entries())
    );

    const squareIsAlreadyOccupied = !!squares.get(movement.position);
    const isNotPlayerTurn = this.nextMovement !== movement.player;

    if (squareIsAlreadyOccupied || isNotPlayerTurn || this.isFinished) {
      return;
    }

    squares.set(movement.position, movement.player);

    this.currentState = squares;
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
        gameState.get(a) &&
        gameState.get(a) === gameState.get(b) &&
        gameState.get(a) === gameState.get(c)
      ) {
        return gameState.get(a);
      }
    }
    return undefined;
  }
}
