import { Component, OnInit, inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { CardsType } from '@/shared/models/game.model';
import { GameFacade } from '@/store/game.facade';
import { cardsTypes, links } from '@/shared/constants/game.constants';

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

  protected router = inject(Router);
  protected gameFacade = inject(GameFacade);

  ngOnInit() {
    this.gameFacade.cardsType$.pipe(take(1)).subscribe((cardsType) => {
      this.cardsTypeControl.setValue(cardsType);
    });
  }

  navigateToNextStep() {
    if (this.cardsTypeControl.valid && this.cardsTypeControl.value) {
      this.gameFacade.updateCardsType(this.cardsTypeControl.value);

      this.router.navigateByUrl(links.board.gameBoard);
    }
  }
}
