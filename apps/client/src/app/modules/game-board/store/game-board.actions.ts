import { PlayerPosition } from '../../../shared/models/game.model';
import { SwapiPersonDto, SwapiStarshipDto } from '../models/swapi.dto';
import { SwapiParamsType } from '../models/swapi.model';

export class LoadCards {
  static readonly type = '[Game Board] Load People Cards';

  constructor(public params: SwapiParamsType) {}
}

export class LoadStarshipsCards {
  static readonly type = '[Game Board] Load Starships Cards';
}

export class UpdateSelectedCards {
  static readonly type = '[Game Board] Update Selected Cards';

  constructor(
    public card: SwapiPersonDto | SwapiStarshipDto,
    public playerName: string
  ) {}
}

export class UpdateNextTurn {
  static readonly type = '[Game Board] Update Next Turn';

  constructor(public nextTurn: PlayerPosition) {}
}

export class ResetGameBoardState {
  static readonly type = '[Game Board] Reset';
}
