import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CardsType } from 'apps/client/src/app/shared/models/game.model';
import { take } from 'rxjs';
import { cardsTypes, links } from '../../../../shared/constants/game.constants';
import { GameWizardFacade } from '../../store/game-wizard.facade';

@Component({
  selector: 'sdeck-game-cards-type',
  templateUrl: 'game-wizard-cards-type.tab.html',
})
export class GameWizardCardsTypeTab implements OnInit {
  cardsTypeControl = new FormControl<CardsType | null>(
    null,
    Validators.required
  );
  cardsTypes = cardsTypes;
  links = links;

  private destroyRef = inject(DestroyRef);
  protected router = inject(Router);
  protected gameWizardFacade = inject(GameWizardFacade);

  ngOnInit() {
    this.gameWizardFacade.cardsType$.pipe(take(1)).subscribe((cardsType) => {
      this.cardsTypeControl.setValue(cardsType);
    });
    this.cardsTypeControl.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((cardsType) => {
        if (!this.cardsTypeControl.invalid && cardsType) {
          this.gameWizardFacade.updateCardsType(cardsType);
        }
      });
  }
}
