import { Injectable, inject } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { CardsType } from '../../../shared/models/game.model';
import {
  GameWizardState,
  PlayerPosition,
  PlayersState,
  UpdateCardsType,
  UpdatePlayerScore,
  UpdatePlayers,
} from './game-wizard.store';

@Injectable()
export class GameWizardFacade {
  private store = inject(Store);

  @Select(GameWizardState.players) players$!: Observable<PlayersState>;
  @Select(GameWizardState.cardsType) cardsType$!: Observable<CardsType>;

  updatePlayers(players: PlayersState): void {
    this.store.dispatch(new UpdatePlayers(players));
  }

  updateCardsType(cardsType: CardsType): void {
    this.store.dispatch(new UpdateCardsType(cardsType));
  }

  updatePlayerScore(playerPosition: PlayerPosition): void {
    this.store.dispatch(new UpdatePlayerScore(playerPosition));
  }

  resetWizardState(): void {
    this.store.reset({});
  }
}
