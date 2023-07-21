import { links } from './../../../../shared/constants/game.constants';
import { Component, Input, inject } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'sdeck-layout-header',
  template: `<div class="header" [class.block]="center">
      <a (click)="router.navigateByUrl(links.base)" class="semi-bold-headline-large" >
        {{ 'misc.appName' | translate }}
      </a>

      <div class="actions">
        <ng-content select="[actions]" />
      </div>
    </div>
    <mat-divider></mat-divider>`,
  standalone: true,
  imports: [TranslateModule, MatDividerModule],
  styleUrls: ['./layout-header.component.scss'],
})
export class LayoutHeaderComponent {
  @Input() center = false;

  links = links;

  protected router = inject(Router);
}
