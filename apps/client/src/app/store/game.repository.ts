import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'apps/client/src/environments/environment';
import { Observable } from 'rxjs';
import {
  SwapiApiDto,
  SwapiPersonDto,
  SwapiStarshipDto,
} from '../modules/game-board/models/swapi.dto';
import { SwapiParams } from '../modules/game-board/models/swapi.model';
import { CardsType } from '../shared/models/game.model';

@Injectable()
export class GameRepository {
  getSwapiData({
    type,
    url,
  }: SwapiParams): Observable<SwapiApiDto<SwapiPersonDto | SwapiStarshipDto>> {
    return this.http.get<SwapiApiDto<SwapiPersonDto | SwapiStarshipDto>>(
      url ? url : `${environment.swapiApiUrl}/${type as CardsType}`
    );
  }

  constructor(private http: HttpClient) {}
}
