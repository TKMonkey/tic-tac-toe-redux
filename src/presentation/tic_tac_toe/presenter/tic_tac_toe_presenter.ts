import { GameState } from "../../../domain";
import { gameStateChanged, TicTacToeStore } from "../redux";
import { ITicTacToePresenter } from "./i_tic_tac_toe_presenter";

export class TicTacToePresenterRedux implements ITicTacToePresenter {
  constructor(private store: TicTacToeStore) {}

  changeGameState(gameState: GameState): void {
    this.store.dispatch(gameStateChanged({ game: { ...gameState } }));
  }
}
