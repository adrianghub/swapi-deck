import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CardsType } from 'apps/client/src/app/shared/models/game.model';
import { Observable, map, take } from 'rxjs';
import { SwapiPersonDto, SwapiStarshipDto } from '../../models/swapi.dto';
import { SwapiPerson, SwapiStarship } from '../../models/swapi.model';
import { shuffleCards } from './cards.utils';

@Component({
  selector: 'sdeck-cards',
  template: `<ng-container *ngIf="loading$ | async; else cards">
      <sdeck-cards-skeleton data-cy="cards-skeleton" />
    </ng-container>

    <ng-template #cards>
      <ng-container *ngFor="let card of cards$ | async as cards">
        <sdeck-game-card
          class="card"
          [card]="card"
          [class.selected]="isSelected(card) | async"
          (click)="selectCard(card)"
          data-cy="game-card"
        />
      </ng-container>
    </ng-template> `,
  styleUrls: ['./cards.section.scss'],
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
