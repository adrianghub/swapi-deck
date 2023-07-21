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
import {
  Observable,
  Subscription,
  distinctUntilChanged,
  take,
  tap,
} from 'rxjs';
import { Subscribable } from '../../../core/subscribable.abstract';
import {
  itemsPerPage,
  numberOfPlayers,
} from '../../../shared/constants/game.constants';
import { CardsType, PlayerPosition } from '../../../shared/models/game.model';
import { GameWizardFacade } from '../../game-wizard/store/game-wizard.facade';
import { PlayersState } from '../../game-wizard/store/game-wizard.store';
import { SwapiPersonDto, SwapiStarshipDto } from '../models/swapi.dto';
import { SwapiPerson, SwapiStarship } from '../models/swapi.model';
import { GameBoardService } from '../services/game-board.service';
import { GameBoardFacade } from '../store/game-board.facade';
import { SwapiMeta, WinnerState } from '../store/game-board.store';
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

        <sdeck-cards-pagination
          [loading$]="gameBoardFacade.loading$"
          [meta]="meta"
          [pagesTotal]="pagesTotal"
          (pageChanged)="
            gameBoardFacade.loadCards({ type: this.type, url: $event })
          "
        />
      </div>

      <!-- Cards Aside Section -->
      <div class="aside">
        <div>
          <p *ngIf="!winner">
            current turn:
            {{
              nextTurn === 'playerOne'
                ? players.playerTwo.name
                : players.playerOne.name
            }}
          </p>
        </div>
      </div>
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
  winner!: WinnerState;
  nextTurn!: PlayerPosition;

  protected gameWizardFacade = inject(GameWizardFacade);
  protected gameBoardFacade = inject(GameBoardFacade);
  private gameBoardService = inject(GameBoardService);
  private router = inject(Router);

  ngOnInit(): void {
    this.subs.push(
      this.subscribeToPlayers(),
      this.subscribeToSelectedCards(),
      this.subscribeToCardType(),
      this.subscribeToNextTurn(),
      this.subscribeToWinner(),
      this.subscribeToMetaData()
    );
  }

  private subscribeToPlayers(): Subscription {
    return this.gameWizardFacade.players$.pipe(take(1)).subscribe((players) => {
      this.players = players;
    });
  }

  private subscribeToSelectedCards(): Subscription {
    return this.gameBoardFacade.selectedCards$
      .pipe(distinctUntilChanged())
      .subscribe((selectedCards) => {
        if (selectedCards.size === numberOfPlayers) {
          const result = determineWinner(
            selectedCards,
            this.players,
            this.handleWinner.bind(this)
          );

          // draw
          if (result === 0) {
            this.handleDraw();
          }

          this.openGameResultsDialog(selectedCards);
        }
      });
  }

  private subscribeToCardType(): Subscription {
    return this.gameWizardFacade.cardsType$.pipe(take(1)).subscribe((type) => {
      this.type = type;
      this.loadGameCards(type);
    });
  }

  private subscribeToNextTurn(): Subscription {
    return this.gameBoardFacade.nextTurn$.subscribe((nextTurn) => {
      this.nextTurn = nextTurn;
    });
  }

  private subscribeToWinner(): Subscription {
    return this.gameWizardFacade.winner$.subscribe((winner) => {
      this.winner = winner;
    });
  }

  private subscribeToMetaData(): Subscription {
    return this.gameBoardFacade.meta$.subscribe((meta) => {
      this.meta = meta;

      this.countTotalPages(meta);
    });
  }

  private loadGameCards(type: CardsType): void {
    this.gameBoardFacade.loadCards({ type });

    this.gameCards$ =
      type === 'people'
        ? this.gameBoardFacade.peopleCards$
        : this.gameBoardFacade.starshipsCards$;
  }

  protected updateGameStatus(card: SwapiPersonDto | SwapiStarshipDto): void {
    this.gameBoardFacade.nextTurn$
      .pipe(
        take(1),
        tap((currentPlayer) => {
          const currentPlayerName = this.players[currentPlayer]?.name;
          this.gameBoardFacade.updateSelectedCards(card, currentPlayerName);
        })
      )
      .subscribe((currentPlayer) => {
        const nextPlayer =
          currentPlayer === 'playerOne' ? 'playerTwo' : 'playerOne';
        this.gameBoardFacade.updateNextTurn(nextPlayer);
      });
  }

  protected navigateToPage(next: string | null) {
    if (!next) {
      return;
    }

    this.gameBoardFacade.loadCards({ type: this.type, url: next });
  }

  private openGameResultsDialog(
    selectedCards: Map<string, SwapiPerson | SwapiStarship>
  ): void {
    this.gameBoardService.openGameResultsDialog(
      this.type,
      Array.from(selectedCards.values()),
      this.gameResultsDialog,
      this.playAgain.bind(this),
      this.quitGame.bind(this)
    );
  }

  private handleWinner(
    playerName: string,
    playerPosition: PlayerPosition
  ): void {
    this.gameWizardFacade.updatePlayerScore(playerPosition);
    this.gameWizardFacade.updateWinner({
      name: playerName,
      position: playerPosition,
    });
  }

  private handleDraw() {
    this.gameWizardFacade.updateWinner(null);

    this.gameWizardFacade.updatePlayerScore('playerOne');
    this.gameWizardFacade.updatePlayerScore('playerTwo');
  }

  private playAgain(): void {
    this.gameBoardFacade.resetGameState();
    this.gameBoardFacade.updateNextTurn(this.winner?.position);
    this.gameWizardFacade.updateWinner(null);

    this.router.navigate(['/wizard/cards-type']);
  }

  private quitGame(): void {
    this.gameWizardFacade.resetWizardState();
    this.gameBoardFacade.resetGameState();

    this.router.navigate(['/']);
  }

  private countTotalPages(meta: SwapiMeta) {
    this.pagesTotal = Math.ceil(meta?.count / itemsPerPage);
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
