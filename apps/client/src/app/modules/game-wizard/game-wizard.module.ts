import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { NgxsModule } from '@ngxs/store';
import { LayoutHeaderComponent } from '../../core/layouts/components/layout-header/layout-header.component';
import { ButtonComponent } from '../../shared/ui/atoms/button/button.component';
import { InputComponent } from '../../shared/ui/atoms/input/input.component';
import { MatTabRouterLinkActiveDirective } from './directives/routerLinkActive.directive';
import { gameWizardRoutes } from './game-wizard.routes';
import { GameWizardLayout } from './layout/game-wizard/game-wizard.layout';
import { GameWizardPage } from './pages/game-wizard.page';
import { GameWizardFacade } from './store/game-wizard.facade';
import { GameWizardState } from './store/game-wizard.store';
import { GameWizardNamesTab } from './tabs/game-names/game-wizard-names.tab';
import { GameWizardCardsTypeTab } from './tabs/game-wizard-type/game-wizard-type.tab';

@NgModule({
  declarations: [
    GameWizardLayout,
    GameWizardNamesTab,
    GameWizardCardsTypeTab,
    GameWizardPage,
    MatTabRouterLinkActiveDirective,
  ],
  imports: [
    CommonModule,
    NgxsModule.forFeature([GameWizardState]),
    RouterModule.forChild(gameWizardRoutes),
    FormsModule,
    MatInputModule,
    InputComponent,
    TranslateModule,
    MatTabsModule,
    LayoutHeaderComponent,
    ButtonComponent,
    ReactiveFormsModule,
  ],
  providers: [GameWizardFacade],
})
export class GameWizardModule {}
