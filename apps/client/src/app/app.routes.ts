import { Route } from '@angular/router';
import { BaseLayout } from './core/layouts/base.layout';
import { MainMenuPage } from './core/pages/main-menu/main-menu.page';

export const appRoutes: Route[] = [
  {
    path: '',
    component: BaseLayout,
    children: [
      {
        path: '',
        component: MainMenuPage,
      },
      {
        path: 'game',
        loadChildren: () =>
          import('./modules/game/game.module').then((m) => m.GameModule),
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];
