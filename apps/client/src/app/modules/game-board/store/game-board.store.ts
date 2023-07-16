import { Injectable, inject } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { catchError, tap } from 'rxjs';
import { SwapiPersonDto, SwapiStarshipDto } from '../models/swapi.dto';
import { GameBoardRepository } from './game-board.repository';

export interface SwapiMeta {
  count?: number;
  next: string | null;
  previous: string | null;
  page?: number;
}

export class LoadPeopleCards {
  static readonly type = '[Game Board] Load People Cards';

  constructor(public url?: string) {}
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

    const page = action?.url?.split('page=')[1];

    return this.gameBoardRepository.getSwapiPeople(action?.url).pipe(
      tap((res) => {
        ctx.patchState({
          peopleCards: res.results,
          meta: {
            ...res,
            page: page ? parseInt(page) : 1,
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
