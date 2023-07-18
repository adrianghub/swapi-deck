import { Component, Input } from '@angular/core';
import { SwapiStarshipDto } from '../../../../models/swapi.dto';

@Component({
  selector: 'sdeck-starship-card',
  template: ` <mat-card class="example-card">
    <mat-card-header>
      <div mat-card-avatar class="example-header-image"></div>
      <mat-card-title>{{ card.name }}</mat-card-title>
      <mat-card-subtitle>{{ card.MGLT }}</mat-card-subtitle>
    </mat-card-header>
    <mat-card-content>
      <p>
        The Shiba Inu is the smallest of the six original and distinct spitz
        breeds of dog from Japan. A small, agile dog that copes very well with
        mountainous terrain, the Shiba Inu was originally bred for hunting.
      </p>
    </mat-card-content>
    <mat-card-actions>
      <button mat-button>LIKE</button>
      <button mat-button>SHARE</button>
    </mat-card-actions>
  </mat-card>`,
  styleUrls: ['./starship-card.section.scss'],
})
export class StarshipCardComponent {
  @Input({ required: true }) card!: SwapiStarshipDto;
}
