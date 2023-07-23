import { Component, inject } from '@angular/core';
import { GameWizardFacade } from './../store/game-wizard.facade';

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
          (gameWizardFacade.players$ | async)?.playerOne?.score! > 0 ||
          (gameWizardFacade.players$ | async)?.playerTwo?.score! > 0
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
          !(gameWizardFacade.players$ | async)?.playerOne?.name &&
          !(gameWizardFacade.players$ | async)?.playerTwo?.name
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
  protected gameWizardFacade = inject(GameWizardFacade);
}
