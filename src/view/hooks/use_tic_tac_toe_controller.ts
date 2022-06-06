import { useRef } from "react";
import { Game, PlayMovement } from "../../domain";
import { TicTacToeController, ITicTacToePresenter } from "../../presentation";

export const useITicTacToeControllerImplementation = (
  presenter: ITicTacToePresenter
) => {
  const game = new Game();
  const playMovementUseCase = new PlayMovement();

  const controllerRef = useRef(
    new TicTacToeController(game, presenter, playMovementUseCase)
  );

  return controllerRef.current;
};
