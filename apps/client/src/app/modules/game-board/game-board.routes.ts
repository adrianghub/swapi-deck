import { Routes } from '@angular/router';
import { GameBoardLayout } from './layouts/game-board/game-board.layout';

export const gameBoardRoutes: Routes = [
  {
    path: '',
    component: GameBoardLayout,
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];
