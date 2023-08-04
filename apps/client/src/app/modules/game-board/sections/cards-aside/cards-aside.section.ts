import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { SwapiPerson, SwapiStarship } from '../../models/swapi.model';
import { PlayerPosition } from '@/shared/models/game.model';
import { PlayersState } from '@/store/game.store';

@Component({
  selector: 'sdeck-cards-aside',
  templateUrl: './cards-aside.section.html',
  styleUrls: ['./cards-aside.section.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardsAsideSection {
  @Input() nextTurn!: PlayerPosition;
  @Input() players!: PlayersState | undefined;
  @Input({ required: true }) selectedCards$!: Observable<
    Map<string, SwapiPerson | SwapiStarship>
  >;
}
