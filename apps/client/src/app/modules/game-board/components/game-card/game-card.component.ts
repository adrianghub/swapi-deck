import { Component, Input } from '@angular/core';
import { SwapiPersonDto, SwapiStarshipDto } from '../../models/swapi.dto';
import { isSwapiPerson, isSwapiStarship } from '../../pages/game-board.utils';

@Component({
  selector: 'sdeck-game-card',
  template: `<sdeck-people-card *ngIf="isSwapiPerson(card)" [card]="card">
      <div placeholder class="placeholder-box" [class.hight-box]="preview">
        <ng-content select="[placeholder-content]" /></div
    ></sdeck-people-card>
    <sdeck-starship-card *ngIf="isSwapiStarship(card)" [card]="card">
      <div
        placeholder
        class="placeholder-box"
        [class.hight-box]="preview"
      ></div>
    </sdeck-starship-card>`,
  styleUrls: ['./game-card.component.scss'],
})
export class GameCardComponent {
  @Input() card!: SwapiPersonDto | SwapiStarshipDto;
  @Input() preview = false;
  @Input() winnerCard = false;

  isSwapiPerson = isSwapiPerson;
  isSwapiStarship = isSwapiStarship;
}
