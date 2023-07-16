import { Component } from '@angular/core';

@Component({
  selector: 'sdeck-main-menu',
  template: `<h1 class="semi-bold-headline-large">
      {{ 'misc.appName' | translate }}
    </h1>
    <div class="main-menu">
      <p class="regular-title-large">
        {{ 'misc.mainMenu.newGame' | translate }}
      </p>
    </div>`,
  styleUrls: ['./main-menu.page.scss'],
})
export class MainMenuPage {}
