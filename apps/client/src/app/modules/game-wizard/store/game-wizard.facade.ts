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
  UpdatePlayerName,
  UpdatePlayerScore,
  UpdateWinner,
} from './game-wizard.actions';
import { GameWizardState, PlayersState } from './game-wizard.store';

@Injectable()
export class GameWizardFacade {
  private store = inject(Store);

  @Select(GameWizardState.players) players$!: Observable<PlayersState>;
  @Select(GameWizardState.cardsType) cardsType$!: Observable<CardsType>;
  @Select(GameWizardState.winner) winner$!: Observable<WinnerState>;

  updatePlayerName(playerPosition: PlayerPosition, name: string): void {
    this.store.dispatch(new UpdatePlayerName(playerPosition, name));
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
