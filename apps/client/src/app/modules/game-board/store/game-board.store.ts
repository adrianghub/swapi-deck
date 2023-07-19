import { Injectable, inject } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { catchError, tap } from 'rxjs';
import { SwapiPersonDto, SwapiStarshipDto } from '../models/swapi.dto';
import { SwapiParamsType } from '../models/swapi.model';
import { GameBoardRepository } from './game-board.repository';

export interface SwapiMeta {
  count: number;
  next: string | null;
  previous: string | null;
  page?: number;
}

export class LoadPeopleCards {
  static readonly type = '[Game Board] Load People Cards';

  constructor(public params: SwapiParamsType) {}
}

export class LoadStarshipsCards {
  static readonly type = '[Game Board] Load Starships Cards';
}

export class UpdateSelectedCards {
  static readonly type = '[Game Board] Update Selected Cards';

  constructor(public card: SwapiPersonDto | SwapiStarshipDto) {}
}

export interface GameBoardModel {
  peopleCards?: SwapiPersonDto[];
  starshipsCards?: SwapiStarshipDto[];
  errorMessage?: string;
  meta: SwapiMeta;
  loading: boolean;
  selectedCards: Map<string, SwapiPersonDto | SwapiStarshipDto>;
}

@State<GameBoardModel>({
  name: 'gameBoard',
  defaults: {
    loading: false,
    meta: {
      next: null,
      previous: null,
      count: 0,
    },
    selectedCards: new Map(),
  },
})
@Injectable()
export class GameBoardState {
  private gameBoardRepository = inject(GameBoardRepository);

  @Selector([GameBoardState])
  static peopleCards(state: GameBoardModel) {
    return state.peopleCards;
  }

  @Selector([GameBoardState])
  static starshipsCards(state: GameBoardModel) {
    return state.starshipsCards;
  }

  @Selector([GameBoardState])
  static loading(state: GameBoardModel) {
    return state.loading;
  }

  @Selector([GameBoardState])
  static meta(state: GameBoardModel) {
    return state.meta;
  }

  @Selector([GameBoardState])
  static selectedCards(state: GameBoardModel) {
    return state.selectedCards;
  }

  @Action(LoadPeopleCards)
  loadPeopleCards(ctx: StateContext<GameBoardModel>, action: LoadPeopleCards) {
    ctx.patchState({
      loading: true,
    });

    let page = 1;

    if (action?.params?.param === 'url') {
      page = parseInt(action.params.url.split('page=')[1]);
    }

    return this.gameBoardRepository.getSwapiData(action.params).pipe(
      tap((res) => {
        ctx.patchState({
          peopleCards: res.results,
          meta: {
            ...res,
            page,
          },
          loading: false,
        });
      }),
      catchError((error) => {
        console.error(error);

        ctx.patchState({
          loading: false,
          errorMessage: "Couldn't load cards",
        });

        return [];
      })
    );
  }

  @Action(UpdateSelectedCards)
  updateSelectedCards(
    ctx: StateContext<GameBoardModel>,
    action: UpdateSelectedCards
  ) {
    const currentlySelectedCards = ctx.getState().selectedCards;

    if (currentlySelectedCards.has(action.card.url)) {
      currentlySelectedCards.delete(action.card.url);

      ctx.patchState({
        selectedCards: currentlySelectedCards,
      });
    } else {
      ctx.patchState({
        selectedCards: new Map(ctx.getState().selectedCards).set(
          action.card.url,
          action.card
        ),
      });
    }
  }
}
