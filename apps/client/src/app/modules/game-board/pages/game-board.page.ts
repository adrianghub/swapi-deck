import {
  AfterViewInit,
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
  inject,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable, distinctUntilChanged, switchMap, take } from 'rxjs';
import { Subscribable } from '../../../core/subscribable.abstract';
import {
  itemsPerPage,
  numberOfPlayers,
} from '../../../shared/constants/game.constants';
import { CardsType } from '../../../shared/models/game.model';
import { GameWizardFacade } from '../../game-wizard/store/game-wizard.facade';
import { PlayersState } from '../../game-wizard/store/game-wizard.store';
import { SwapiPersonDto, SwapiStarshipDto } from '../models/swapi.dto';
import { SwapiPerson, SwapiStarship } from '../models/swapi.model';
import { GameBoardService } from '../services/game-board.service';
import { GameBoardFacade } from '../store/game-board.facade';
import { SwapiMeta } from '../store/game-board.store';
import { determineWinner } from './game-board.utils';

@Component({
  selector: 'sdeck-game-wizard-page',
  template: `
    <div class="wrapper">
      <!-- Cards Board Section -->
      <div class="main-content">
        <div class="cards-board">
          <ng-container *ngIf="gameBoardFacade.errorMessage$ | async as error">
            <p
              class="regular-title-large"
              [innerHTML]="'misc.errors.' + error | translate | highlight"
            ></p>
          </ng-container>

          <h1 *ngIf="type" class="regular-headline-medium headline">
            {{ 'game.board.cards.type.' + type | translate }}
            <span *ngIf="meta?.count">({{ meta.count }})</span>
          </h1>

          <sdeck-cards
            [cards$]="gameCards$"
            [loading$]="gameBoardFacade.loading$"
            [type]="type"
            [selectedCards$]="gameBoardFacade.selectedCards$"
            (selected)="updateGameStatus($event)"
            class="cards"
          />
        </div>

        <div class="cards-pagination">
          <sdeck-button
            [label]="'previous page' | translate"
            [disabled]="(gameBoardFacade.loading$ | async) || !meta.previous"
            (clicked)="navigateToPage(meta.previous)"
            prefixIcon="arrow-left"
          />

          <p class="regular-body-large" *ngIf="meta?.page">
            {{ meta.page }} of {{ pagesTotal }}
          </p>

          <sdeck-button
            [label]="'next page' | translate"
            [disabled]="(gameBoardFacade.loading$ | async) || !meta.next"
            (clicked)="navigateToPage(meta.next)"
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
  providers: [GameBoardService],
})
export class GameBoardPage
  extends Subscribable
  implements OnInit, AfterViewInit
{
  @ViewChild('gameResultsDialog') gameResultsDialog!: TemplateRef<MatDialog>;

  type!: CardsType;
  meta!: SwapiMeta;
  pagesTotal!: number;
  gameCards$!: Observable<SwapiStarshipDto[] | SwapiPersonDto[]>;
  players!: PlayersState;
  isSecondPlayerTurn!: boolean;

  protected gameWizardFacade = inject(GameWizardFacade);
  protected gameBoardFacade = inject(GameBoardFacade);
  private gameBoardService = inject(GameBoardService);
  private router = inject(Router);

  ngOnInit(): void {
    this.subscribeToPlayersAndSelectedCards();

    this.gameWizardFacade.cardsType$.pipe(take(1)).subscribe((type) => {
      this.type = type;
      this.loadGameCards(type);
    });
  }

  private loadGameCards(type: CardsType): void {
    this.gameBoardFacade.loadCards({ type });

    this.gameBoardFacade.meta$.subscribe((meta) => {
      this.meta = meta;
      this.countTotalPages(meta);
    });

    this.gameCards$ =
      type === 'people'
        ? this.gameBoardFacade.peopleCards$
        : this.gameBoardFacade.starshipsCards$;
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
                    this.type,
                    Array.from(cards.values()),
                    this.gameResultsDialog,
                    this.playAgain.bind(this),
                    this.quitGame.bind(this)
                  );

                  this.processGameResults(cards);
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

    this.gameBoardFacade.loadCards({ type: this.type, url: next });
  }

  private countTotalPages(meta: SwapiMeta) {
    this.pagesTotal = Math.ceil(meta?.count / itemsPerPage);
  }

  private quitGame(): void {
    this.gameWizardFacade.resetWizardState();
    this.gameBoardFacade.resetGameState();

    this.router.navigate(['/']);
  }

  private playAgain(): void {
    this.gameBoardFacade.resetGameState();

    this.router.navigate(['/wizard/cards-type']);
  }

  processGameResults(
    selectedCards: Map<string, SwapiPerson | SwapiStarship>
  ): void {
    const result = determineWinner(selectedCards);

    switch (Math.sign(result)) {
      case 1:
        this.gameWizardFacade.updatePlayerScore('playerOne');
        break;
      case -1:
        this.gameWizardFacade.updatePlayerScore('playerTwo');
        break;
      default:
        // console.log("It's a draw!");
        break;
    }
  }

  ngAfterViewInit(): void {
    // TODO: remove before production (currently used for testing purposes)
    // this.gameBoardService.openGameResultsDialog(
    //   'people',
    //   [
    //     {
    //       name: '33BBY',
    //       mass: '32',
    //       selectedBy: 'maciek',
    //     } as SwapiPerson,
    //     {
    //       name: '33BBY',
    //       mass: '52',
    //       selectedBy: 'adam',
    //     } as SwapiPerson,
    //   ],
    //   this.gameResultsDialog,
    //   this.playAgain.bind(this),
    //   this.quitGame.bind(this)
    // );

    console.log('GameBoardPage.ngAfterViewInit');
  }
}
