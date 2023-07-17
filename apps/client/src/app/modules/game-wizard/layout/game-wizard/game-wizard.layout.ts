import { Component, Input, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'sdeck-game-wizard-layout',
  template: `
    <div class="container">
      <h2 class="semi-bold-headline-medium headline">
        {{ headline }}
      </h2>

      <ng-content />
    </div>

    <div class="footer">
      <ng-content select="[actions]" />
    </div>
  `,
  styleUrls: ['./game-wizard.layout.scss'],
})
export class GameWizardLayout {
  @Input({ required: true }) headline!: string;

  protected router = inject(Router);
}
