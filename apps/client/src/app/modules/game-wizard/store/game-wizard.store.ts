import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { CardsType, PlayerPosition } from '../../../shared/models/game.model';
import {
  GameBoardModel,
  GameBoardState,
  WinnerState,
} from '../../game-board/store/game-board.store';

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

export class UpdateWinner {
  static readonly type = '[Game Board] Update Winner';

  constructor(public winner: WinnerState | null) {}
}

export interface GameWizardModel {
  players: PlayersState;
  cardsType: CardsType | null;
  winner: WinnerState | null;
}

@State<GameWizardModel>({
  name: 'gameWizard',
  defaults: {
    // TODO: remove before production (currently used for testing purposes)
    players: {
      playerOne: {
        name: '',
        score: 0,
      },
      playerTwo: {
        name: '',
        score: 0,
      },
    },
    cardsType: null,
    winner: null,
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

  @Selector([GameBoardState])
  static winner(state: GameBoardModel) {
    return state.winner;
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

  @Action(UpdateWinner)
  updateWinner(ctx: StateContext<GameBoardModel>, { winner }: UpdateWinner) {
    if (!winner) {
      ctx.patchState({
        winner: undefined,
      });
    } else {
      ctx.patchState({
        winner,
      });
    }
  }
}
