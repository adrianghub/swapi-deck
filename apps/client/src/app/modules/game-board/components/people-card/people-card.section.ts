import { Component, Input } from '@angular/core';
import { SwapiPerson } from '../../models/swapi.model';

@Component({
  selector: 'sdeck-people-card',
  template: ` <mat-card class="example-card">
    <mat-card-header>
      <mat-card-title>{{ card.name }}</mat-card-title>
      <mat-card-subtitle>{{ card.gender }}</mat-card-subtitle>
    </mat-card-header>

    <div class="placeholder-box"></div>
  </mat-card>`,
  styleUrls: ['./people-card.section.scss'],
})
export class PeopleCardComponent {
  @Input({ required: true }) card!: SwapiPerson;
}
