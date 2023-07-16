import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'sdeck-game-names',
  template: `
    <h2 class="semi-bold-headline-medium headline">
      What areaokawodkaodka adoawkoak oa oawkdwao?
    </h2>

    <div class="input-container">
      <sdeck-input [control]="value1" [label]="'' | translate"></sdeck-input>

      <sdeck-input [control]="value2" [label]="'' | translate"></sdeck-input>
    </div>
  `,
  styleUrls: ['./game-wizard-names.tab.scss'],
})
export class GameWizardNamesTab {
  value1 = new FormControl('', [Validators.required]);
  value2 = new FormControl('', [Validators.required]);
}
