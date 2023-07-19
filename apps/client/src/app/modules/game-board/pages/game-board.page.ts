import {
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
  inject,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, distinctUntilChanged, switchMap, take } from 'rxjs';
import { Subscribable } from '../../../core/subscribable.abstract';
import {
  itemsPerPage,
  numberOfPlayers,
} from '../../../shared/constants/game.constants';
import { CardsType } from '../../../shared/models/game.model';
import { GameWizardFacade } from '../../game-wizard/store/game-wizard.facade';
import { Players } from '../../game-wizard/store/game-wizard.store';
import { SwapiPersonDto, SwapiStarshipDto } from '../models/swapi.dto';
import { GameBoardService } from '../services/game-board.service';
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
            <span *ngIf="meta?.count">({{ meta.count }})</span>
          </h1>

          <sdeck-cards
            [cards$]="gameCards$"
            [loading$]="gameBoardFacade.loading$"
            [type]="type"
            class="cards"
            (selected)="updateGameStatus($event)"
            [selectedCards$]="gameBoardFacade.selectedCards$"
          />
        </div>

        <div class="cards-pagination">
          <sdeck-button
            [label]="'previous page' | translate"
            [disabled]="(gameBoardFacade.loading$ | async) || !meta.previous"
            (click)="navigateToPage(meta.previous)"
            prefixIcon="arrow-left"
          />

          <p class="regular-body-large" *ngIf="meta?.page">
            {{ meta.page }} of {{ pagesTotal }}
          </p>

          <sdeck-button
            [label]="'next page' | translate"
            [disabled]="(gameBoardFacade.loading$ | async) || !meta.next"
            (click)="navigateToPage(meta.next)"
            suffixIcon="arrow-right"
          />
        </div>
      </div>

      <!-- Cards Aside Section -->
      <div class="aside">preview</div>
    </div>

    <ng-template #gameResultsDialog let-data>
      <sdeck-game-results [data]="data" />
    </ng-template>
  `,
  styleUrls: ['./game-board.page.scss'],
})
export class GameBoardPage extends Subscribable implements OnInit {
  protected type: CardsType = 'people';

  protected meta!: SwapiMeta;
  protected pagesTotal!: number;

  protected gameWizardFacade = inject(GameWizardFacade);
  protected gameBoardFacade = inject(GameBoardFacade);
  private gameBoardService = inject(GameBoardService);

  protected gameCards$: Observable<SwapiStarshipDto[] | SwapiPersonDto[]> =
    this.type === 'people'
      ? this.gameBoardFacade.peopleCards$
      : this.gameBoardFacade.starshipsCards$;

  protected players!: Players;

  private isSecondPlayerTurn!: boolean;

  @ViewChild('gameResultsDialog') gameResultsDialog!: TemplateRef<MatDialog>;

  ngOnInit(): void {
    this.loadGameCards();
    this.subscribeToPlayersAndSelectedCards();
  }

  private loadGameCards(): void {
    this.gameBoardFacade.loadCards({ param: 'type', type: this.type });

    this.subs.push(
      this.gameBoardFacade.meta$.subscribe((meta) => {
        this.meta = meta;
        this.countTotalPages(meta);
      })
    );
  }

  private subscribeToPlayersAndSelectedCards(): void {
    this.subs.push(
      this.gameWizardFacade.players$
        .pipe(
          take(1),
          switchMap((players) => {
            this.players = players;
            return this.gameBoardFacade.selectedCards$.pipe(
              distinctUntilChanged(),
              switchMap((cards) => {
                if (cards?.size === numberOfPlayers) {
                  this.gameBoardService.openGameResultsDialog(
                    this.gameResultsDialog,
                    Array.from(cards.values())
                  );
                }
                return this.gameBoardFacade.isSecondPlayerTurn$;
              })
            );
          })
        )
        .subscribe((isSecondPlayerTurn) => {
          this.isSecondPlayerTurn = isSecondPlayerTurn;
        })
    );
  }

  protected updateGameStatus(card: SwapiPersonDto | SwapiStarshipDto) {
    const currentPlayer = this.isSecondPlayerTurn
      ? this.players.playerTwo.name
      : this.players.playerOne.name;

    this.gameBoardFacade.updateSelectedCards(card, currentPlayer);
    this.gameBoardFacade.updatePlayerTurn();
  }

  protected navigateToPage(next: string | null) {
    if (!next) {
      return;
    }

    this.gameBoardFacade.loadCards({ param: 'url', url: next });
  }

  private countTotalPages(meta: SwapiMeta) {
    this.pagesTotal = Math.ceil(meta?.count / itemsPerPage);
  }
}
