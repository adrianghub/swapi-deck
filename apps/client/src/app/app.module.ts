import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import {
  excludeKeys,
  localStorageStrategy,
  persistState,
} from '@ngneat/elf-persist-state';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import { CoreModule } from './core/core.module';
import {
  CustomTranslateModule,
  configTranslateModule,
} from './core/module.abstract';
import { gameStore } from './store/game.store';

persistState(gameStore, {
  key: 'game',
  storage: localStorageStrategy,
  source: () =>
    gameStore.pipe(
      excludeKeys([
        'loading',
        'errorMessage',
        'peopleCardsData',
        'starshipsCardsData',
        'page',
        'selectedCards',
        'nextTurn',
        'winner',
      ])
    ),
});

@NgModule({
  declarations: [AppComponent],
  imports: [
    CoreModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes, { initialNavigation: 'enabledBlocking' }),
    TranslateModule.forRoot(configTranslateModule(['misc'])),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule extends CustomTranslateModule {
  constructor(override translateService: TranslateService) {
    super(translateService);
  }
}
