import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { links } from '../../../shared/constants/game.constants';
import { GameFacade } from '../../../store/game.facade';

@Component({
  selector: 'sdeck-main-menu',
  templateUrl: './main-menu.page.html',
  styleUrls: ['./main-menu.page.scss'],
})
export class MainMenuPage {
  protected router = inject(Router);
  protected gameFacade = inject(GameFacade);

  startNewGame() {
    this.gameFacade.resetGameState();

    this.router.navigateByUrl(links.wizard.names);
  }
}
