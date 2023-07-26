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
        path: 'game-wizard',
        loadChildren: () =>
          import('./modules/game-wizard/game-wizard.module').then(
            (m) => m.GameWizardModule
          ),
      },
      {
        path: 'game-board',
        loadChildren: () =>
          import('./modules/game-board/game-board.module').then(
            (m) => m.GameBoardModule
          ),
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];
