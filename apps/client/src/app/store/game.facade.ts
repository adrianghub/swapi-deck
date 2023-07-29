import { Injectable, inject } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import {
  SwapiPersonDto,
  SwapiStarshipDto,
} from '../modules/game-board/models/swapi.dto';
import {
  SwapiMeta,
  SwapiPerson,
  SwapiStarship,
} from '../modules/game-board/models/swapi.model';
import {
  CardsType,
  PlayerPosition,
  WinnerState,
} from '../shared/models/game.model';
import {
  LoadCards,
  ResetGameBoardState,
  ResetGameState,
  UpdateCardsType,
  UpdateNextTurn,
  UpdatePlayerName,
  UpdatePlayerScore,
  UpdateSelectedCards,
  UpdateWinner,
} from './game.actions';
import { GameSelectors } from './game.selectors';
import { PlayersState } from './game.store';

@Injectable()
export class GameFacade {
  private store = inject(Store);

  @Select(GameSelectors.players) players$!: Observable<PlayersState>;
  @Select(GameSelectors.cardsType) cardsType$!: Observable<CardsType>;
  @Select(GameSelectors.winner) winner$!: Observable<WinnerState>;

  @Select(GameSelectors.peopleCards) peopleCards$!: Observable<
    SwapiPersonDto[]
  >;

  @Select(GameSelectors.starshipsCards)
  starshipsCards$!: Observable<SwapiStarshipDto[]>;

  @Select(GameSelectors.loading) loading$!: Observable<boolean>;

  @Select(GameSelectors.errorMessage) errorMessage$!: Observable<string>;

  @Select(GameSelectors.paginationData)
  paginationData$!: Observable<SwapiMeta>;

  @Select(GameSelectors.cardsTotal)
  cardsTotal$!: Observable<number>;

  @Select(GameSelectors.pagesTotal)
  pagesTotal$!: Observable<number>;

  @Select(GameSelectors.currentPage)
  currentPage$!: Observable<number>;

  @Select(GameSelectors.selectedCards) selectedCards$!: Observable<
    Map<string, SwapiPerson | SwapiStarship>
  >;

  @Select(GameSelectors.nextTurn)
  nextTurn$!: Observable<PlayerPosition>;

  loadCards(type: CardsType, url?: string): void {
    this.store.dispatch(new LoadCards(type, url));
  }

  updateSelectedCards(
    card: SwapiPersonDto | SwapiStarshipDto,
    playerName: string
  ): void {
    this.store.dispatch(new UpdateSelectedCards(card, playerName));
  }

  updateNextTurn(nextTurn: PlayerPosition): void {
    this.store.dispatch(new UpdateNextTurn(nextTurn));
  }

  resetGameState(): void {
    this.store.dispatch(new ResetGameState());
  }

  resetGameBoardState(): void {
    this.store.dispatch(new ResetGameBoardState());
  }

  updatePlayerName(playerPosition: PlayerPosition, name: string): void {
    this.store.dispatch(new UpdatePlayerName(playerPosition, name));
  }

  updateCardsType(cardsType: CardsType): void {
    this.store.dispatch(new UpdateCardsType(cardsType));
  }

  updatePlayerScore(playerPosition: PlayerPosition): void {
    this.store.dispatch(new UpdatePlayerScore(playerPosition));
  }

  updateWinner(winner: WinnerState | null): void {
    this.store.dispatch(new UpdateWinner(winner));
  }
}
