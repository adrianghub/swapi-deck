import { Component, Input } from '@angular/core';
import { SwapiStarshipDto } from '../../../../models/swapi.dto';

@Component({
  selector: 'sdeck-starship-card',
  template: `
    <mat-card class="example-card">
      <mat-card-header>
        <mat-card-title>{{ card.name }}</mat-card-title>
        <mat-card-subtitle>{{ card.MGLT }}</mat-card-subtitle>
      </mat-card-header>

      <div class="placeholder-box"></div>
    </mat-card>
  `,
  styleUrls: ['./starship-card.section.scss'],
})
export class StarshipCardComponent {
  @Input({ required: true }) card!: SwapiStarshipDto;
}
