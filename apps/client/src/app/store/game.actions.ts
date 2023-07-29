import {
  SwapiPersonDto,
  SwapiStarshipDto,
} from '../modules/game-board/models/swapi.dto';
import {
  CardsType,
  PlayerPosition,
  WinnerState,
} from '../shared/models/game.model';

export class LoadCards {
  static readonly type = '[Game] Load Cards';

  constructor(public type: CardsType, public url?: string) {}
}

export class UpdateSelectedCards {
  static readonly type = '[Game] Update Selected Cards';

  constructor(
    public card: SwapiPersonDto | SwapiStarshipDto,
    public playerName: string
  ) {}
}

export class UpdateNextTurn {
  static readonly type = '[Game] Update Next Turn';

  constructor(public nextTurn: PlayerPosition) {}
}

export class ResetGameState {
  static readonly type = '[Game] Reset';
}

export class ResetGameBoardState {
  static readonly type = '[Game Board] Reset';
}

export class UpdatePlayerName {
  static readonly type = '[Game] Update Player Name';

  constructor(public playerPosition: PlayerPosition, public name: string) {}
}

export class UpdateCardsType {
  static readonly type = '[Game] Update Cards Type';

  constructor(public cardsType: CardsType) {}
}

export class UpdatePlayerScore {
  static readonly type = '[Game] Update Player Score';

  constructor(public playerPosition: PlayerPosition) {}
}

export class UpdateWinner {
  static readonly type = '[Game] Update Winner';

  constructor(public winner: WinnerState | null) {}
}
