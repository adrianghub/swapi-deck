import { Component, Input, inject } from '@angular/core';
import { SwapiPerson, SwapiStarship } from '../../models/swapi.model';
import { isSwapiPerson, isSwapiStarship } from '../../pages/game-board.utils';
import {
  getSwapiPerson,
  getSwapiStarship,
} from '@/shared/constants/game.constants';
import { DialogData } from '@/shared/ui/organisms/dialog/dialog.component';
import { GameFacade } from '@/store/game.facade';

@Component({
  selector: 'sdeck-game-result',
  templateUrl: './game-result.dialog.html',
  styleUrls: ['./game-result.dialog.scss'],
})
export class GameResultsDialog {
  @Input() data!: DialogData<SwapiPerson[] | SwapiStarship[], boolean>;
  winningAttr!: 'mass' | 'crew';

  protected gameFacade = inject(GameFacade);

  winner$ = this.gameFacade.winner$;

  isSwapiPerson = isSwapiPerson;
  isSwapiStarship = isSwapiStarship;

  getCardAttributes(
    card: SwapiPerson | SwapiStarship
  ): SwapiPerson | SwapiStarship {
    if (isSwapiPerson(card)) {
      this.winningAttr = 'mass';
      return getSwapiPerson(card);
    }

    this.winningAttr = 'crew';
    return getSwapiStarship(card);
  }
}
