import { Component } from '@angular/core';

@Component({
  selector: 'sdeck-root',
  template: `<h1 class="semi-bold-headline-medium">
      {{ 'misc.appName' | translate }}
    </h1>
    <router-outlet />`,
})
export class AppComponent {}
