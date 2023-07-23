import { Component, Input, inject } from '@angular/core';
import {
  getSwapiPerson,
  getSwapiStarship,
} from 'apps/client/src/app/shared/constants/game.constants';
import { DialogData } from 'apps/client/src/app/shared/ui/organisms/dialog/dialog.component';
import { GameWizardFacade } from '../../../game-wizard/store/game-wizard.facade';
import { SwapiPerson, SwapiStarship } from '../../models/swapi.model';
import { isSwapiPerson, isSwapiStarship } from '../../pages/game-board.utils';

@Component({
  selector: 'sdeck-game-result',
  template: `
    <div *ngIf="data.input$ | async as selectedCards" class="game-results">
      <p
        *ngIf="winner$ | async as winner; else draw"
        [innerHTML]="
          'gameBoard.dialog.result.winner'
            | translate
              : {
                  winnerName: winner.name
                }
            | highlight
        "
        class="regular-title-large header"
      ></p>

      <ng-template #draw>
        <p class="semi-bold-title-large header">
          {{ 'gameBoard.dialog.result.draw' | translate }}
        </p>
      </ng-template>

      <div class="card-container">
        <ng-container *ngFor="let card of $any(selectedCards)">
          <sdeck-game-card
            [card]="card"
            [customPlaceholderWidth]="
              card.selectedBy === (winner$ | async)?.name ? '330' : ''
            "
            [fitPlaceholderContent]="
              card.selectedBy !== (winner$ | async)?.name
            "
            [class.winning-card]="card.selectedBy === (winner$ | async)?.name"
            class="wide-box"
          >
            <div
              *ngIf="isSwapiPerson(card)"
              placeholder-content-person
              class="attributes"
            >
              <ng-container *ngTemplateOutlet="template" />
            </div>

            <div
              *ngIf="isSwapiStarship(card)"
              placeholder-content-starship
              class="attributes"
            >
              <ng-container *ngTemplateOutlet="template" />
            </div>

            <ng-template #template>
              <p
                *ngFor="let attr of $any(getCardAttributes(card)) | keyvalue"
                [class.key-attribute]="attr.key === winningAttr"
                [class.key-attribute--lose]="
                  attr.key === winningAttr &&
                  card.selectedBy !== (winner$ | async)?.name
                "
                [class.key-attribute--win]="
                  attr.key === winningAttr &&
                  card.selectedBy === (winner$ | async)?.name
                "
              >
                {{ attr.key }}: {{ attr.value }}
              </p>
            </ng-template>
          </sdeck-game-card>
        </ng-container>
      </div>
    </div>
  `,
  styleUrls: ['./game-result.dialog.scss'],
})
export class GameResultsDialog {
  @Input() data!: DialogData<SwapiPerson[] | SwapiStarship[], boolean>;
  winningAttr!: 'mass' | 'crew';

  protected gameWizardFacade = inject(GameWizardFacade);

  winner$ = this.gameWizardFacade.winner$;

  isSwapiPerson = isSwapiPerson;
  isSwapiStarship = isSwapiStarship;

  getCardAttributes(
    card: SwapiPerson | SwapiStarship
  ): SwapiPerson | SwapiStarship {
    if (isSwapiPerson(card)) {
      this.winningAttr = 'mass';
      return getSwapiPerson(card);
    }

    this.winningAttr = 'crew';
    return getSwapiStarship(card);
  }
}
