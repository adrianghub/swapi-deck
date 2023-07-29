import { Injectable, inject } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { catchError, tap } from 'rxjs';
import { itemsPerPage } from '../../../shared/constants/game.constants';
import { PlayerPosition, WinnerState } from '../../../shared/models/game.model';
import { SwapiPersonDto, SwapiStarshipDto } from '../models/swapi.dto';
import { SwapiPerson, SwapiStarship } from '../models/swapi.model';
import {
  LoadCards,
  ResetGameBoardState,
  UpdateNextTurn,
  UpdateSelectedCards,
} from './game-board.actions';
import { GameBoardRepository } from './game-board.repository';

export interface GameBoardModel {
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
  winner?: WinnerState;
}

export const initialState = {
  page: 1,
  count: null,
  loading: false,
  selectedCards: new Map(),
  nextTurn: 'playerTwo' as PlayerPosition,
};

@State<GameBoardModel>({
  name: 'gameBoard',
  defaults: initialState,
})
@Injectable()
export class GameBoardState {
  private gameBoardRepository = inject(GameBoardRepository);

  @Selector([GameBoardState])
  static peopleCards(state: GameBoardModel) {
    if (!state.peopleCardsData) {
      return [];
    }

    return state.peopleCardsData[state.page].cards;
  }

  @Selector([GameBoardState])
  static starshipsCards(state: GameBoardModel) {
    if (!state.starshipsCardsData) {
      return [];
    }

    return state.starshipsCardsData[state.page].cards;
  }

  @Selector([GameBoardState])
  static paginationData(state: GameBoardModel) {
    if (state.peopleCardsData) {
      return state.peopleCardsData[state.page].pagination;
    }

    if (state.starshipsCardsData) {
      return state.starshipsCardsData[state.page].pagination;
    }

    return {
      next: null,
      previous: null,
    };
  }

  @Selector([GameBoardState])
  static loading(state: GameBoardModel) {
    return state.loading;
  }

  @Selector([GameBoardState])
  static errorMessage(state: GameBoardModel) {
    return state.errorMessage;
  }

  @Selector([GameBoardState])
  static pagesTotal(state: GameBoardModel) {
    if (!state.count) {
      return null;
    }

    return Math.ceil(state.count / itemsPerPage);
  }

  @Selector([GameBoardState])
  static cardsTotal(state: GameBoardModel) {
    return state.count;
  }

  @Selector([GameBoardState])
  static currentPage(state: GameBoardModel) {
    return state.page;
  }

  @Selector([GameBoardState])
  static selectedCards(state: GameBoardModel) {
    return state.selectedCards;
  }

  @Selector([GameBoardState])
  static nextTurn(state: GameBoardModel) {
    return state.nextTurn;
  }

  @Action(LoadCards)
  loadCards(ctx: StateContext<GameBoardModel>, action: LoadCards) {
    const { type, url } = action.params;
    const page = url ? +url.split('page=')[1] : ctx.getState().page ?? 1;
    const cardsKey =
      type === 'people' ? 'peopleCardsData' : 'starshipsCardsData';
    const existingData = ctx.getState()[cardsKey];

    if (existingData && existingData[page]) {
      ctx.patchState({
        ...ctx.getState(),
        page,
      });
      return;
    }

    ctx.patchState({ loading: true });

    return this.gameBoardRepository.getSwapiData({ type, url }).pipe(
      tap((res) => {
        ctx.patchState({
          ...ctx.getState(),
          [cardsKey]: {
            ...ctx.getState()[cardsKey],
            [page]: {
              pagination: {
                next: res.next,
                previous: res.previous,
              },
              cards: res.results,
            },
          },
          page,
          count: res.count,
          loading: false,
        });
      }),
      catchError((error) => {
        console.error(error);
        ctx.patchState({
          loading: false,
          errorMessage: `LOAD_${type.toUpperCase()}_CARDS_ERROR`,
        });
        return [];
      })
    );
  }

  @Action(UpdateSelectedCards)
  updateSelectedCards(
    ctx: StateContext<GameBoardModel>,
    { card, playerName }: UpdateSelectedCards
  ) {
    ctx.patchState({
      selectedCards: new Map(ctx.getState().selectedCards).set(card.url, {
        ...card,
        selectedBy: playerName,
      }),
    });
  }

  @Action(UpdateNextTurn)
  updatePlayerTurn(
    ctx: StateContext<GameBoardModel>,
    { nextTurn }: UpdateNextTurn
  ) {
    ctx.patchState({
      nextTurn,
    });
  }

  @Action(ResetGameBoardState)
  resetGameBoardState(ctx: StateContext<GameBoardModel>) {
    ctx.setState({
      ...initialState,
      // peopleCardsData: ctx.getState().peopleCardsData,
      // starshipsCardsData: ctx.getState().starshipsCardsData,
    });
  }
}
