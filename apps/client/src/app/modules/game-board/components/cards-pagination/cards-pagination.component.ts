import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { SwapiMeta } from '../../store/game-board.store';

@Component({
  selector: 'sdeck-cards-pagination',
  template: `
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
  `,
  styleUrls: ['./cards-pagination.component.scss'],
})
export class CardsPaginationComponent {
  @Input() meta: SwapiMeta | undefined;
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
