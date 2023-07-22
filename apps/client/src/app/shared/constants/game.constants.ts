import {
  SwapiPerson,
  SwapiStarship,
} from '../../modules/game-board/models/swapi.model';
import { CardsType } from '../models/game.model';

export const cardsTypes = ['people', 'starships'] as CardsType[];

export const itemsPerPage = 10;

export const numberOfPlayers = 2;

export const links = {
  base: '/',
  wizard: {
    cardsType: '/wizard/cards-type',
    names: '/wizard/names',
  },
  board: {
    gameBoard: '/game-board',
  },
} as const;

export function getSwapiPerson(card: SwapiPerson): SwapiPerson {
  return {
    mass: card.mass,
    height: card.height,
    hair_color: card.hair_color,
    skin_color: card.skin_color,
    eye_color: card.eye_color,
    birth_year: card.birth_year,
    gender: card.gender,
  } as SwapiPerson;
}

export function getSwapiStarship(card: SwapiStarship): SwapiStarship {
  return {
    crew: card.crew,
    passengers: card.passengers,
    model: card.model,
    manufacturer: card.manufacturer,
    cost_in_credits: card.cost_in_credits,
    length: card.length,
    cargo_capacity: card.cargo_capacity,
  } as SwapiStarship;
}
