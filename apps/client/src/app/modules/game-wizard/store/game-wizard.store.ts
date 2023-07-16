import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';

export interface PlayersPayload {
  playerOne: string;
  playerTwo: string;
}

export class UpdatePlayersNames {
  static readonly type = '[Game Wizard] Update Players Names';

  constructor(public payload: PlayersPayload) {}
}

export interface GameWizardModel {
  players?: PlayersPayload;
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

  @Action(UpdatePlayersNames)
  updatePlayersNames(
    ctx: StateContext<GameWizardModel>,
    action: UpdatePlayersNames
  ) {
    ctx.patchState({
      players: action.payload,
    });
  }
}
