import { Component, Input } from '@angular/core';
import { DialogData } from 'apps/client/src/app/shared/ui/organisms/dialog/dialog.component';
import { SwapiPersonDto, SwapiStarshipDto } from '../../models/swapi.dto';

@Component({
  selector: 'sdeck-game-results',
  template: `<p>game-results works!</p>`,
  styleUrls: ['./game-results.dialog.scss'],
})
export class GameResultsDialog {
  @Input() data!: DialogData<SwapiPersonDto | SwapiStarshipDto, boolean>;
}
