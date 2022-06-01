import { Player } from ".";

export type ValidPosition = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export class Movement {
  constructor(readonly position: ValidPosition, readonly player: Player) {}
}
