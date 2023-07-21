import { Component, Input, inject } from '@angular/core';
import { CardsType } from 'apps/client/src/app/shared/models/game.model';
import { DialogData } from 'apps/client/src/app/shared/ui/organisms/dialog/dialog.component';
import { GameWizardFacade } from '../../../game-wizard/store/game-wizard.facade';
import { SwapiPerson, SwapiStarship } from '../../models/swapi.model';

@Component({
  selector: 'sdeck-game-results',
  template: `
    <div *ngIf="data.input$ | async as result" class="game-results">
      <p
        class="regular-title-large header"
        *ngIf="gameWizardFacade.winner$ | async as winner; else draw"
      >
        The winner is
        <span class="highlight-text">{{ winner.name }}!</span>
      </p>

      <ng-template #draw>
        <p class="semi-bold-title-large header">It's a draw!</p>
      </ng-template>

      <div class="card-container">
        <ng-container *ngFor="let card of $any(result.selectedCards)">
          <sdeck-game-card
            [card]="card"
            [preview]="
              card.selectedBy === (gameWizardFacade.winner$ | async)?.name
            "
            [class.winning-card]="
              card.selectedBy === (gameWizardFacade.winner$ | async)?.name
            "
            class="wide-box"
          >
            <div
              placeholder-content
              *ngIf="result.type === 'people'"
              class="attributes"
            >
              <p
                [class.winning-attribute]="
                  card.selectedBy === (gameWizardFacade.winner$ | async)?.name
                "
              >
                mass: {{ card.mass }}
              </p>
            </div>

            <p placeholder-content *ngIf="result.type === 'starships'"></p>
            <p
              [class.winning-attribute]="
                card.selectedBy === (gameWizardFacade.winner$ | async)?.name
              "
            >
              crew: {{ card.crew }}
            </p>
          </sdeck-game-card>
        </ng-container>
      </div>
    </div>
  `,
  styleUrls: ['./game-results.dialog.scss'],
})
export class GameResultsDialog {
  @Input() data!: DialogData<
    {
      selectedCards: SwapiPerson[] | SwapiStarship[];
      winnerName: string;
      type: CardsType;
    },
    boolean
  >;

  protected gameWizardFacade = inject(GameWizardFacade);
}
