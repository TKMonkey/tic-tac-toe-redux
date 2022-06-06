import { useSelector } from "react-redux";
import { TicTacToeViewModel, TicTacToeRootState } from "../../presentation/";

export const useTicTacToeViewModelRedux = (): TicTacToeViewModel => {
  const ticTacToeViewModel: TicTacToeViewModel = useSelector<
    TicTacToeRootState,
    TicTacToeViewModel
  >((state) => {
    return state.ticTacToe;
  });

  return ticTacToeViewModel;
};
