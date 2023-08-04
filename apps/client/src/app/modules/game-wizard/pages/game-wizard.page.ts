import { Component, inject } from '@angular/core';
import { GameFacade } from '../../../store/game.facade';

@Component({
  selector: 'sdeck-game-wizard-page',
  templateUrl: './game-wizard.page.html',
})
export class GameWizardPage {
  protected gameFacade = inject(GameFacade);
}
