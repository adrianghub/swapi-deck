import { Injectable, inject } from '@angular/core';
import { Action, StateContext } from '@ngxs/store';
import { catchError, tap } from 'rxjs';
import {
  LoadCards,
  ResetGameBoardState,
  ResetGameState,
  UpdateCardsType,
  UpdateMeta,
  UpdateNextTurn,
  UpdatePlayerName,
  UpdatePlayerScore,
  UpdateSelectedCards,
  UpdateWinner,
} from './game.actions';
import { GameRepository } from './game.repository';
import { GameModel, initialState } from './game.store';
import { updateShowMeta } from './game.utils';

@Injectable()
export class GameEffects {
  private gameRepository = inject(GameRepository);

  @Action(LoadCards)
  loadCards(ctx: StateContext<GameModel>, { type, url }: LoadCards) {
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

    return this.gameRepository.getSwapiData({ type, url }).pipe(
      tap((res) => {
        const cardData = {
          cards: res.results,
          pagination: {
            next: res.next,
            previous: res.previous,
          },
          showMeta: true,
        };

        ctx.patchState({
          ...ctx.getState(),
          [cardsKey]: {
            ...ctx.getState()[cardsKey],
            [page]: cardData,
            count: res.count,
          },
          page,
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
    ctx: StateContext<GameModel>,
    { card, playerName }: UpdateSelectedCards
  ) {
    ctx.patchState({
      selectedCards: new Map(ctx.getState().selectedCards).set(card.url, {
        ...card,
        selectedBy: playerName,
      }),
    });
  }

  @Action(UpdateMeta)
  updateMeta(ctx: StateContext<GameModel>, { type }: UpdateMeta) {
    updateShowMeta(ctx, type);
  }

  @Action(UpdateNextTurn)
  updatePlayerTurn(ctx: StateContext<GameModel>, { nextTurn }: UpdateNextTurn) {
    ctx.patchState({
      nextTurn,
    });
  }

  @Action(ResetGameBoardState)
  resetGameBoardState(ctx: StateContext<GameModel>) {
    ctx.setState({
      ...initialState,
      players: ctx.getState().players,
      cardsType: ctx.getState().cardsType,
      peopleCardsData: ctx.getState().peopleCardsData,
      starshipsCardsData: ctx.getState().starshipsCardsData,
    });
  }

  @Action(ResetGameState)
  resetGameState(ctx: StateContext<GameModel>) {
    ctx.setState(initialState);
  }

  @Action(UpdatePlayerName)
  updatePlayerName(
    ctx: StateContext<GameModel>,
    { playerPosition, name }: UpdatePlayerName
  ) {
    ctx.patchState({
      players: {
        ...ctx.getState()?.players,
        [playerPosition]: {
          ...ctx.getState()?.players[playerPosition],
          name,
        },
      },
    });
  }

  @Action(UpdateCardsType)
  updateCardsType(
    ctx: StateContext<GameModel>,
    { cardsType }: UpdateCardsType
  ) {
    ctx.patchState({
      cardsType,
    });
  }

  @Action(UpdatePlayerScore)
  updatePlayerScore(
    ctx: StateContext<GameModel>,
    { playerPosition }: UpdatePlayerScore
  ) {
    const playerKey =
      playerPosition === 'playerOne' ? 'playerOne' : 'playerTwo';

    ctx.setState((state) => ({
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

  @Action(UpdateWinner)
  updateWinner(ctx: StateContext<GameModel>, { winner }: UpdateWinner) {
    ctx.patchState({
      winner,
    });
  }
}
