import { Component, Input } from '@angular/core';
import { PlayerPosition } from 'apps/client/src/app/shared/models/game.model';
import { PlayersState } from '../../../game-wizard/store/game-wizard.store';
import { SwapiPerson, SwapiStarship } from '../../models/swapi.model';
import { WinnerState } from '../../store/game-board.store';

@Component({
  selector: 'sdeck-cards-aside',
  template: `<div>
    <p>
      current turn:
      {{
        nextTurn === 'playerOne'
          ? players?.playerTwo?.name
          : players?.playerOne?.name
      }}
    </p>

    <div class="selected-card-wrapper">
      <ng-container *ngIf="selectedCard; else noCardSelected">
        <h3 class="regular-headline-small selected-card-header">
          {{ 'game.board.aside.selectedBy' | translate }}
          <span class="highlight-text">{{ selectedCard.selectedBy }}</span>
        </h3>

        <sdeck-game-card
          class="selected-card wide-box"
          [card]="selectedCard"
          customPlaceholderWidth="400"
        />
      </ng-container>

      <ng-template #noCardSelected>
        <h3 class="semi-bold-headline-small selected-card-header">
          {{ 'game.board.aside.noCardSelected' | translate }}
        </h3>
      </ng-template>
    </div>
  </div> `,
  styleUrls: ['./cards-aside.section.scss'],
})
export class CardsAsideSection {
  @Input() nextTurn!: PlayerPosition;
  @Input() players!: PlayersState | undefined;
  @Input() winner!: WinnerState;
  @Input() selectedCard!: SwapiPerson | SwapiStarship | undefined;
}
