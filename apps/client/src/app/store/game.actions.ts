import { createAction } from '@ngneat/effects';
import {
  SwapiApiDto,
  SwapiPersonDto,
  SwapiStarshipDto,
} from '../modules/game-board/models/swapi.dto';
import { CardsType } from '../shared/models/game.model';
import { gameStore } from './game.store';
import { cardDataMap } from './game.utils';

export const loadCardsLoading = createAction(
  '[Game] Load Cards',
  ({
    type,
    url,
    cardsKey,
    page,
  }: {
    type: CardsType | null;
    url?: string;
    cardsKey: 'peopleCardsData' | 'starshipsCardsData';
    page: number;
  }) => {
    gameStore.update((state) => ({
      ...state,
      loading: true,
    }));

    return {
      cardsKey,
      cardsType: type,
      url,
      page,
    };
  }
);

export const loadCardsSuccess = createAction(
  '[Game] Load Cards Success',
  ({
    res,
    page,
    cardsKey,
  }: {
    res: SwapiApiDto<SwapiPersonDto | SwapiStarshipDto>;
    page: number;
    cardsKey: string;
  }) => {
    const cardData = {
      cards: res.results,
      pagination: {
        next: res.next,
        previous: res.previous,
      },
      showMeta: true,
    };

    gameStore.update((state) => ({
      ...state,
      [cardsKey]: {
        ...state[cardsKey as 'peopleCardsData' | 'starshipsCardsData'],
        [page]: cardData,
        count: res.count,
      },
      page,
      loading: false,
    }));

    return {};
  }
);

export const loadCardsError = createAction(
  '[Game] Load Cards Error',
  ({ cardsType }: { cardsType: CardsType | null }) => {
    gameStore.update((state) => ({
      ...state,
      loading: false,
      errorMessage: `LOAD_${cardsType?.toUpperCase()}_CARDS_ERROR`,
    }));

    return {};
  }
);

export const updateSelectedCards = createAction(
  '[Game] Update Selected Cards',
  ({
    card,
    playerName,
  }: {
    card: SwapiPersonDto | SwapiStarshipDto;
    playerName: string;
  }) => {
    gameStore.update((state) => {
      const selectedCards = new Map(state.selectedCards);
      selectedCards.set(card.url, {
        ...card,
        selectedBy: playerName,
      });

      return {
        ...state,
        selectedCards,
      };
    });

    return {};
  }
);

export const updateMeta = createAction(
  '[Game] Update Meta',
  ({ type }: { type: CardsType | null }) => {
    gameStore.update((state) => {
      const otherType = type === 'people' ? 'starships' : 'people';

      if (!type) {
        return state;
      }

      return {
        ...state,
        [cardDataMap[type]]: {
          ...state[cardDataMap[type]],
          showMeta: true,
        },
        [cardDataMap[otherType]]: {
          ...state[cardDataMap[otherType]],
          showMeta: false,
        },
      };
    });

    return {};
  }
);
