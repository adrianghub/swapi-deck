import { GameWizardFacade } from './../../../game-wizard/store/game-wizard.facade';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'sdeck-game-board-layout',
  template: ` <sdeck-layout-header>
      <ng-container actions>
        <div class="players">
          <p class="regular-title-large">
            {{ (gameWizardFacade.players$ | async)?.playerOne?.name }}:
            <strong>{{
              (gameWizardFacade.players$ | async)?.playerOne?.score ?? 0
            }}</strong>
          </p>
          <p class="regular-title-large">
            {{ (gameWizardFacade.players$ | async)?.playerTwo?.name }}:
            <strong>{{
              (gameWizardFacade.players$ | async)?.playerTwo?.score ?? 0
            }}</strong>
          </p>
        </div>
      </ng-container>
    </sdeck-layout-header>

    <router-outlet />`,
  styleUrls: ['./game-board.layout.scss'],
})
export class GameBoardLayout {
  protected gameWizardFacade = inject(GameWizardFacade);
}
