import { Component, OnInit, inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscribable } from 'apps/client/src/app/core/subscribable.abstract';
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
          (click)="goToNextStep($event)"
          [disabled]="cardsTypeControl.invalid"
        />
      </ng-container>
    </sdeck-game-wizard-layout>
  `,
})
export class GameWizardCardsTypeTab extends Subscribable implements OnInit {
  protected router = inject(Router);
  protected gameWizardFacade = inject(GameWizardFacade);

  cardsTypeControl = new FormControl<CardsType | null>(
    null,
    Validators.required
  );
  cardsTypes = cardsTypes;

  ngOnInit() {
    this.subs.push(
      this.gameWizardFacade.cardsType$.pipe(take(1)).subscribe((cardsType) => {
        this.cardsTypeControl.setValue(cardsType);
      }),
      this.cardsTypeControl.valueChanges.subscribe((cardsType) => {
        if (!this.cardsTypeControl.invalid && cardsType) {
          this.gameWizardFacade.updateCardsType(cardsType);
        }
      })
    );
  }

  goToNextStep($event: Event): void {
    $event.stopPropagation();

    if (!this.cardsTypeControl.invalid) {
      this.router.navigateByUrl('game-board');
    }
  }
}
