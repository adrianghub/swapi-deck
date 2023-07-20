import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { CardsType } from '../../../shared/models/game.model';

export type PlayerPosition = 'playerOne' | 'playerTwo';

export interface PlayerState {
  name: string;
  score: number;
}
export interface PlayersState {
  playerOne: PlayerState;
  playerTwo: PlayerState;
}

export class UpdatePlayers {
  static readonly type = '[Game Wizard] Update Players';

  constructor(public players: PlayersState) {}
}

export class UpdateCardsType {
  static readonly type = '[Game Wizard] Update Cards Type';

  constructor(public cardsType: CardsType) {}
}

export class UpdatePlayerScore {
  static readonly type = '[Game Wizard] Update Player Score';

  constructor(public playerPosition: PlayerPosition) {}
}

export interface GameWizardModel {
  players: PlayersState;
  cardsType?: CardsType;
}

@State<GameWizardModel>({
  name: 'gameWizard',
  defaults: {
    players: {
      playerOne: {
        name: 'maciek',
        score: 0,
      },
      playerTwo: {
        name: 'adam',
        score: 0,
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
    { players }: UpdatePlayers
  ) {
    ctx.patchState({
      players,
    });
  }

  @Action(UpdateCardsType)
  updateCardsType(
    ctx: StateContext<GameWizardModel>,
    { cardsType }: UpdateCardsType
  ) {
    ctx.patchState({
      cardsType,
    });
  }

  @Action(UpdatePlayerScore)
  updatePlayerScore(
    ctx: StateContext<GameWizardModel>,
    { playerPosition }: UpdatePlayerScore
  ) {
    if (playerPosition === 'playerOne') {
      ctx.patchState({
        players: {
          ...ctx.getState().players,
          playerOne: {
            ...ctx.getState().players.playerOne,
            score: ++ctx.getState().players.playerOne.score,
          },
        },
      });
    } else {
      ctx.patchState({
        players: {
          ...ctx.getState().players,
          playerTwo: {
            ...ctx.getState().players.playerTwo,
            score: ++ctx.getState().players.playerTwo.score,
          },
        },
      });
    }
  }
}
