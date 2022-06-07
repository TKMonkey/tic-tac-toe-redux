import { GameState } from "../../../domain";
import { gameStateChanged, TicTacToeStore } from "../redux";
import { ITicTacToePresenter } from "./i_tic_tac_toe_presenter";

export class TicTacToePresenterRedux implements ITicTacToePresenter {
  constructor(private store: TicTacToeStore) {}

  changeGameState(gameState: GameState, history: Array<GameState>): void {
    this.store.dispatch(
      gameStateChanged({ gameState: { ...gameState }, history: [...history] })
    );
  }
}
