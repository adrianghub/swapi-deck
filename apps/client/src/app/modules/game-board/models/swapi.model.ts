import { CardsType } from '../../../shared/models/game.model';
import { SwapiPersonDto, SwapiStarshipDto } from './swapi.dto';

export type SwapiParamsType =
  | { param: 'url'; url: string }
  | { param: 'type'; type: CardsType };

export interface SwapiStarship extends SwapiStarshipDto {
  selectedBy: string;
}

export interface SwapiPerson extends SwapiPersonDto {
  selectedBy: string;
}
