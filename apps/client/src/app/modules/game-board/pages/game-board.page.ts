import { Component, OnInit, inject } from '@angular/core';
import { Subscribable } from '../../../core/subscribable.abstract';
import { GameBoardFacade } from '../store/game-board.facade';
import { SwapiMeta } from '../store/game-board.store';

@Component({
  selector: 'sdeck-game-board',
  template: `
    <ng-container *ngIf="gameBoardFacade.loading$ | async; else data">
      Loading...
    </ng-container>

    <ng-template #data>
      <ng-container *ngFor="let card of gameBoardFacade.peopleCards$ | async">
        <p>{{ card.name }}</p>
      </ng-container>
    </ng-template>

    <button
      mat-button
      [disabled]="(gameBoardFacade.loading$ | async) || !meta.previous"
      (click)="navigateToPage(meta.previous)"
    >
      previous
    </button>

    <button
      mat-button
      [disabled]="(gameBoardFacade.loading$ | async) || !meta.next"
      (click)="navigateToPage(meta.next)"
    >
      next
    </button>
  `,
  styleUrls: ['./game-board.page.scss'],
})
export class GameBoardPage extends Subscribable implements OnInit {
  public gameBoardFacade = inject(GameBoardFacade);
  public meta!: SwapiMeta;

  ngOnInit(): void {
    this.gameBoardFacade.loadPeopleCards();

    this.subs.push(
      this.gameBoardFacade.meta$.subscribe((meta) => {
        this.meta = meta;
      })
    );
  }

  navigateToPage(next: string | null) {
    if (!next) {
      return;
    }

    this.gameBoardFacade.loadPeopleCards(next);
  }
}
