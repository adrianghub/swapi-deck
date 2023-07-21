import { Injectable, inject } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { catchError, of, tap } from 'rxjs';
import { PlayerPosition } from '../../../shared/models/game.model';
import { SwapiPersonDto, SwapiStarshipDto } from '../models/swapi.dto';
import {
  SwapiParamsType,
  SwapiPerson,
  SwapiStarship,
} from '../models/swapi.model';
import { GameBoardRepository } from './game-board.repository';

export interface SwapiMeta {
  count: number;
  next: string | null;
  previous: string | null;
  page?: number;
}

export interface WinnerState {
  name: string;
  position: PlayerPosition;
}

export class LoadCards {
  static readonly type = '[Game Board] Load People Cards';

  constructor(public params: SwapiParamsType) {}
}

export class LoadStarshipsCards {
  static readonly type = '[Game Board] Load Starships Cards';
}

export class UpdateSelectedCards {
  static readonly type = '[Game Board] Update Selected Cards';

  constructor(
    public card: SwapiPersonDto | SwapiStarshipDto,
    public playerName: string
  ) {}
}

export class UpdateNextTurn {
  static readonly type = '[Game Board] Update Next Turn';

  constructor(public nextTurn: PlayerPosition) {}
}

export class ResetGameBoardState {
  static readonly type = '[Game Board] Reset';
}

export interface GameBoardModel {
  peopleCards?: SwapiPersonDto[];
  starshipsCards?: SwapiStarshipDto[];
  errorMessage?: string;
  meta: SwapiMeta;
  loading: boolean;
  selectedCards: Map<string, SwapiPerson | SwapiStarship>;
  nextTurn: PlayerPosition;
  winner?: WinnerState;
}

export const initialState = {
  loading: false,
  meta: {
    next: null,
    previous: null,
    count: 0,
  },
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
  static errorMessage(state: GameBoardModel) {
    return state.errorMessage;
  }

  @Selector([GameBoardState])
  static meta(state: GameBoardModel) {
    return state.meta;
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
    ctx.patchState({ loading: true });

    const { url, type } = action.params;
    const page = url ? parseInt(url.split('page=')[1]) : 1;

    return this.gameBoardRepository.getSwapiData(action.params).pipe(
      tap((res) => {
        const newState: Partial<GameBoardModel> = {
          meta: { ...res, page },
          loading: false,
        };

        if (type === 'people') {
          newState.peopleCards = res.results as SwapiPersonDto[];
        } else if (type === 'starships') {
          newState.starshipsCards = res.results as SwapiStarshipDto[];
        }

        ctx.patchState(newState);
      }),
      catchError((error) => {
        console.error(error);
        ctx.patchState({
          loading: false,
          errorMessage: 'LOAD_CARDS_ERROR',
        });
        return of([]);
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
    ctx.setState(initialState);
  }
}
