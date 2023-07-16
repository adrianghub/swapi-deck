import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscribable } from 'apps/client/src/app/core/subscribable.abstract';
import { take } from 'rxjs';
import { GameWizardFacade } from '../../store/game-wizard.facade';
import { PlayersPayload } from '../../store/game-wizard.store';
import { sameValueValidator } from '../../validators/sameValue.validator';

export interface PlayersNamesValues {
  playerOne: FormControl<string>;
  playerTwo: FormControl<string>;
}

@Component({
  selector: 'sdeck-game-names',
  template: `
    <sdeck-game-wizard-layout>
      <h2 class="semi-bold-headline-medium headline">
        What areaokawodkaodka adoawkoak oa oawkdwao?
      </h2>

      <form [formGroup]="playersForm" class="input-container">
        <sdeck-input
          [control]="playerOne"
          [label]="'game.wizard.names.player1' | translate"
          [readonly]="isReadOnly('playerOne')"
          (cleared)="unsetPlayerName('playerOne')"
        ></sdeck-input>

        <sdeck-input
          [control]="playerTwo"
          [label]="'game.wizard.names.player2' | translate"
          [readonly]="isReadOnly('playerTwo')"
          (cleared)="unsetPlayerName('playerTwo')"
        ></sdeck-input>
      </form>

      <ng-container actions>
        <sdeck-button
          type="primary"
          [label]="'game.wizard.actions.mainMenu' | translate"
          (click)="router.navigateByUrl('')"
          prefixIcon="arrow-left"
        ></sdeck-button>

        <sdeck-button
          type="primary"
          [label]="'game.wizard.actions.nextStep' | translate"
          (click)="goToNextStep($event)"
          suffixIcon="arrow-right"
          [disabled]="playersForm.invalid"
        ></sdeck-button>
      </ng-container>
    </sdeck-game-wizard-layout>
  `,
  styleUrls: ['./game-wizard-names.tab.scss'],
})
export class GameWizardNamesTab extends Subscribable implements OnInit {
  playersForm = new FormGroup<PlayersNamesValues>(
    {
      playerOne: new FormControl('', {
        nonNullable: true,
        validators: [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(16),
        ],
      }),
      playerTwo: new FormControl('', {
        nonNullable: true,
        validators: [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(16),
        ],
      }),
    },
    { validators: [sameValueValidator] }
  );

  get playerOne() {
    return this.playersForm.controls.playerOne;
  }

  get playerTwo() {
    return this.playersForm.controls.playerTwo;
  }

  readonlyFields: { [key: string]: boolean } = {
    playerOne: false,
    playerTwo: false,
  };

  ngOnInit() {
    this.subs.push(
      this.gameWizardFacade.players$.pipe(take(1)).subscribe((players) => {
        if (players?.playerOne && players?.playerTwo) {
          this.playerOne.setValue(players.playerOne);
          this.playerTwo.setValue(players.playerTwo);

          this.setReadOnly('playerOne', true);
          this.setReadOnly('playerTwo', true);
        }
      })
    );
  }

  goToNextStep($event: MouseEvent) {
    $event.stopPropagation();

    if (!this.playersForm.invalid) {
      const players: PlayersPayload = {
        playerOne: this.playerOne.value.trim(),
        playerTwo: this.playerTwo.value.trim(),
      };

      this.gameWizardFacade.updatePlayersNames(players);

      this.router.navigateByUrl('wizard/cards-type');
    }
  }

  isReadOnly(player: keyof PlayersNamesValues): boolean {
    return this.readonlyFields[player];
  }

  setReadOnly(player: keyof PlayersNamesValues, value: boolean): void {
    this.readonlyFields = {
      ...this.readonlyFields,
      [player]: value,
    };
  }

  unsetPlayerName(player: keyof PlayersNamesValues) {
    const payload: PlayersPayload = {} as PlayersPayload;

    payload[player] = '';
    this.gameWizardFacade.updatePlayersNames(payload);

    this.setReadOnly(player, false);
  }

  protected router = inject(Router);
  protected gameWizardFacade = inject(GameWizardFacade);
}
