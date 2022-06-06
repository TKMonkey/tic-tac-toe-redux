import { Movement, ValidPosition } from "../domain";
import { Board } from "./board";
import {
  useITicTacToeControllerImplementation,
  useITicTacToePresenterImplementation,
  useTicTacToeViewModelRedux,
} from "./hooks";

export function TicTacToe() {
  const presenter = useITicTacToePresenterImplementation();
  const { gameState, nextPlayer, status } = useTicTacToeViewModelRedux();
  const controller = useITicTacToeControllerImplementation(presenter);

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
        {/* <ol>{moves}</ol> */}
      </div>
    </div>
  );
}
