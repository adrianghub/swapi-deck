import { Injectable } from '@angular/core';
import { dispatch } from '@ngneat/effects';
import { select } from '@ngneat/elf';
import {
  SwapiPersonDto,
  SwapiStarshipDto,
} from '../modules/game-board/models/swapi.dto';
import {
  CardsType,
  PlayerPosition,
  WinnerState,
} from '../shared/models/game.model';
import {
  loadCardsLoading,
  updateMeta,
  updateSelectedCards,
} from './game.actions';
import { gameStore, initialState } from './game.store';
import {
  getPagesTotal,
  getSelectedCardData,
  getTotalCount,
} from './game.utils';

@Injectable()
export class GameFacade {
  loading$ = gameStore.pipe(select((state) => state.loading));
  errorMessage$ = gameStore.pipe(select((state) => state.errorMessage));
  players$ = gameStore.pipe(select((state) => state.players));
  cardsType$ = gameStore.pipe(select((state) => state.cardsType));
  winner$ = gameStore.pipe(select((state) => state.winner));
  peopleCards$ = gameStore.pipe(
    select((state) => {
      if (!state.peopleCardsData) {
        return [];
      }

      return state.peopleCardsData[state.page].cards;
    })
  );
  starshipsCards$ = gameStore.pipe(
    select((state) => {
      if (!state.starshipsCardsData) {
        return [];
      }

      return state.starshipsCardsData[state.page].cards;
    })
  );
  paginationData$ = gameStore.pipe(
    select((state) => {
      const cardData = getSelectedCardData(state);
      return cardData
        ? cardData[state.page]?.pagination
        : { next: null, previous: null };
    })
  );
  cardsTotal$ = gameStore.pipe(
    select((state) => {
      return getTotalCount(state);
    })
  );
  pagesTotal$ = gameStore.pipe(
    select((state) => {
      return getPagesTotal(state);
    })
  );
  currentPage$ = gameStore.pipe(select((state) => state.page));
  selectedCards$ = gameStore.pipe(select((state) => state.selectedCards));
  nextTurn$ = gameStore.pipe(select((state) => state.nextTurn));

  loadCards(type: CardsType | null, url?: string): void {
    const page = url ? +url.split('page=')[1] : gameStore.state.page ?? 1;
    const cardsKey =
      type === 'people' ? 'peopleCardsData' : 'starshipsCardsData';
    const existingData = gameStore.state[cardsKey];

    if (existingData && existingData[page]) {
      gameStore.update((state) => ({
        ...state,
        page,
      }));

      return;
    }

    dispatch(loadCardsLoading({ type, url, cardsKey, page }));
  }

  updateSelectedCards(
    card: SwapiPersonDto | SwapiStarshipDto,
    playerName: string
  ): void {
    dispatch(updateSelectedCards({ card, playerName }));
  }

  updateMeta(type: CardsType | null): void {
    dispatch(updateMeta({ type }));
  }

  updateNextTurn(nextTurn: PlayerPosition): void {
    gameStore.update((state) => {
      return {
        ...state,
        nextTurn,
      };
    });
  }

  resetGameBoardState(): void {
    gameStore.update((state) => {
      return {
        ...initialState,
        players: state.players,
        cardsType: state.cardsType,
        peopleCardsData: state.peopleCardsData,
        starshipsCardsData: state.starshipsCardsData,
      };
    });
  }

  resetGameState(): void {
    gameStore.reset();
  }

  updatePlayerName(playerPosition: PlayerPosition, name: string): void {
    gameStore.update((state) => {
      return {
        ...state,
        players: {
          ...state?.players,
          [playerPosition]: {
            ...state?.players[playerPosition],
            name,
          },
        },
      };
    });
  }

  updateCardsType(cardsType: CardsType): void {
    gameStore.update((state) => {
      return {
        ...state,
        cardsType,
      };
    });
  }

  updatePlayerScore(playerPosition: PlayerPosition): void {
    const playerKey =
      playerPosition === 'playerOne' ? 'playerOne' : 'playerTwo';

    gameStore.update((state) => ({
      ...state,
      players: {
        ...state.players,
        [playerKey]: {
          ...state.players[playerKey],
          score: state.players[playerKey].score + 1,
        },
      },
    }));
  }

  updateWinner(winner: WinnerState | null): void {
    gameStore.update((state) => {
      return {
        ...state,
        winner,
      };
    });
  }
}
