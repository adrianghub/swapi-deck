import { Component, Input } from '@angular/core';
import { SwapiPersonDto, SwapiStarshipDto } from '../../models/swapi.dto';
import { isSwapiPerson, isSwapiStarship } from '../../pages/game-board.utils';

@Component({
  selector: 'sdeck-game-card',
  template: `
    <ng-container *ngIf="isSwapiPerson(card)">
      <sdeck-card
        [customPlaceholderWidth]="customPlaceholderWidth"
        [fitPlaceholderContent]="fitPlaceholderContent"
        [title]="card.name"
        [subtitle]="card.gender"
      >
        <ng-content placeholder-content select="[placeholder-content-person]"
      /></sdeck-card>
    </ng-container>

    <ng-container *ngIf="isSwapiStarship(card)">
      <sdeck-card
        [customPlaceholderWidth]="customPlaceholderWidth"
        [fitPlaceholderContent]="fitPlaceholderContent"
        [title]="card.name"
        [subtitle]="card.model"
      >
        <ng-content
          placeholder-content
          select="[placeholder-content-starship]"
        />
      </sdeck-card>
    </ng-container>
  `,
  styleUrls: ['./game-card.component.scss'],
})
export class GameCardComponent {
  @Input() card!: SwapiPersonDto | SwapiStarshipDto;
  @Input() customPlaceholderWidth!: string;
  @Input() fitPlaceholderContent = false;

  isSwapiPerson = isSwapiPerson;
  isSwapiStarship = isSwapiStarship;
}
