import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'sdeck-game-wizard-layout',
  templateUrl: 'game-wizard.layout.html',
  styleUrls: ['./game-wizard.layout.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameWizardLayout {
  @Input({ required: true }) headline!: string;
}
