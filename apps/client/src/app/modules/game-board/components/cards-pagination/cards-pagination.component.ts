import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SwapiMeta } from 'apps/client/src/app/shared/models/game.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'sdeck-cards-pagination',
  template: `
    <ng-container *ngIf="meta$ | async as meta">
      <sdeck-button
        [label]="'previous page' | translate"
        [disabled]="(loading$ | async) || !meta?.previous"
        (clicked)="navigateToPage(meta?.previous)"
        prefixIcon="arrow-left"
      />

      <p class="regular-body-large" *ngIf="meta?.page">
        {{ meta!.page }} of {{ pagesTotal }}
      </p>

      <sdeck-button
        [label]="'next page' | translate"
        [disabled]="(loading$ | async) || !meta?.next"
        (clicked)="navigateToPage(meta?.next)"
        suffixIcon="arrow-right"
      />
    </ng-container>
  `,
  styleUrls: ['./cards-pagination.component.scss'],
})
export class CardsPaginationComponent {
  @Input() meta$!: Observable<SwapiMeta | undefined>;
  @Input() pagesTotal: number | undefined;
  @Input() loading$!: Observable<boolean>;

  @Output() pageChanged = new EventEmitter<string>();

  protected navigateToPage(page: string | null | undefined) {
    if (!page) {
      return;
    }

    this.pageChanged.emit(page);
  }
}
