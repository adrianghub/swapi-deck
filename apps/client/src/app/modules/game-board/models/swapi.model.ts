import { CardsType } from '../../../shared/models/game.model';
import { SwapiMetaDto, SwapiPersonDto, SwapiStarshipDto } from './swapi.dto';

export interface SwapiParams {
  type: CardsType | null;
  url?: string;
}

export interface SwapiStarship extends SwapiStarshipDto {
  selectedBy: string;
}

export interface SwapiPerson extends SwapiPersonDto {
  selectedBy: string;
}

export type SwapiMeta = SwapiMetaDto;
