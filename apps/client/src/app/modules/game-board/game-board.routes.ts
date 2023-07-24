import { Routes } from '@angular/router';
import { hasCardTypeDefinedGuard } from './guards/hasCardTypeDefined.guard';
import { GameBoardLayout } from './layouts/game-board/game-board.layout';
import { GameBoardPage } from './pages/game-board.page';

export const gameBoardRoutes: Routes = [
  {
    path: '',
    component: GameBoardLayout,
    canActivate: [hasCardTypeDefinedGuard],
    children: [
      {
        path: '',
        component: GameBoardPage,
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];
