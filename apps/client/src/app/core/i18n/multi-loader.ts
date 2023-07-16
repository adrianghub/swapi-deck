import { HttpClient } from '@angular/common/http';
import { TranslateLoader } from '@ngx-translate/core';
import { forkJoin, map, Observable } from 'rxjs';

interface Translation {
  [key: string]: unknown;
}

export class MultiTranslateHttpLoader implements TranslateLoader {
  constructor(
    private http: HttpClient,
    private path: string,
    public resources: string[]
  ) {}

  public getTranslation(lang: string): Observable<Translation> {
    return forkJoin(
      this.resources.map((path) => {
        return this.http.get<Translation>(`${this.path}/${lang}/${path}.json`);
      })
    ).pipe(map((response) => response.reduce((a, b) => Object.assign(a, b))));
  }
}
