import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'sdeck-main-menu',
  template: `<h1 class="semi-bold-headline-large">
      {{ 'misc.appName' | translate }}
    </h1>
    <div class="main-menu">
      <sdeck-button
        type="primary"
        [label]="'misc.mainMenu.actions.newGame' | translate"
        (click)="router.navigateByUrl('wizard/names')"
      />
    </div>`,
  styleUrls: ['./main-menu.page.scss'],
})
export class MainMenuPage {
  protected router = inject(Router);
}
