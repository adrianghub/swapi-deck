import { CardsType } from '../../../shared/models/game.model';
import { SwapiMetaDto, SwapiPersonDto, SwapiStarshipDto } from './swapi.dto';

export interface SwapiParamsType {
  type: CardsType;
  url?: string;
}

export interface SwapiStarship extends SwapiStarshipDto {
  selectedBy: string;
}

export interface SwapiPerson extends SwapiPersonDto {
  selectedBy: string;
}

export type SwapiMeta = SwapiMetaDto;
