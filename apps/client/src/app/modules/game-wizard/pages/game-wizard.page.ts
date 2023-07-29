import { Component, inject } from '@angular/core';
import { GameFacade } from '../../../store/game.facade';

@Component({
  selector: 'sdeck-game-wizard-page',
  template: `
    <sdeck-layout-header [center]="true" />

    <nav mat-tab-nav-bar [tabPanel]="tabPanel">
      <a
        mat-tab-link
        routerLink="names"
        routerLinkActive
        [disabled]="
          (gameFacade.players$ | async)?.playerOne?.score! > 0 ||
          (gameFacade.players$ | async)?.playerTwo?.score! > 0
        "
        data-cy="game-names-tab-link"
      >
        {{ 'gameWizard.tab.usernames' | translate }}
      </a>

      <a
        mat-tab-link
        routerLink="cards-type"
        routerLinkActive
        [disabled]="
          !(gameFacade.players$ | async)?.playerOne?.name &&
          !(gameFacade.players$ | async)?.playerTwo?.name
        "
        data-cy="game-cards-type-tab-link"
      >
        {{ 'gameWizard.tab.cardsType' | translate }}
      </a>
    </nav>
    <mat-tab-nav-panel #tabPanel></mat-tab-nav-panel>

    <router-outlet />
  `,
  styleUrls: ['./game-wizard.page.scss'],
})
export class GameWizardPage {
  protected gameFacade = inject(GameFacade);
}
