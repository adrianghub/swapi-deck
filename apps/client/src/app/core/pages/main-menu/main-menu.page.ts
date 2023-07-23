import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { GameWizardFacade } from '../../../modules/game-wizard/store/game-wizard.facade';
import { links } from '../../../shared/constants/game.constants';

@Component({
  selector: 'sdeck-main-menu',
  template: `
    <sdeck-layout-header [center]="true" />

    <div class="main-menu-container">
      <div class="main-menu">
        <p class="regular-title-medium slogan">
          {{ 'misc.mainMenu.slogan' | translate }}
        </p>

        <sdeck-button
          *ngIf="
            (gameWizardFacade.players$ | async) &&
            (gameWizardFacade.cardsType$ | async)
          "
          [label]="'misc.mainMenu.actions.continue' | translate"
          (clicked)="router.navigateByUrl('game-board')"
        />

        <sdeck-button
          [label]="'misc.mainMenu.actions.newGame' | translate"
          (clicked)="startNewGame()"
          data-cy="new-game-button"
        />
      </div>
    </div>
  `,
  styleUrls: ['./main-menu.page.scss'],
})
export class MainMenuPage {
  protected router = inject(Router);
  protected gameWizardFacade = inject(GameWizardFacade);

  startNewGame() {
    this.gameWizardFacade.resetWizardState();

    this.router.navigateByUrl(links.wizard.names);
  }
}
