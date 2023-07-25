import {
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
  combineLatest,
  distinctUntilChanged,
  take,
} from 'rxjs';
import { Subscribable } from '../../../core/subscribable.abstract';
import {
  itemsPerPage,
  links,
  numberOfPlayers,
} from '../../../shared/constants/game.constants';
import {
  CardsType,
  PlayerPosition,
  SwapiMeta,
} from '../../../shared/models/game.model';
import { GameWizardFacade } from '../../game-wizard/store/game-wizard.facade';
import { PlayersState } from '../../game-wizard/store/game-wizard.store';
import { SwapiPersonDto, SwapiStarshipDto } from '../models/swapi.dto';
import { SwapiPerson, SwapiStarship } from '../models/swapi.model';
import { GameBoardService } from '../services/game-board.service';
import { GameBoardFacade } from '../store/game-board.facade';
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
              class="regular-title-large error-message"
              [innerHTML]="'misc.errors.' + error | translate | highlight"
            ></p>
          </ng-container>

          <h1 *ngIf="type" class="regular-headline-medium headline">
            {{ 'gameBoard.cards.type.' + type | translate }}
            <span *ngIf="(gameBoardFacade.meta$ | async)?.count as count"
              >({{ count }})</span
            >
          </h1>

          <sdeck-cards
            [cards$]="gameCards$"
            [loading$]="gameBoardFacade.loading$"
            [type]="type"
            [selectedCards$]="gameBoardFacade.selectedCards$"
            (selected)="updateGameStatus($event)"
            class="game-cards"
            data-cy="game-cards"
          />
        </div>

        <sdeck-cards-pagination
          [loading$]="gameBoardFacade.loading$"
          [meta$]="gameBoardFacade.meta$"
          [pagesTotal]="pagesTotal"
          (pageChanged)="loadCards(type, $event)"
        />
      </div>

      <!-- Cards Aside Section -->
      <div class="aside">
        <sdeck-cards-aside
          [nextTurn]="nextTurn"
          [players]="players"
          [selectedCard]="selectedCard"
        />
      </div>
    </div>

    <ng-template #gameResultsDialog let-data>
      <sdeck-game-result [data]="data" data-cy="game-result-dialog" />
    </ng-template>
  `,
  styleUrls: ['./game-board.page.scss'],
  providers: [GameBoardService],
})
export class GameBoardPage extends Subscribable implements OnInit {
  @ViewChild('gameResultsDialog') gameResultsDialog!: TemplateRef<MatDialog>;

  protected type!: CardsType;
  protected pagesTotal!: number;
  protected gameCards$!: Observable<SwapiStarshipDto[] | SwapiPersonDto[]>;
  protected selectedCard!: SwapiPerson | SwapiStarship | undefined;
  protected players!: PlayersState;
  protected nextTurn!: PlayerPosition;

  protected gameBoardFacade = inject(GameBoardFacade);
  private gameWizardFacade = inject(GameWizardFacade);
  private gameBoardService = inject(GameBoardService);
  private router = inject(Router);

  ngOnInit(): void {
    this.setupGameSubscriptions();
  }

  private setupGameSubscriptions(): void {
    this.subscribeToPlayers();
    this.subscribeToCardType();
    this.subscribeToSelectedCards();
    this.subscribeToBoardData();
  }

  private subscribeToPlayers(): Subscription {
    return this.gameWizardFacade.players$.pipe(take(1)).subscribe((players) => {
      this.players = players;
    });
  }

  private subscribeToSelectedCards(): void {
    this.subs.push(
      this.gameBoardFacade.selectedCards$
        .pipe(distinctUntilChanged())
        .subscribe((selectedCards) => {
          if (selectedCards?.size === 1) {
            this.selectedCard = selectedCards.values().next().value;
          }

          if (selectedCards?.size === numberOfPlayers) {
            const result = determineWinner(
              this.nextTurn,
              selectedCards,
              this.players,
              this.handleWinner.bind(this)
            );

            if (result === 'draw') {
              this.handleDraw();
            }

            this.openGameResultsDialog(selectedCards);
          }
        })
    );
  }

  private subscribeToCardType(): void {
    this.gameWizardFacade.cardsType$.pipe(take(1)).subscribe((type) => {
      this.loadCards(type);

      this.type = type;
    });
  }

  private subscribeToBoardData(): void {
    this.subs.push(
      combineLatest([
        this.gameBoardFacade.meta$,
        this.gameBoardFacade.nextTurn$,
        this.gameWizardFacade.winner$,
      ]).subscribe(([meta, nextTurn, winner]) => {
        this.nextTurn = nextTurn;

        if (winner) {
          this.gameBoardFacade.updateNextTurn(winner.position);
        } else {
          this.nextTurn = nextTurn;
        }

        this.countTotalPages(meta);
      })
    );
  }

  protected loadCards(type: CardsType, url?: string): void {
    this.gameBoardFacade.loadCards({ type, url });

    this.gameCards$ =
      type === 'people'
        ? this.gameBoardFacade.peopleCards$
        : this.gameBoardFacade.starshipsCards$;
  }

  protected updateGameStatus(card: SwapiPersonDto | SwapiStarshipDto): void {
    const currentPlayerName =
      this.nextTurn === 'playerOne'
        ? this.players.playerTwo.name
        : this.players.playerOne.name;

    this.gameBoardFacade.updateSelectedCards(card, currentPlayerName);
    const nextPlayer =
      this.nextTurn === 'playerOne' ? 'playerTwo' : 'playerOne';
    this.gameBoardFacade.updateNextTurn(nextPlayer);
  }

  private openGameResultsDialog(
    selectedCards: Map<string, SwapiPerson | SwapiStarship>
  ): void {
    this.gameBoardService.openGameResultsDialog(
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
    this.gameWizardFacade.updateWinner(null);

    this.router.navigateByUrl(links.wizard.cardsType);
  }

  private quitGame(): void {
    this.gameWizardFacade.resetWizardState();
    this.gameBoardFacade.resetGameState();

    this.router.navigateByUrl(links.base);
  }

  private countTotalPages(meta: SwapiMeta) {
    this.pagesTotal = Math.ceil(meta?.count / itemsPerPage);
  }
}
