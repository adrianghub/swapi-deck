export interface SwapiApiDto<T> {
  count: number;
  next: string;
  previous: string | null;
  results: T[];
}

export interface SwapiStarshipDto extends SwapiBaseDto {
  model: string;
  manufacturer: string;
  cost_in_credits: string;
  length: string;
  max_atmosphering_speed: string;
  crew: string;
  passengers: string;
  cargo_capacity: string;
  consumables: string;
  hyperdrive_rating: string;
  MGLT: string;
  starship_class: string;
  pilots: string[];
  films: string[];
  created: string;
  edited: string;
  url: string;
}

export interface SwapiPersonDto extends SwapiBaseDto {
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films: string[];
  species: string[];
  vehicles: string[];
  starships: string[];
}

export interface SwapiBaseDto {
  name: string;
  created: string;
  edited: string;
  url: string;
}

export interface SwapiMetaDto {
  next: string | null;
  previous: string | null;
  page?: number;
}
