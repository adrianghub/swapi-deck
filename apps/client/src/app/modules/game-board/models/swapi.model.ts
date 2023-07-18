import { CardsType } from '../../../shared/models/game.model';

export type SwapiParamsType =
  | { param: 'url'; url: string }
  | { param: 'type'; type: CardsType };
