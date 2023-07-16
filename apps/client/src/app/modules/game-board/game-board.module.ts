import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { NgxsModule } from '@ngxs/store';
import { GameBoardPage } from './pages/game-board.page';
import { GameBoardFacade } from './store/game-board.facade';
import { GameBoardRepository } from './store/game-board.repository';
import { GameBoardState } from './store/game-board.store';

@NgModule({
  declarations: [GameBoardPage],
  imports: [
    CommonModule,
    NgxsModule.forFeature([GameBoardState]),
    MatButtonModule,
  ],
  providers: [GameBoardRepository, GameBoardFacade],
})
export class GameBoardModule {}
