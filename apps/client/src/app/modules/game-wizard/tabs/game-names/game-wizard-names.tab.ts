import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { links } from 'apps/client/src/app/shared/constants/game.constants';
import { take } from 'rxjs';
import { GameWizardFacade } from '../../store/game-wizard.facade';
import { PlayersState } from '../../store/game-wizard.store';
import { sameValueValidator } from '../../validators/sameValues.validator';

export interface PlayersNamesValues {
  playerOne: FormControl<string>;
  playerTwo: FormControl<string>;
}

@Component({
  selector: 'sdeck-game-names',
  templateUrl: './game-wizard-names.tab.html',
  styleUrls: ['./game-wizard-names.tab.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameWizardNamesTab implements OnInit {
  protected playersForm = new FormGroup<PlayersNamesValues>(
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

  protected get playerOne() {
    return this.playersForm.controls.playerOne;
  }

  protected get playerTwo() {
    return this.playersForm.controls.playerTwo;
  }

  private readonlyFields: { [key: string]: boolean } = {
    playerOne: false,
    playerTwo: false,
  };

  private currentPlayers: PlayersState | undefined;

  private gameWizardFacade = inject(GameWizardFacade);
  protected router = inject(Router);

  ngOnInit() {
    this.gameWizardFacade.players$.pipe(take(1)).subscribe((players) => {
      if (players?.playerOne?.name && players?.playerTwo?.name) {
        this.playerOne.setValue(players.playerOne.name);
        this.playerTwo.setValue(players.playerTwo.name);

        this.currentPlayers = players;

        this.setReadOnly('playerOne', true);
        this.setReadOnly('playerTwo', true);
      }
    });
  }

  protected goToNextStep() {
    if (!this.playersForm.invalid) {
      const players: PlayersState = {
        playerOne: {
          ...this.currentPlayers?.playerOne,
          name: this.playerOne.value.trim(),
          score: this.currentPlayers?.playerOne.score || 0,
        },
        playerTwo: {
          ...this.currentPlayers?.playerTwo,
          name: this.playerTwo.value.trim(),
          score: this.currentPlayers?.playerTwo.score || 0,
        },
      };

      this.gameWizardFacade.updatePlayers(players);

      this.router.navigateByUrl(links.wizard.cardsType);
    }
  }

  protected isReadOnly(player: keyof PlayersNamesValues): boolean {
    return this.readonlyFields[player];
  }

  protected setReadOnly(
    player: keyof PlayersNamesValues,
    value: boolean
  ): void {
    this.readonlyFields = {
      ...this.readonlyFields,
      [player]: value,
    };
  }

  protected unsetPlayerName(player: keyof PlayersNamesValues) {
    this.setReadOnly(player, false);

    const players = {} as PlayersState;

    players[player] = {
      name: '',
      score: players[player]?.score || 0,
    };

    this.gameWizardFacade.updatePlayers(players);
  }
}
