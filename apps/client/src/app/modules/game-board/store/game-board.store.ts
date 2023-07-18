import { Injectable, inject } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { catchError, tap } from 'rxjs';
import { SwapiPersonDto, SwapiStarshipDto } from '../models/swapi.dto';
import { SwapiParamsType } from '../models/swapi.model';
import { GameBoardRepository } from './game-board.repository';

export interface SwapiMeta {
  count?: number;
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

export interface GameBoardModel {
  peopleCards?: SwapiPersonDto[];
  starshipsCards?: SwapiStarshipDto[];
  errorMessage?: string;
  meta: SwapiMeta;
  loading: boolean;
}

@State<GameBoardModel>({
  name: 'gameBoard',
  defaults: {
    loading: false,
    meta: {
      next: null,
      previous: null,
    },
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
          errorMessage: "Couldn't load people cards",
        });

        return [];
      })
    );
  }
}
