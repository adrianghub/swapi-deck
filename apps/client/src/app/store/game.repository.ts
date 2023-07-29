import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'apps/client/src/environments/environment';
import { Observable } from 'rxjs';
import {
  SwapiApiDto,
  SwapiPersonDto,
  SwapiStarshipDto,
} from '../modules/game-board/models/swapi.dto';
import { SwapiParamsType } from '../modules/game-board/models/swapi.model';

@Injectable()
export class GameRepository {
  getSwapiData({
    type,
    url,
  }: SwapiParamsType): Observable<
    SwapiApiDto<SwapiPersonDto | SwapiStarshipDto>
  > {
    return this.http.get<SwapiApiDto<SwapiPersonDto | SwapiStarshipDto>>(
      url ? url : `${environment.swapiApiUrl}/${type}`
    );
  }

  constructor(private http: HttpClient) {}
}
