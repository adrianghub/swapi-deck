import { Component, OnInit, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Subscribable } from '../../../core/subscribable.abstract';
import { CardsType } from '../../../shared/models/game.model';
import { SwapiPersonDto, SwapiStarshipDto } from '../models/swapi.dto';
import { GameBoardFacade } from '../store/game-board.facade';
import { SwapiMeta } from '../store/game-board.store';

@Component({
  selector: 'sdeck-game-wizard-page',
  template: `
    <div class="wrapper">
      <!-- Cards Board Section -->
      <div class="main-content">
        <div class="cards-board">
          <h1 class="regular-headline-medium headline">
            {{ 'game.board.cards.type.' + type | translate }}
            <span *ngIf="meta.count">({{ meta.count }})</span>
          </h1>

          <sdeck-cards
            [cards$]="gameCards$"
            [loading$]="gameBoardFacade.loading$"
            [type]="type"
            class="cards"
          />
        </div>

        <div class="cards-pagination">
          <sdeck-button
            [label]="'previous' | translate"
            [disabled]="(gameBoardFacade.loading$ | async) || !meta.previous"
            (click)="navigateToPage(meta.previous)"
            prefixIcon="arrow-left"
          />
          <sdeck-button
            [label]="'next' | translate"
            [disabled]="(gameBoardFacade.loading$ | async) || !meta.next"
            (click)="navigateToPage(meta.next)"
            suffixIcon="arrow-right"
          />
        </div>
      </div>

      <!-- Cards Aside Section -->
      <div class="aside">preview</div>
    </div>
  `,
  styleUrls: ['./game-board.page.scss'],
})
export class GameBoardPage extends Subscribable implements OnInit {
  protected gameBoardFacade = inject(GameBoardFacade);
  protected meta!: SwapiMeta;

  type: CardsType = 'people';

  gameCards$: Observable<SwapiStarshipDto[] | SwapiPersonDto[]> =
    this.type === 'people'
      ? this.gameBoardFacade.peopleCards$
      : this.gameBoardFacade.starshipsCards$;

  ngOnInit(): void {
    this.gameBoardFacade.loadCards({ param: 'type', type: this.type });

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

    this.gameBoardFacade.loadCards({ param: 'url', url: next });
  }
}
