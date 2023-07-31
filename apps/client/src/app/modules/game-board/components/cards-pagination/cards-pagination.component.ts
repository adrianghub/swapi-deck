import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { Observable } from 'rxjs';
import { SwapiMeta } from '../../models/swapi.model';

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

      <p
        *ngIf="(currentPage$ | async) && (pagesTotal$ | async)"
        class="regular-body-large"
      >
        {{ currentPage$ | async }} of {{ pagesTotal$ | async }}
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardsPaginationComponent {
  @Input() meta$!: Observable<SwapiMeta | undefined>;
  @Input() pagesTotal$!: Observable<number | null>;
  @Input() currentPage$!: Observable<number | undefined>;
  @Input() loading$!: Observable<boolean | undefined>;
  @Input() error$!: Observable<string | undefined>;

  @Output() pageChanged = new EventEmitter<string>();

  protected navigateToPage(page: string | null | undefined) {
    if (!page) {
      return;
    }

    this.pageChanged.emit(page);
  }
}
