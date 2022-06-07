import { useRef } from "react";
import { Game, GetGameWithPreviousState, PlayMovement } from "../../domain";
import { TicTacToeController, ITicTacToePresenter } from "../../presentation";

export const useITicTacToeControllerImplementation = (
  presenter: ITicTacToePresenter
) => {
  const game = new Game();
  const playMovementUseCase = new PlayMovement();
  const getGameWithPreviousState = new GetGameWithPreviousState();

  const controllerRef = useRef(
    new TicTacToeController(
      game,
      presenter,
      playMovementUseCase,
      getGameWithPreviousState
    )
  );

  return controllerRef.current;
};
