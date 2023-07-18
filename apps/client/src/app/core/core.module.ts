import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { BaseLayout } from './layouts/base.layout';
import {
  CustomTranslateModule,
  configTranslateModule,
} from './module.abstract';
import { MainMenuPage } from './pages/main-menu/main-menu.page';

import { MatDividerModule } from '@angular/material/divider';
import { ButtonComponent } from '../shared/ui/atoms/button/button.component';
import { GameWizardFacade } from '../modules/game-wizard/store/game-wizard.facade';

@NgModule({
  declarations: [MainMenuPage, BaseLayout],
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule.forChild(configTranslateModule(['misc'])),
    MatDividerModule,
    ButtonComponent,
  ],
  providers: [GameWizardFacade],
})
export class CoreModule extends CustomTranslateModule {
  constructor(override translateService: TranslateService) {
    super(translateService);
  }
}
