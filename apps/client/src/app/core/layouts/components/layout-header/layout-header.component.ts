import { Component, inject } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'sdeck-layout-header',
  template: `<div class="header">
      <a (click)="router.navigateByUrl('/')" class="semi-bold-headline-large ">
        {{ 'misc.appName' | translate }}
      </a>
    </div>
    <mat-divider></mat-divider>`,
  standalone: true,
  imports: [TranslateModule, MatDividerModule],
  styleUrls: ['./layout-header.component.scss'],
})
export class LayoutHeaderComponent {
  protected router = inject(Router);
}
