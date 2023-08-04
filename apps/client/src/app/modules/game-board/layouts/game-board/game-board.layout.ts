import { GameFacade } from '@/store/game.facade';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'sdeck-game-board-layout',
  templateUrl: './game-board.layout.html',
  styleUrls: ['./game-board.layout.scss'],
})
export class GameBoardLayout {
  protected gameFacade = inject(GameFacade);
}
