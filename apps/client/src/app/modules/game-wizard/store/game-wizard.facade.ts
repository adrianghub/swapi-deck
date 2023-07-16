import { Injectable, inject } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import {
  GameWizardState,
  PlayersPayload,
  UpdatePlayersNames,
} from './game-wizard.store';

@Injectable()
export class GameWizardFacade {
  private store = inject(Store);

  @Select(GameWizardState.players) players$!: Observable<PlayersPayload>;

  updatePlayersNames(payload: PlayersPayload): void {
    this.store.dispatch(new UpdatePlayersNames(payload));
  }
}
