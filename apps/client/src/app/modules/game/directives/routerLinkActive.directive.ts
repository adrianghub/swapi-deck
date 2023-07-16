import { Directive } from '@angular/core';
import { MatTabLink } from '@angular/material/tabs';
import { RouterLinkActive } from '@angular/router';

// eslint-disable-next-line @angular-eslint/directive-selector
@Directive({ selector: 'a[routerLinkActive][mat-tab-link]' })
export class MatTabRouterLinkActiveDirective {
  constructor(routerLinkActive: RouterLinkActive, matTabLink: MatTabLink) {
    routerLinkActive.isActiveChange.subscribe(
      (value) => (matTabLink.active = value)
    );
  }
}
