import { Injectable } from '@angular/core';
import { State } from '@ngxs/store';
import {
  SwapiPersonDto,
  SwapiStarshipDto,
} from '../modules/game-board/models/swapi.dto';
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

interface PlayerState {
  name: string;
  score: number;
}

export interface PlayersState {
  playerOne: PlayerState;
  playerTwo: PlayerState;
}

export interface GameModel {
  peopleCardsData?: {
    [key: number]: {
      pagination: {
        next: string | null;
        previous: string | null;
      };
      cards: SwapiPersonDto[];
    };
    count: number | null;
  };
  starshipsCardsData?: {
    [key: number]: {
      pagination: {
        next: string | null;
        previous: string | null;
      };
      cards: SwapiStarshipDto[];
    };
  };
  page: number;
  count: number | null;
  loading: boolean;
  errorMessage?: string;
  selectedCards: Map<string, SwapiPerson | SwapiStarship>;
  nextTurn: PlayerPosition;
  players: PlayersState;
  cardsType: CardsType | null;
  winner: WinnerState | null;
}

export const initialState = {
  page: 1,
  count: null,
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
