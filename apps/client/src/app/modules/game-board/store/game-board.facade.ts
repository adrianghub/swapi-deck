import { Injectable, inject } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { SwapiPersonDto, SwapiStarshipDto } from '../models/swapi.dto';
import { SwapiParamsType } from '../models/swapi.model';
import {
  GameBoardState,
  LoadPeopleCards,
  SwapiMeta,
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

  @Select(GameBoardState.meta) meta$!: Observable<SwapiMeta>;

  @Select(GameBoardState.selectedCards) selectedCards$!: Observable<
    Map<string, SwapiPersonDto | SwapiStarshipDto>
  >;

  loadCards(params: SwapiParamsType): void {
    this.store.dispatch(new LoadPeopleCards(params));
  }

  updateSelectedCards(card: SwapiPersonDto | SwapiStarshipDto): void {
    this.store.dispatch(new UpdateSelectedCards(card));
  }
}
