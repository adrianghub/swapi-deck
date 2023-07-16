import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'sdeck-game-names',
  template: `
    <sdeck-game-wizard-layout>
      <h2 class="semi-bold-headline-medium headline">
        What areaokawodkaodka adoawkoak oa oawkdwao?
      </h2>

      <ng-container actions>
        <sdeck-button
          type="primary"
          [label]="'game.wizard.actions.previousStep' | translate"
          (click)="router.navigateByUrl('wizard/names')"
          prefixIcon="arrow-left"
        />

        <sdeck-button
          type="primary"
          [label]="'game.wizard.actions.startGame' | translate"
          (click)="router.navigateByUrl('game-board')"
        />
      </ng-container>
    </sdeck-game-wizard-layout>
  `,
  styleUrls: ['./game-wizard-type.tab.scss'],
})
export class GameWizardCardsTypeTab {
  protected router = inject(Router);
}
