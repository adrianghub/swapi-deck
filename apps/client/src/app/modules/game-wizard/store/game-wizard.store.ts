import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { CardsType } from '../../../shared/models/game.model';

interface PlayerState {
  name: string;
  score?: number;
}
export interface Players {
  playerOne: PlayerState;
  playerTwo: PlayerState;
}

export class UpdatePlayers {
  static readonly type = '[Game Wizard] Update Players';

  constructor(public payload: Players) {}
}

export class UpdateCardsType {
  static readonly type = '[Game Wizard] Update Cards Type';

  constructor(public payload: CardsType) {}
}

export interface GameWizardModel {
  players?: Players;
  cardsType?: CardsType;
}

@State<GameWizardModel>({
  name: 'gameWizard',
  defaults: {
    players: {
      playerOne: {
        name: 'maciek',
      },
      playerTwo: {
        name: 'adam',
      },
    },
  },
})
@Injectable()
export class GameWizardState {
  @Selector([GameWizardState])
  static players(state: GameWizardModel) {
    return state.players;
  }

  @Selector([GameWizardState])
  static cardsType(state: GameWizardModel) {
    return state.cardsType;
  }

  @Action(UpdatePlayers)
  updatePlayersNames(
    ctx: StateContext<GameWizardModel>,
    action: UpdatePlayers
  ) {
    ctx.patchState({
      players: action.payload,
    });
  }

  @Action(UpdateCardsType)
  updateCardsType(ctx: StateContext<GameWizardModel>, action: UpdateCardsType) {
    ctx.patchState({
      cardsType: action.payload,
    });
  }
}
