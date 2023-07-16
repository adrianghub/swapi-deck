import { Injectable, inject } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { SwapiPersonDto } from '../models/swapi.dto';
import { GameBoardState, LoadPeopleCards, SwapiMeta } from './game-board.store';

@Injectable()
export class GameBoardFacade {
  private store = inject(Store);

  @Select(GameBoardState.peopleCards) peopleCards$!: Observable<
    SwapiPersonDto[]
  >;

  @Select(GameBoardState.loading) loading$!: Observable<boolean>;

  @Select(GameBoardState.meta) meta$!: Observable<SwapiMeta>;

  loadPeopleCards(url?: string): void {
    this.store.dispatch(new LoadPeopleCards(url));
  }
}
