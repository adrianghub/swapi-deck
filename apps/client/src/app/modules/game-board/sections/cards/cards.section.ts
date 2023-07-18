import { Component, Input } from '@angular/core';
import { CardsType } from 'apps/client/src/app/shared/models/game.model';
import { Observable } from 'rxjs';
import { SwapiPersonDto, SwapiStarshipDto } from '../../models/swapi.dto';

@Component({
  selector: 'sdeck-cards',
  template: `
    <ng-container *ngIf="loading$ | async; else cards">
      loading...
    </ng-container>

    <ng-template #cards>
      <ng-container *ngFor="let card of cards$ | async as cards">
        <sdeck-people-card
          class="card"
          *ngIf="isPersonType(card)"
          [card]="card"
        />
        <sdeck-starship-card
          class="card"
          *ngIf="isStarshipType(card)"
          [card]="card"
        />
      </ng-container>
    </ng-template>
  `,
  styleUrls: ['./cards.section.scss'],
})
export class CardsSection {
  @Input({ required: true }) cards$!: Observable<
    (SwapiStarshipDto | SwapiPersonDto)[]
  >;
  @Input({ required: true }) loading$!: Observable<boolean>;
  @Input({ required: true }) type!: CardsType;

  isPersonType(
    card: SwapiStarshipDto | SwapiPersonDto
  ): card is SwapiPersonDto {
    return this.type === 'people' && 'height' in card;
  }

  isStarshipType(
    card: SwapiStarshipDto | SwapiPersonDto
  ): card is SwapiStarshipDto {
    return this.type === 'starships' && !('height' in card);
  }
}
