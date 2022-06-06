import { configureStore } from "@reduxjs/toolkit";
import ticTacToeReducer from "./tic_tac_toe_slice";

export const store = configureStore({
  reducer: {
    ticTacToe: ticTacToeReducer,
  },
});

export type TicTacToeRootState = ReturnType<typeof store.getState>;
export type TicTacToeStore = typeof store;
