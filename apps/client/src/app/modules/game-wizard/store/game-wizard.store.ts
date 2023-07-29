import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { CardsType, WinnerState } from '../../../shared/models/game.model';
import {
  GameBoardModel,
  GameBoardState,
} from '../../game-board/store/game-board.store';
import {
  UpdateCardsType,
  UpdatePlayerName,
  UpdatePlayerScore,
  UpdateWinner,
} from './game-wizard.actions';

interface PlayerState {
  name: string;
  score: number;
}

export interface PlayersState {
  playerOne: PlayerState;
  playerTwo: PlayerState;
}

export interface GameWizardModel {
  players: PlayersState;
  cardsType: CardsType | null;
  winner: WinnerState | null;
}

@State<GameWizardModel>({
  name: 'gameWizard',
  defaults: {
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

  @Action(UpdatePlayerName)
  updatePlayerName(
    ctx: StateContext<GameWizardModel>,
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
