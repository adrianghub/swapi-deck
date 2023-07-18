import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { GameWizardFacade } from '../../../modules/game-wizard/store/game-wizard.facade';

@Component({
  selector: 'sdeck-main-menu',
  template: `<h1 class="semi-bold-headline-large">
      {{ 'misc.appName' | translate }}
    </h1>
    <div class="main-menu">
      <sdeck-button
        *ngIf="
          (gameWizardFacade.players$ | async) &&
          (gameWizardFacade.cardsType$ | async)
        "
        [label]="'misc.mainMenu.actions.continue' | translate"
        (click)="router.navigateByUrl('game-board')"
      />

      <sdeck-button
        [label]="'misc.mainMenu.actions.newGame' | translate"
        (click)="startNewGame()"
      />
    </div>`,
  styleUrls: ['./main-menu.page.scss'],
})
export class MainMenuPage {
  protected router = inject(Router);
  protected gameWizardFacade = inject(GameWizardFacade);

  startNewGame() {
    this.gameWizardFacade.resetGameState();

    this.router.navigateByUrl('wizard/names');
  }
}
