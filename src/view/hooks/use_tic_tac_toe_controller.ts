import { useRef } from "react";
import { KeyValueStorageLocalStorage } from "../../data_source/key_value_storage";
import {
  LocalDataSource,
  RemoteDataSource,
} from "../../data_source/tic_tac_toe";
import {
  // Game,
  GetGameWithPreviousState,
  GetInitialGame,
  PlayMovement,
  PlayMovementAndSaveDecorator,
} from "../../domain";
import { SaveGame } from "../../domain/use_cases/storage";
import { TicTacToeRepository } from "../../infrastructure";
import {
  TicTacToeController,
  ITicTacToePresenter,
  ITicTacToeController,
} from "../../presentation";

export const useITicTacToeControllerImplementation = (
  presenter: ITicTacToePresenter
) => {
  const controllerRef = useRef<ITicTacToeController | null>(null);

  function initializeController(): ITicTacToeController {
    if (controllerRef.current === null) {
      controllerRef.current = _createController(presenter);
    }

    return controllerRef.current!;
  }

  return initializeController();
};

function _createController(presenter: ITicTacToePresenter) {
  const keyValueStorage = new KeyValueStorageLocalStorage();
  const localDataSource = new LocalDataSource(keyValueStorage);
  const remoteDataSource = new RemoteDataSource();
  const repository = new TicTacToeRepository(localDataSource, remoteDataSource);
  const getInitialGame = new GetInitialGame(repository);
  const playMovementUseCase = new PlayMovement();
  const saveGame = new SaveGame(repository);
  const playMovementAndSaveDecorator = new PlayMovementAndSaveDecorator(
    saveGame,
    playMovementUseCase
  );
  const getGameWithPreviousState = new GetGameWithPreviousState();

  return new TicTacToeController(
    presenter,
    getInitialGame,
    playMovementAndSaveDecorator,
    getGameWithPreviousState
  );
}
