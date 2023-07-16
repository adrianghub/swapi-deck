import { Route } from '@angular/router';
import { GameLayoutComponent } from './core/layouts/game-layout/game-layout.component';
import { MainMenuPage } from './core/pages/main-menu/main-menu.page';

export const appRoutes: Route[] = [
  {
    path: '',
    component: MainMenuPage,
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
