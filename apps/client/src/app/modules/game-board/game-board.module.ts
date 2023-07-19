import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { NgxsModule } from '@ngxs/store';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { LayoutHeaderComponent } from '../../core/layouts/components/layout-header/layout-header.component';
import { ButtonComponent } from '../../shared/ui/atoms/button/button.component';
import { InputComponent } from '../../shared/ui/atoms/input/input.component';
import { GameWizardFacade } from '../game-wizard/store/game-wizard.facade';
import { GameResultsDialog } from './dialogs/game-results/game-results.dialog';
import { gameBoardRoutes } from './game-board.routes';
import { GameBoardLayout } from './layouts/game-board/game-board.layout';
import { GameBoardPage } from './pages/game-board.page';
import { CardsSection } from './sections/cards/cards.section';
import { CardsSkeletonComponent } from './sections/cards/components/cards-skeleton/cards-skeleton.component';
import { PeopleCardComponent } from './sections/cards/components/people-card/people-card.section';
import { StarshipCardComponent } from './sections/cards/components/starship-card/starship-card.section';
import { GameBoardService } from './services/game-board.service';
import { GameBoardFacade } from './store/game-board.facade';
import { GameBoardRepository } from './store/game-board.repository';
import { GameBoardState } from './store/game-board.store';

@NgModule({
  declarations: [
    GameBoardLayout,
    GameBoardPage,
    CardsSection,
    PeopleCardComponent,
    StarshipCardComponent,
    CardsSkeletonComponent,
    GameResultsDialog,
  ],
  imports: [
    CommonModule,
    NgxsModule.forFeature([GameBoardState]),
    RouterModule.forChild(gameBoardRoutes),
    FormsModule,
    MatInputModule,
    InputComponent,
    TranslateModule,
    MatTabsModule,
    MatCardModule,
    MatDialogModule,
    LayoutHeaderComponent,
    ButtonComponent,
    NgxSkeletonLoaderModule,
  ],
  providers: [
    GameBoardRepository,
    GameBoardFacade,
    GameWizardFacade,
    GameBoardService,
  ],
})
export class GameBoardModule {}
