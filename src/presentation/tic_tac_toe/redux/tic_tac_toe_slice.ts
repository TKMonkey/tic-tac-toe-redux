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
  history: [],
  nextPlayer: Player.X,
  status: `Next player is: ${Player.X}`,
};

interface PlayMovementActionPayload {
  gameState: GameState;
  history: Array<GameState>;
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
      const { gameState, history: actionHistory } = action.payload;
      const game = new Game(gameState, actionHistory);

      const { winner, isFinished, nextMovement, history } = game;

      const status = getStatus({ winner, nextMovement, isFinished });

      state.status = status;
      state.history = history;
      state.gameState = game.state;
      state.nextPlayer = nextMovement;
    },
  },
});

interface GetStatusParam {
  winner: Player | undefined;
  nextMovement: Player;
  isFinished: boolean;
}

function getStatus(data: GetStatusParam): string {
  const { winner, isFinished, nextMovement } = data;
  return winner
    ? `The winner is: ${winner}`
    : isFinished
    ? "No one won :("
    : `Next player is: ${nextMovement}`;
}

export const selectTicTacToe = (state: TicTacToeRootState) => state.ticTacToe;

export const { gameStateChanged } = ticTacToeSlice.actions;

export default ticTacToeSlice.reducer;
