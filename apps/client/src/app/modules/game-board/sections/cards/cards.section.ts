import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { Observable, map, take } from 'rxjs';
import { shuffleCards } from './cards.utils';
import { CardsType } from '@/shared/models/game.model';
import { SwapiStarshipDto, SwapiPersonDto } from '../../models/swapi.dto';
import { SwapiPerson, SwapiStarship } from '../../models/swapi.model';

@Component({
  selector: 'sdeck-cards',
  templateUrl: './cards.section.html',
  styleUrls: ['./cards.section.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardsSection implements OnInit {
  @Input({ required: true }) cards$!: Observable<
    (SwapiStarshipDto | SwapiPersonDto)[]
  >;
  @Input({ required: true }) loading$!: Observable<boolean>;
  @Input({ required: true }) type!: CardsType;
  @Input({ required: true }) selectedCards$!: Observable<
    Map<string, SwapiPerson | SwapiStarship>
  >;

  @Output() selected = new EventEmitter<SwapiPersonDto | SwapiStarshipDto>();

  ngOnInit() {
    this.cards$ = this.cards$.pipe(map((cards) => shuffleCards(cards)));
  }

  protected selectCard(card: SwapiStarshipDto | SwapiPersonDto) {
    this.selectedCards$.pipe(take(1)).subscribe((selectedCards) => {
      if (!selectedCards?.has(card.url)) {
        this.selected.emit(card);
      }
    });
  }

  protected isSelected(
    card: SwapiStarshipDto | SwapiPersonDto
  ): Observable<boolean> {
    return this.selectedCards$.pipe(
      take(1),
      map((selectedCards) => selectedCards?.has(card.url))
    );
  }
}
