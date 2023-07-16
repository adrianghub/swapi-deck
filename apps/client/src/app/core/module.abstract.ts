import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TranslateLoader, TranslateService } from '@ngx-translate/core';
import { MultiTranslateHttpLoader } from './i18n/multi-loader';

@Injectable()
export abstract class Module {
  protected constructor(protected translateService: TranslateService) {
    this.langReload();
  }

  private langReload(): void {
    const currentLang = this.translateService.currentLang || 'en';

    this.translateService.currentLang = '';
    this.translateService.use(currentLang);
  }
}

export const configTranslateModule = (resources: string[]) => {
  return {
    loader: {
      provide: TranslateLoader,
      useFactory: (http: HttpBackend) =>
        MultiHttpLoaderFactory(http, resources),
      deps: [HttpBackend],
    },
    isolate: false,
    extend: true,
  };
};

export function MultiHttpLoaderFactory(
  handler: HttpBackend,
  resources: string[]
) {
  const http = new HttpClient(handler);

  return new MultiTranslateHttpLoader(http, './assets/i18n', resources);
}
