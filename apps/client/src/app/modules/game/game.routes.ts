import { Routes } from '@angular/router';
import { GameWizardLayout } from './layouts/game-wizard/game-wizard.layout';
import { GameWizardNamesTab } from './tabs/game-names/game-wizard-names.tab';
import { GameWizardCardsTypeTab } from './tabs/game-wizard-type/game-wizard-type.tab';

export const gameRoutes: Routes = [
  {
    path: '',
    component: GameWizardLayout,
    children: [
      {
        path: 'wizard',
        component: GameWizardNamesTab,
      },
      {
        path: 'type',
        component: GameWizardCardsTypeTab,
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'wizard',
    pathMatch: 'prefix',
  },
];
