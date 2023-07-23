import {
  CardsType,
  PlayerPosition,
  WinnerState,
} from '../../../shared/models/game.model';
import { PlayersState } from './game-wizard.store';

export class UpdatePlayers {
  static readonly type = '[Game Wizard] Update Players';

  constructor(public players: PlayersState) {}
}

export class UpdateCardsType {
  static readonly type = '[Game Wizard] Update Cards Type';

  constructor(public cardsType: CardsType) {}
}

export class UpdatePlayerScore {
  static readonly type = '[Game Wizard] Update Player Score';

  constructor(public playerPosition: PlayerPosition) {}
}

export class UpdateWinner {
  static readonly type = '[Game Board] Update Winner';

  constructor(public winner: WinnerState | null) {}
}
