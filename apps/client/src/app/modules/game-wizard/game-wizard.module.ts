import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NgxsModule } from '@ngxs/store';
import { LayoutHeaderComponent } from '../../core/layouts/components/layout-header/layout-header.component';
import {
  CustomTranslateModule,
  configTranslateModule,
} from '../../core/module.abstract';
import { ButtonComponent } from '../../shared/ui/atoms/button/button.component';
import { InputComponent } from '../../shared/ui/atoms/input/input.component';
import { SelectComponent } from '../../shared/ui/atoms/select/select.component';
import { GameFacade } from '../../store/game.facade';
import { GameRepository } from '../../store/game.repository';
import { GameState } from '../../store/game.store';
import { MatTabRouterLinkActiveDirective } from './directives/routerLinkActive.directive';
import { gameWizardRoutes } from './game-wizard.routes';
import { GameWizardLayout } from './layout/game-wizard/game-wizard.layout';
import { GameWizardPage } from './pages/game-wizard.page';
import { GameWizardNamesTab } from './tabs/game-names/game-wizard-names.tab';
import { GameWizardCardsTypeTab } from './tabs/game-wizard-type/game-wizard-cards-type.tab';

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
    NgxsModule.forFeature([GameState]),
    RouterModule.forChild(gameWizardRoutes),
    TranslateModule.forChild(configTranslateModule(['game/game-wizard'])),
    FormsModule,
    MatInputModule,
    InputComponent,
    MatTabsModule,
    ReactiveFormsModule,
    LayoutHeaderComponent,
    ButtonComponent,
    SelectComponent,
  ],
  providers: [GameFacade, GameRepository],
})
export class GameWizardModule extends CustomTranslateModule {
  constructor(override translateService: TranslateService) {
    super(translateService);
  }
}
