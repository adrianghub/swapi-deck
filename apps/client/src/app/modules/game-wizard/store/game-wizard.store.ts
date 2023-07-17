import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { CardsType } from '../../../shared/models/game.model';

export interface PlayersPayload {
  playerOne: string;
  playerTwo: string;
}

export class UpdatePlayersNames {
  static readonly type = '[Game Wizard] Update Players Names';

  constructor(public payload: PlayersPayload) {}
}

export class UpdateCardsType {
  static readonly type = '[Game Wizard] Update Cards Type';

  constructor(public payload: CardsType) {}
}

export interface GameWizardModel {
  players?: PlayersPayload;
  cardsType?: CardsType;
}

@State<GameWizardModel>({
  name: 'gameWizard',
  defaults: {},
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

  @Action(UpdatePlayersNames)
  updatePlayersNames(
    ctx: StateContext<GameWizardModel>,
    action: UpdatePlayersNames
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
