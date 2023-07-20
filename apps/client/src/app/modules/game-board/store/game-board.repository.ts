import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'apps/client/src/environments/environment';
import { Observable } from 'rxjs';
import {
  SwapiApiDto,
  SwapiPersonDto,
  SwapiStarshipDto,
} from '../models/swapi.dto';
import { SwapiParamsType } from '../models/swapi.model';

@Injectable()
export class GameBoardRepository {
  getSwapiData(
    params: SwapiParamsType
  ): Observable<SwapiApiDto<SwapiPersonDto | SwapiStarshipDto>> {
    return this.http.get<SwapiApiDto<SwapiPersonDto | SwapiStarshipDto>>(
      params.url ? params.url : `${environment.swapiApiUrl}/${params.type}`
    );
  }

  constructor(private http: HttpClient) {}
}
