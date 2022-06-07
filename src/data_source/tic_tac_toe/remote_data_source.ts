import { GameState, Player } from "../../domain";
import { ITicTacToeDataSource } from "../../infrastructure";

export class RemoteDataSource implements ITicTacToeDataSource {
  async readGameState(): Promise<{
    gameState: GameState;
    history: Array<GameState>;
  }> {
    console.log("Pidiendo información desde el servidor");

    const gameState: GameState = {
      0: undefined,
      1: Player.X,
      2: undefined,
      3: undefined,
      4: Player.O,
      5: undefined,
      6: Player.X,
      7: undefined,
      8: undefined,
    };

    const history = [
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
        4: Player.O,
        5: undefined,
        6: undefined,
        7: undefined,
        8: undefined,
      },
    ];

    return { gameState, history };
  }

  async saveGameState(
    gameState: GameState,
    history: Array<GameState>
  ): Promise<void> {
    console.log("Se debe guardar el estado en el servidor: ", gameState);
    console.log("Se debe guardar el historial en el servidor: ", history);
  }
}
