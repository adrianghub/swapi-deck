import { Routes } from '@angular/router';
import { hasPlayersDefinedGuard } from './guards/hasPlayersDefined.guard';
import { GameWizardPage } from './pages/game-wizard.page';
import { GameWizardNamesTab } from './tabs/game-names/game-wizard-names.tab';
import { GameWizardCardsTypeTab } from './tabs/game-wizard-type/game-wizard-type.tab';

export const gameWizardRoutes: Routes = [
  {
    path: '',
    component: GameWizardPage,
    children: [
      {
        path: 'names',
        component: GameWizardNamesTab,
      },
      {
        path: 'cards-type',
        component: GameWizardCardsTypeTab,
        canActivate: [hasPlayersDefinedGuard],
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'names',
    pathMatch: 'prefix',
  },
];
