import { Movement, ValidPosition } from "../domain";
import { Board } from "./board";
import {
  useITicTacToeControllerImplementation,
  useITicTacToePresenterImplementation,
  useTicTacToeViewModelRedux,
} from "./hooks";

export function TicTacToe() {
  const presenter = useITicTacToePresenterImplementation();
  const { gameState, nextPlayer, status, history } =
    useTicTacToeViewModelRedux();
  const controller = useITicTacToeControllerImplementation(presenter);

  const moves = history.map((step, move) => {
    const desc = move ? `Go to move #${move}` : "Go to Start";
    return (
      <li key={move}>
        <button onClick={() => controller.jumpToGameState(history[move])}>
          {desc}
        </button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board
          squares={gameState}
          onClick={(i: ValidPosition) => {
            const movement = new Movement(i, nextPlayer);

            controller.playMovement(movement);
          }}
        />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ol>{moves}</ol>
      </div>
    </div>
  );
}
