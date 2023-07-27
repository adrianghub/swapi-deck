import {
  CardsType,
  PlayerPosition,
  WinnerState,
} from '../../../shared/models/game.model';

export class UpdatePlayerName {
  static readonly type = '[Game Wizard] Update Player Name';

  constructor(public playerPosition: PlayerPosition, public name: string) {}
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
