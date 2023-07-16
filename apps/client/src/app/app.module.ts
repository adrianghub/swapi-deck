import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import { Module, configTranslateModule } from './core/module.abstract';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes, { initialNavigation: 'enabledBlocking' }),
    TranslateModule.forRoot(configTranslateModule(['misc'])),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule extends Module {
  constructor(override translateService: TranslateService) {
    super(translateService);
  }
}
