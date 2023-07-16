import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { GameLayoutComponent } from './layouts/game-layout/game-layout.component';
import { MainMenuPage } from './pages/main-menu/main-menu.page';

@NgModule({
  declarations: [MainMenuPage, GameLayoutComponent],
  imports: [CommonModule, TranslateModule, RouterModule],
})
export class CoreModule {}
