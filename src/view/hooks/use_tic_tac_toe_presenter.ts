import { store } from "../../presentation";
import { ITicTacToePresenter } from "../../presentation/tic_tac_toe/presenter";
import { TicTacToePresenterRedux } from "../../presentation/tic_tac_toe/presenter/tic_tac_toe_presenter";

export const useITicTacToePresenterImplementation = (): ITicTacToePresenter => {
  const ticTacToePresenter = new TicTacToePresenterRedux(store);

  return ticTacToePresenter;
};
