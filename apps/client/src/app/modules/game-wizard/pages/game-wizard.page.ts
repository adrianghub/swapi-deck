import { Component, inject } from '@angular/core';
import { GameWizardFacade } from './../store/game-wizard.facade';

@Component({
  selector: 'sdeck-game-wizard-page',
  template: `
    <sdeck-layout-header />

    <nav mat-tab-nav-bar [tabPanel]="tabPanel">
      <a mat-tab-link routerLink="names" routerLinkActive>
        {{ 'game.wizard.tab.usernames' | translate }}
      </a>

      <a
        mat-tab-link
        routerLink="cards-type"
        routerLinkActive
        [disabled]="
          !(gameWizardFacade.players$ | async)?.playerOne &&
          !(gameWizardFacade.players$ | async)?.playerTwo
        "
      >
        {{ 'game.wizard.tab.cardsType' | translate }}
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
