import { Component, inject } from '@angular/core';
import { GameFacade } from 'apps/client/src/app/store/game.facade';

@Component({
  selector: 'sdeck-game-board-layout',
  template: ` <sdeck-layout-header>
      <ng-container actions>
        <div class="players">
          <p class="regular-title-large">
            {{ 'gameBoard.score' | translate }}
          </p>

          <span class="separator"></span>

          <p class="regular-title-large">
            {{ (gameFacade.players$ | async)?.playerOne?.name }}:
            <strong>{{
              (gameFacade.players$ | async)?.playerOne?.score ?? 0
            }}</strong>
          </p>
          <p class="regular-title-large">
            {{ (gameFacade.players$ | async)?.playerTwo?.name }}:
            <strong>{{
              (gameFacade.players$ | async)?.playerTwo?.score ?? 0
            }}</strong>
          </p>
        </div>
      </ng-container>
    </sdeck-layout-header>

    <router-outlet />`,
  styleUrls: ['./game-board.layout.scss'],
})
export class GameBoardLayout {
  protected gameFacade = inject(GameFacade);
}
