import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Game, GameState, Player } from "../../../domain";
import { TicTacToeViewModel } from "../view_model";
import { TicTacToeRootState } from "./store";

const initialGameState = {
  0: undefined,
  1: undefined,
  2: undefined,
  3: undefined,
  4: undefined,
  5: undefined,
  6: undefined,
  7: undefined,
  8: undefined,
};

export const initialState: TicTacToeViewModel = {
  gameState: initialGameState,
  nextPlayer: Player.X,
  status: `Next player is: ${Player.X}`,
};

interface PlayMovementActionPayload {
  game: GameState;
}

export const ticTacToeSlice = createSlice<
  TicTacToeViewModel,
  {
    gameStateChanged: (
      state: TicTacToeViewModel,
      action: PayloadAction<PlayMovementActionPayload>
    ) => void;
  },
  string
>({
  name: "tic_tac_toe",
  initialState,
  reducers: {
    gameStateChanged: (
      state,
      action: PayloadAction<PlayMovementActionPayload>
    ) => {
      const game = new Game(action.payload.game);

      const { winner, isFinished, nextMovement } = game;

      const status = winner
        ? `The winner is: ${winner}`
        : isFinished
        ? "No one won :("
        : `Next player is: ${nextMovement}`;

      state.status = status;
      state.gameState = game.state;
      state.nextPlayer = nextMovement;
    },
  },
});

export const selectTicTacToe = (state: TicTacToeRootState) => state.ticTacToe;

export const { gameStateChanged } = ticTacToeSlice.actions;

export default ticTacToeSlice.reducer;
