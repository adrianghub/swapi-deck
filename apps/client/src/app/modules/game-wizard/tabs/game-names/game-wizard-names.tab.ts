import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscribable } from 'apps/client/src/app/core/subscribable.abstract';
import { take } from 'rxjs';
import { GameWizardFacade } from '../../store/game-wizard.facade';
import { PlayersState } from '../../store/game-wizard.store';
import { sameValueValidator } from '../../validators/sameValue.validator';

export interface PlayersNamesValues {
  playerOne: FormControl<string>;
  playerTwo: FormControl<string>;
}

@Component({
  selector: 'sdeck-game-names',
  template: `
    <sdeck-game-wizard-layout
      [headline]="'game.wizard.names.headline' | translate"
    >
      <form [formGroup]="playersForm" class="input-container">
        <sdeck-input
          [control]="playerOne"
          [label]="'game.wizard.names.playerOne' | translate"
          [readonly]="isReadOnly('playerOne')"
          (cleared)="unsetPlayerName('playerOne')"
          [focus]="true"
        ></sdeck-input>

        <sdeck-input
          [control]="playerTwo"
          [label]="'game.wizard.names.playerTwo' | translate"
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

  currentPlayers: PlayersState | undefined;

  private gameWizardFacade = inject(GameWizardFacade);
  protected router = inject(Router);

  ngOnInit() {
    this.subs.push(
      this.gameWizardFacade.players$.pipe(take(1)).subscribe((players) => {
        if (players?.playerOne && players?.playerTwo) {
          this.playerOne.setValue(players.playerOne.name);
          this.playerTwo.setValue(players.playerTwo.name);

          this.currentPlayers = players;

          this.setReadOnly('playerOne', true);
          this.setReadOnly('playerTwo', true);
        }
      })
    );
  }

  protected goToNextStep($event: MouseEvent) {
    $event.stopPropagation();

    if (!this.playersForm.invalid) {
      const players: PlayersState = {
        playerOne: {
          ...this.currentPlayers?.playerOne,
          name: this.playerOne.value.trim(),
          score: 0,
        },
        playerTwo: {
          ...this.currentPlayers?.playerTwo,
          name: this.playerTwo.value.trim(),
          score: 0,
        },
      };

      this.gameWizardFacade.updatePlayers(players);

      this.router.navigateByUrl('wizard/cards-type');
    }
  }

  protected isReadOnly(player: keyof PlayersNamesValues): boolean {
    return this.readonlyFields[player];
  }

  private setReadOnly(player: keyof PlayersNamesValues, value: boolean): void {
    this.readonlyFields = {
      ...this.readonlyFields,
      [player]: value,
    };
  }

  protected unsetPlayerName(player: keyof PlayersNamesValues) {
    this.setReadOnly(player, false);
  }
}
