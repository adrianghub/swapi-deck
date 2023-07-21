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
  }
} as const;
