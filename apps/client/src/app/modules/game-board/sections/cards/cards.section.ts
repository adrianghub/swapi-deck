import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CardsType } from 'apps/client/src/app/shared/models/game.model';
import { Observable, map, take } from 'rxjs';
import { SwapiPersonDto, SwapiStarshipDto } from '../../models/swapi.dto';
import { Subscribable } from 'apps/client/src/app/core/subscribable.abstract';

@Component({
  selector: 'sdeck-cards',
  template: `
    <ng-container *ngIf="loading$ | async; else cards">
      <sdeck-cards-skeleton />
    </ng-container>

    <ng-template #cards>
      <ng-container *ngFor="let card of cards$ | async as cards">
        <sdeck-people-card
          class="card"
          *ngIf="isPersonType(card)"
          [card]="card"
          (click)="selectCard(card)"
          [class.selected]="isSelected(card) | async"
        />
        <sdeck-starship-card
          class="card"
          *ngIf="isStarshipType(card)"
          [card]="card"
          (click)="selectCard(card)"
        />
      </ng-container>
    </ng-template>
  `,
  styleUrls: ['./cards.section.scss'],
})
export class CardsSection extends Subscribable {
  @Input({ required: true }) cards$!: Observable<
    (SwapiStarshipDto | SwapiPersonDto)[]
  >;
  @Input() selectedCards$!: Observable<
    Map<string, SwapiPersonDto | SwapiStarshipDto>
  >;
  @Input({ required: true }) loading$!: Observable<boolean>;
  @Input({ required: true }) type!: CardsType;

  @Output() selected = new EventEmitter<SwapiPersonDto | SwapiStarshipDto>();

  private maxSelectedCards = 2;

  protected isPersonType(
    card: SwapiStarshipDto | SwapiPersonDto
  ): card is SwapiPersonDto {
    return this.type === 'people' && 'height' in card;
  }

  protected isStarshipType(
    card: SwapiStarshipDto | SwapiPersonDto
  ): card is SwapiStarshipDto {
    return this.type === 'starships' && !('height' in card);
  }

  protected selectCard(card: SwapiStarshipDto | SwapiPersonDto) {
    this.subs.push(
      this.selectedCards$.pipe(take(1)).subscribe((selectedCards) => {
        if (
          selectedCards.size < this.maxSelectedCards ||
          selectedCards.has(card.url)
        ) {
          this.selected.emit(card);
        }
      })
    );
  }

  protected isSelected(
    card: SwapiStarshipDto | SwapiPersonDto
  ): Observable<boolean> {
    return this.selectedCards$.pipe(
      take(1),
      map((selectedCards) => selectedCards.has(card.url))
    );
  }
}
