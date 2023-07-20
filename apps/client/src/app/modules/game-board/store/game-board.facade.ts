import { Injectable, inject } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { SwapiPersonDto, SwapiStarshipDto } from '../models/swapi.dto';
import {
  SwapiParamsType,
  SwapiPerson,
  SwapiStarship,
} from '../models/swapi.model';
import {
  GameBoardState,
  LoadCards,
  ResetGameBoardState,
  SwapiMeta,
  UpdatePlayerTurn,
  UpdateSelectedCards,
} from './game-board.store';

@Injectable()
export class GameBoardFacade {
  private store = inject(Store);

  @Select(GameBoardState.peopleCards) peopleCards$!: Observable<
    SwapiPersonDto[]
  >;

  @Select(GameBoardState.starshipsCards) starshipsCards$!: Observable<
    SwapiStarshipDto[]
  >;

  @Select(GameBoardState.loading) loading$!: Observable<boolean>;

  @Select(GameBoardState.errorMessage) errorMessage$!: Observable<string>;

  @Select(GameBoardState.meta) meta$!: Observable<SwapiMeta>;

  @Select(GameBoardState.selectedCards) selectedCards$!: Observable<
    Map<string, SwapiPerson | SwapiStarship>
  >;

  @Select(GameBoardState.isSecondPlayerTurn)
  isSecondPlayerTurn$!: Observable<boolean>;

  loadCards(params: SwapiParamsType): void {
    this.store.dispatch(new LoadCards(params));
  }

  updateSelectedCards(
    card: SwapiPersonDto | SwapiStarshipDto,
    playerName: string
  ): void {
    this.store.dispatch(new UpdateSelectedCards(card, playerName));
  }

  updatePlayerTurn(): void {
    this.store.dispatch(new UpdatePlayerTurn());
  }

  resetGameState(): void {
    this.store.dispatch(new ResetGameBoardState());
  }
}
