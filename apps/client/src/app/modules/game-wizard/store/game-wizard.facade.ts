import { Injectable, inject } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { CardsType } from '../../../shared/models/game.model';
import {
  GameWizardState,
  PlayersPayload,
  UpdateCardsType,
  UpdatePlayersNames,
} from './game-wizard.store';

@Injectable()
export class GameWizardFacade {
  private store = inject(Store);

  @Select(GameWizardState.players) players$!: Observable<PlayersPayload>;
  @Select(GameWizardState.cardsType) cardsType$!: Observable<CardsType>;

  updatePlayersNames(payload: PlayersPayload): void {
    this.store.dispatch(new UpdatePlayersNames(payload));
  }

  updateCardsType(payload: CardsType): void {
    this.store.dispatch(new UpdateCardsType(payload));
  }

  resetGameState(): void {
    this.store.reset({});
  }
}
