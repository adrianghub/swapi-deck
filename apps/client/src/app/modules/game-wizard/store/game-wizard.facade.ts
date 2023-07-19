import { Injectable, inject } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { CardsType } from '../../../shared/models/game.model';
import {
  GameWizardState,
  Players,
  UpdateCardsType,
  UpdatePlayers,
} from './game-wizard.store';

@Injectable()
export class GameWizardFacade {
  private store = inject(Store);

  @Select(GameWizardState.players) players$!: Observable<Players>;
  @Select(GameWizardState.cardsType) cardsType$!: Observable<CardsType>;

  updatePlayers(payload: Players): void {
    this.store.dispatch(new UpdatePlayers(payload));
  }

  updateCardsType(payload: CardsType): void {
    this.store.dispatch(new UpdateCardsType(payload));
  }

  resetGameState(): void {
    this.store.reset({});
  }
}
