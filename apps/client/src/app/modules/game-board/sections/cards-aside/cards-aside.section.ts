import { Component, Input } from '@angular/core';
import { PlayerPosition } from 'apps/client/src/app/shared/models/game.model';
import { PlayersState } from '../../../game-wizard/store/game-wizard.store';
import { SwapiPerson, SwapiStarship } from '../../models/swapi.model';

@Component({
  selector: 'sdeck-cards-aside',
  template: `
    <p class="regular-title-large">
      {{ 'gameBoard.aside.currentTurn' | translate }}
      <span class="highlight-text">{{
        nextTurn === 'playerOne'
          ? players?.playerTwo?.name
          : players?.playerOne?.name
      }}</span>
    </p>

    <p
      class="regular-title-medium instruction"
      [innerHTML]="'gameBoard.aside.instruction' | translate | highlight"
    ></p>

    <div class="selected-card-wrapper">
      <ng-container *ngIf="selectedCard; else noCardSelected">
        <h3 class="regular-headline-small selected-card-header">
          {{ 'gameBoard.aside.selectedBy' | translate }}
          <span class="highlight-text">{{ selectedCard.selectedBy }}</span>
        </h3>

        <sdeck-game-card
          class="selected-card wide-box"
          [card]="selectedCard"
          customPlaceholderWidth="250"
        />
      </ng-container>

      <ng-template #noCardSelected>
        <h3 class="semi-bold-headline-small selected-card-header">
          {{ 'gameBoard.aside.noCardSelected' | translate }}
        </h3>
      </ng-template>
    </div>
  `,
  styleUrls: ['./cards-aside.section.scss'],
})
export class CardsAsideSection {
  @Input() nextTurn!: PlayerPosition;
  @Input() players!: PlayersState | undefined;
  @Input() selectedCard!: SwapiPerson | SwapiStarship | undefined;
}
