import { Injectable, inject } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { PlayerPosition } from '../../../shared/models/game.model';
import { SwapiPersonDto, SwapiStarshipDto } from '../models/swapi.dto';
import {
  SwapiMeta,
  SwapiParamsType,
  SwapiPerson,
  SwapiStarship,
} from '../models/swapi.model';
import {
  LoadCards,
  ResetGameBoardState,
  UpdateNextTurn,
  UpdateSelectedCards,
} from './game-board.actions';
import { GameBoardState } from './game-board.store';

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

  @Select(GameBoardState.nextTurn)
  nextTurn$!: Observable<PlayerPosition>;

  loadCards(params: SwapiParamsType): void {
    this.store.dispatch(new LoadCards(params));
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
    this.store.dispatch(new ResetGameBoardState());
  }
}
