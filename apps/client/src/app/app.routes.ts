import { Route } from '@angular/router';
import { GameLayoutComponent } from './core/layouts/game-layout/game-layout.component';
import { GameBoardPage } from './modules/game-board/pages/game-board.page';

export const appRoutes: Route[] = [
  {
    path: '',
    component: GameBoardPage,
  },
  {
    path: 'game',
    component: GameLayoutComponent,
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];
