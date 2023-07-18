import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { NgxsModule } from '@ngxs/store';
import { LayoutHeaderComponent } from '../../core/layouts/components/layout-header/layout-header.component';
import { ButtonComponent } from '../../shared/ui/atoms/button/button.component';
import { InputComponent } from '../../shared/ui/atoms/input/input.component';
import { GameWizardFacade } from '../game-wizard/store/game-wizard.facade';
import { gameBoardRoutes } from './game-board.routes';
import { GameBoardLayout } from './layouts/game-board/game-board.layout';
import { GameBoardPage } from './pages/game-board.page';
import { CardsSection } from './sections/cards/cards.section';
import { PeopleCardComponent } from './sections/cards/components/people-card/people-card.section';
import { StarshipCardComponent } from './sections/cards/components/starship-card/starship-card.section';
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
    LayoutHeaderComponent,
    ButtonComponent,
  ],
  providers: [GameBoardRepository, GameBoardFacade, GameWizardFacade],
})
export class GameBoardModule {}
