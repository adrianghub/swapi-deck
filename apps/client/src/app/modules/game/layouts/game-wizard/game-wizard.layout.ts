import { Component } from '@angular/core';

@Component({
  selector: 'sdeck-game-wizard-layout',
  template: `
    <sdeck-layout-header />

    <nav mat-tab-nav-bar [tabPanel]="tabPanel" [mat-stretch-tabs]="true">
      <a mat-tab-link routerLink="wizard" routerLinkActive>
        {{ 'game.wizard.tab.usernames' | translate }}
      </a>

      <a mat-tab-link routerLink="type" routerLinkActive>
        {{ 'game.wizard.tab.cardsType' | translate }}
      </a>
    </nav>
    <mat-tab-nav-panel #tabPanel></mat-tab-nav-panel>

    <div class="container">
      <router-outlet />
    </div>
  `,
  styleUrls: ['./game-wizard.layout.scss'],
})
export class GameWizardLayout {}
