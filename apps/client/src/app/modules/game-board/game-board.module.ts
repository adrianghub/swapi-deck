import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { GameBoardState } from './store/game-board.store';

@NgModule({
  declarations: [],
  imports: [CommonModule, NgxsModule.forFeature([GameBoardState])],
})
export class GameBoardModule {}
