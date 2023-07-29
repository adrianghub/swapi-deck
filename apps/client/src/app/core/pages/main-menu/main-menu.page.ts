import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { links } from '../../../shared/constants/game.constants';
import { GameFacade } from '../../../store/game.facade';

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
            (gameFacade.players$ | async) && (gameFacade.cardsType$ | async)
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
  protected gameFacade = inject(GameFacade);

  startNewGame() {
    this.gameFacade.resetGameState();

    this.router.navigateByUrl(links.wizard.names);
  }
}
