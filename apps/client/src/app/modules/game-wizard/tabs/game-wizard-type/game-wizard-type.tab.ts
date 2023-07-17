import { Component, OnInit, inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { CardsType } from 'apps/client/src/app/shared/models/game.model';
import { take } from 'rxjs';
import { GameWizardFacade } from '../../store/game-wizard.facade';
import { cardsTypes } from './../../../../shared/constants/game.constants';

@Component({
  selector: 'sdeck-game-names',
  template: `
    <sdeck-game-wizard-layout
      [headline]="'game.wizard.cardType.headline' | translate"
    >
      <sdeck-select
        [control]="cardsTypeControl"
        [options]="cardsTypes"
        [label]="'game.wizard.cardType.select.label' | translate"
        (changed)="updateCardsType($event!)"
      />

      <ng-container actions>
        <sdeck-button
          type="primary"
          [label]="'game.wizard.actions.previousStep' | translate"
          (click)="router.navigateByUrl('wizard/names')"
          prefixIcon="arrow-left"
        />

        <sdeck-button
          type="primary"
          [label]="'game.wizard.actions.startGame' | translate"
          (click)="router.navigateByUrl('game-board')"
          suffixIcon="arrow-right"
        />
      </ng-container>
    </sdeck-game-wizard-layout>
  `,
})
export class GameWizardCardsTypeTab implements OnInit {
  protected router = inject(Router);
  protected gameWizardFacade = inject(GameWizardFacade);

  cardsTypeControl = new FormControl<CardsType | null>(null);
  cardsTypes = cardsTypes;

  ngOnInit() {
    this.gameWizardFacade.cardsType$.pipe(take(1)).subscribe((cardsType) => {
      this.cardsTypeControl.setValue(cardsType);
    });
  }

  updateCardsType(cardsType: CardsType): void {
    this.gameWizardFacade.updateCardsType(cardsType);
  }
}
