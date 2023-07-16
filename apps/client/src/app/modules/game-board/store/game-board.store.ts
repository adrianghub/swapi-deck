import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';

interface SwapiCard {
  name: string;
}

export class LoadCards {
  static readonly type = '[Game Board] LoadCards';
}

export interface GameBoardModel {
  cards: SwapiCard[];
}

@State<GameBoardModel>({
  name: 'gameBoard',
  defaults: {
    cards: [],
  },
})
@Injectable()
export class GameBoardState {
  @Action(LoadCards)
  loadCards(ctx: StateContext<GameBoardModel>) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      cards: state.cards,
    });
  }
}
