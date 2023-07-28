import { Injectable, inject } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { catchError, tap } from 'rxjs';
import { PlayerPosition, WinnerState } from '../../../shared/models/game.model';
import { SwapiPersonDto, SwapiStarshipDto } from '../models/swapi.dto';
import { SwapiMeta, SwapiPerson, SwapiStarship } from '../models/swapi.model';
import {
  LoadCards,
  ResetGameBoardState,
  UpdateNextTurn,
  UpdateSelectedCards,
} from './game-board.actions';
import { GameBoardRepository } from './game-board.repository';

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
    const { type, url } = action.params;
    const page = url ? parseInt(url.split('page=')[1]) : 1;
    const cardsKey = type === 'people' ? 'peopleCards' : 'starshipsCards';
    const existingData = ctx.getState()[cardsKey];

    if (existingData && !url) {
      ctx.patchState({ loading: false });
      return;
    }

    ctx.patchState({ loading: true });

    return this.gameBoardRepository.getSwapiData({ type, url }).pipe(
      tap((res) => {
        ctx.patchState({
          meta: { ...res, page },
          loading: false,
          [cardsKey]: res.results,
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
    ctx.setState(initialState);
  }
}
