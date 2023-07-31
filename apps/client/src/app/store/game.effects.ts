import { Injectable, inject } from '@angular/core';
import { actions, createEffect, dispatch, ofType } from '@ngneat/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import {
  loadCardsError,
  loadCardsLoading,
  loadCardsSuccess,
} from './game.actions';
import { GameRepository } from './game.repository';

@Injectable({ providedIn: 'root' })
export class GameEffects {
  private gameRepository = inject(GameRepository);

  loadCards$ = createEffect(() => {
    return actions.pipe(
      ofType(loadCardsLoading),
      switchMap(({ cardsKey, cardsType, url, page }) => {
        return this.gameRepository.getSwapiData({ type: cardsType, url }).pipe(
          map((res) => of(dispatch(loadCardsSuccess({ res, page, cardsKey })))),
          catchError((error) => {
            console.error(error);
            return of(dispatch(loadCardsError({ cardsType })));
          })
        );
      })
    );
  });
}
