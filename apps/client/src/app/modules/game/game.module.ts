import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { NgxsModule } from '@ngxs/store';
import { LayoutHeaderComponent } from '../../core/layouts/components/layout-header/layout-header.component';
import { InputComponent } from '../../shared/ui/atoms/input/input.component';
import { MatTabRouterLinkActiveDirective } from './directives/routerLinkActive.directive';
import { gameRoutes } from './game.routes';
import { GameBoardLayout } from './layouts/game-board/game-board.layout';
import { GameWizardLayout } from './layouts/game-wizard/game-wizard.layout';
import { GameBoardFacade } from './store/game-board.facade';
import { GameBoardRepository } from './store/game-board.repository';
import { GameBoardState } from './store/game-board.store';
import { GameWizardNamesTab } from './tabs/game-names/game-wizard-names.tab';
import { GameWizardCardsTypeTab } from './tabs/game-wizard-type/game-wizard-type.tab';

@NgModule({
  declarations: [
    GameWizardLayout,
    GameWizardNamesTab,
    GameBoardLayout,
    GameWizardCardsTypeTab,
    MatTabRouterLinkActiveDirective,
  ],
  imports: [
    CommonModule,
    NgxsModule.forFeature([GameBoardState]),
    RouterModule.forChild(gameRoutes),
    MatButtonModule,
    FormsModule,
    MatInputModule,
    InputComponent,
    TranslateModule,
    MatTabsModule,
    LayoutHeaderComponent,
  ],
  providers: [GameBoardRepository, GameBoardFacade],
})
export class GameModule {}
