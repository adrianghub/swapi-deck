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
        path: 'wizard',
        loadChildren: () =>
          import('./modules/game-wizard/game-wizard.module').then(
            (m) => m.GameWizardModule
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
