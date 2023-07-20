import { SwapiPersonDto, SwapiStarshipDto } from './swapi.dto';

export interface SwapiParamsType {
  type: string;
  url?: string;
}

export interface SwapiStarship extends SwapiStarshipDto {
  selectedBy: string;
}

export interface SwapiPerson extends SwapiPersonDto {
  selectedBy: string;
}
