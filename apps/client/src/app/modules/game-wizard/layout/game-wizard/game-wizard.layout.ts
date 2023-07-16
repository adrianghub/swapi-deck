import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'sdeck-game-wizard-layout',
  template: `
    <div class="container">
      <ng-content />
    </div>

    <div class="footer">
      <ng-content select="[actions]" />
    </div>
  `,
  styleUrls: ['./game-wizard.layout.scss'],
})
export class GameWizardLayout {
  protected router = inject(Router);
}
