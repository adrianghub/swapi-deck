import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { NgxsModule } from '@ngxs/store';
import { LayoutHeaderComponent } from '../../core/layouts/components/layout-header/layout-header.component';
import { ButtonComponent } from '../../shared/ui/atoms/button/button.component';
import { InputComponent } from '../../shared/ui/atoms/input/input.component';
import { gameBoardRoutes } from './game-board.routes';
import { GameBoardLayout } from './layouts/game-board/game-board.layout';
import { GameBoardFacade } from './store/game-board.facade';
import { GameBoardRepository } from './store/game-board.repository';
import { GameBoardState } from './store/game-board.store';

@NgModule({
  declarations: [GameBoardLayout],
  imports: [
    CommonModule,
    NgxsModule.forFeature([GameBoardState]),
    RouterModule.forChild(gameBoardRoutes),
    FormsModule,
    MatInputModule,
    InputComponent,
    TranslateModule,
    MatTabsModule,
    LayoutHeaderComponent,
    ButtonComponent,
  ],
  providers: [GameBoardRepository, GameBoardFacade],
})
export class GameWizardModule {}
