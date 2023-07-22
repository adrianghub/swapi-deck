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
  selector: 'sdeck-game-results',
  template: `
    <div *ngIf="data.input$ | async as result" class="game-results">
      <p
        class="regular-title-large header"
        *ngIf="winner$ | async as winner; else draw"
      >
        The winner is
        <span class="highlight-text">{{ winner?.name }}!</span>
      </p>

      <ng-template #draw>
        <p class="semi-bold-title-large header">It's a draw!</p>
      </ng-template>

      <div class="card-container">
        <ng-container *ngFor="let card of $any(result.selectedCards)">
          <sdeck-game-card
            [card]="card"
            [customPlaceholderWidth]="
              card.selectedBy === (winner$ | async)?.name ? '400' : ''
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
              <ng-container *ngTemplateOutlet="template">
                dwajdkdjaidjaijda
              </ng-container>
            </div>

            <div
              *ngIf="isSwapiStarship(card)"
              placeholder-content-starship
              class="attributes"
            >
              <ng-container *ngTemplateOutlet="template">
                wkdioadkadajdaikdjwaidjwaid
              </ng-container>
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
  @Input() data!: DialogData<
    {
      selectedCards: SwapiPerson[] | SwapiStarship[];
    },
    boolean
  >;
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