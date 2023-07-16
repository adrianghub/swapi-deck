import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'apps/client/src/environments/environment';
import { Observable } from 'rxjs';
import {
  SwapiApiDto,
  SwapiPersonDto,
  SwapiStarshipDto,
} from '../models/swapi.dto';

@Injectable()
export class GameBoardRepository {
  getSwapiPeople(url?: string): Observable<SwapiApiDto<SwapiPersonDto>> {
    return this.http.get<SwapiApiDto<SwapiPersonDto>>(
      url ?? `${environment.swapiApiUrl}/people`
    );
  }

  getSwapiStarships(url?: string): Observable<SwapiApiDto<SwapiStarshipDto>> {
    return this.http.get<SwapiApiDto<SwapiStarshipDto>>(
      url ?? `${environment.swapiApiUrl}/starships`
    );
  }

  constructor(private http: HttpClient) {}
}
