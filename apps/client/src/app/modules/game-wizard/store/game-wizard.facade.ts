import { Injectable, inject } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import {
  CardsType,
  PlayerPosition,
  WinnerState,
} from '../../../shared/models/game.model';
import {
  UpdateCardsType,
  UpdatePlayerScore,
  UpdatePlayers,
  UpdateWinner,
} from './game-wizard.actions';
import { GameWizardState, PlayersState } from './game-wizard.store';

@Injectable()
export class GameWizardFacade {
  private store = inject(Store);

  @Select(GameWizardState.players) players$!: Observable<PlayersState>;
  @Select(GameWizardState.cardsType) cardsType$!: Observable<CardsType>;
  @Select(GameWizardState.winner) winner$!: Observable<WinnerState>;

  updatePlayers(players: PlayersState): void {
    this.store.dispatch(new UpdatePlayers(players));
  }

  updateCardsType(cardsType: CardsType): void {
    this.store.dispatch(new UpdateCardsType(cardsType));
  }

  updatePlayerScore(playerPosition: PlayerPosition): void {
    this.store.dispatch(new UpdatePlayerScore(playerPosition));
  }

  updateWinner(winner: WinnerState | null): void {
    this.store.dispatch(new UpdateWinner(winner));
  }

  resetWizardState(): void {
    this.store.reset({});
  }
}
