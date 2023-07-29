import {
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
  inject,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable, combineLatest, distinctUntilChanged, take } from 'rxjs';
import { Subscribable } from '../../../core/subscribable.abstract';
import {
  links,
  numberOfPlayers,
} from '../../../shared/constants/game.constants';
import { CardsType, PlayerPosition } from '../../../shared/models/game.model';
import { GameFacade } from '../../../store/game.facade';
import { PlayersState } from '../../../store/game.store';
import { SwapiPersonDto, SwapiStarshipDto } from '../models/swapi.dto';
import { SwapiPerson, SwapiStarship } from '../models/swapi.model';
import { GameBoardService } from '../services/game-board.service';
import { determineWinner } from './game-board.utils';

@Component({
  selector: 'sdeck-game-wizard-page',
  templateUrl: './game-board.page.html',
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

  protected gameFacade = inject(GameFacade);
  private gameBoardService = inject(GameBoardService);
  private router = inject(Router);

  ngOnInit(): void {
    this.setupGameSubscriptions();
  }

  private setupGameSubscriptions(): void {
    this.subscribeToWizardData();
    this.subscribeToBoardData();
    this.subscribeToSelectedCards();
  }

  private subscribeToWizardData(): void {
    this.subs.push(
      combineLatest([this.gameFacade.players$, this.gameFacade.cardsType$])
        .pipe(take(1))
        .subscribe(([players, cardsType]) => {
          this.players = players;
          this.type = cardsType;

          this.loadCards(cardsType);
        })
    );
  }

  private subscribeToBoardData(): void {
    this.subs.push(
      combineLatest([
        this.gameFacade.nextTurn$,
        this.gameFacade.winner$,
      ]).subscribe(([nextTurn, winner]) => {
        this.nextTurn = nextTurn;

        if (winner) {
          this.gameFacade.updateNextTurn(winner.position);
        } else {
          this.nextTurn = nextTurn;
        }
      })
    );
  }

  private subscribeToSelectedCards(): void {
    this.subs.push(
      this.gameFacade.selectedCards$
        .pipe(distinctUntilChanged())
        .subscribe((selectedCards) => {
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

  protected loadCards(type: CardsType, url?: string): void {
    this.gameFacade.loadCards(type, url);

    this.gameCards$ =
      type === 'people'
        ? this.gameFacade.peopleCards$
        : this.gameFacade.starshipsCards$;
  }

  protected updateGameStatus(card: SwapiPersonDto | SwapiStarshipDto): void {
    const currentPlayerName =
      this.nextTurn === 'playerOne'
        ? this.players.playerTwo.name
        : this.players.playerOne.name;

    this.gameFacade.updateSelectedCards(card, currentPlayerName);
    const nextPlayer =
      this.nextTurn === 'playerOne' ? 'playerTwo' : 'playerOne';
    this.gameFacade.updateNextTurn(nextPlayer);
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
    this.gameFacade.updatePlayerScore(playerPosition);
    this.gameFacade.updateWinner({
      name: playerName,
      position: playerPosition,
    });
  }

  private handleDraw() {
    this.gameFacade.updateWinner(null);
    this.gameFacade.updatePlayerScore('playerOne');
    this.gameFacade.updatePlayerScore('playerTwo');
  }

  private playAgain(): void {
    this.gameFacade.resetGameBoardState();

    this.router.navigateByUrl(links.wizard.cardsType);
  }

  private quitGame(): void {
    this.gameFacade.resetGameState();

    this.router.navigateByUrl(links.base);
  }
}
