import { Injectable } from '@angular/core';
import { State } from '@ngxs/store';
import {
  SwapiPerson,
  SwapiStarship,
} from '../modules/game-board/models/swapi.model';
import {
  CardsType,
  PlayerPosition,
  WinnerState,
} from '../shared/models/game.model';
import { GameEffects } from './game.effects';

interface CardPagination {
  next: string | null;
  previous: string | null;
}

export interface CardData<T> {
  [key: number]: {
    cards: T[];
    pagination: CardPagination;
  };
  count?: number | null;
  showMeta: boolean;
}

interface PlayerState {
  name: string;
  score: number;
}

export interface PlayersState {
  playerOne: PlayerState;
  playerTwo: PlayerState;
}

export interface GameModel {
  peopleCardsData?: CardData<SwapiPerson>;
  starshipsCardsData?: CardData<SwapiStarship>;
  page: number;
  loading: boolean;
  errorMessage?: string;
  selectedCards: Map<string, SwapiPerson | SwapiStarship>;
  nextTurn: PlayerPosition;
  players: PlayersState;
  cardsType: CardsType | null;
  winner: WinnerState | null;
}

export const initialState: GameModel = {
  page: 1,
  loading: false,
  selectedCards: new Map(),
  nextTurn: 'playerTwo' as PlayerPosition,
  players: {
    playerOne: {
      name: '',
      score: 0,
    },
    playerTwo: {
      name: '',
      score: 0,
    },
  },
  cardsType: null,
  winner: null,
};

@State<GameModel>({
  name: 'game',
  defaults: initialState,
})
@Injectable()
export class GameState extends GameEffects {}
