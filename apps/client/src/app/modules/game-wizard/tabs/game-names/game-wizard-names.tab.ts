import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  links,
  playerMaxNameLength,
  playerMinNameLength,
} from 'apps/client/src/app/shared/constants/game.constants';
import { GameFacade } from 'apps/client/src/app/store/game.facade';
import { Observable, map, take } from 'rxjs';
import { sameValueValidator } from '../../validators/sameValues.validator';

interface PlayersNamesValues {
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
  public playersForm = new FormGroup<PlayersNamesValues>(
    {
      playerOne: new FormControl('', {
        nonNullable: true,
        validators: [
          Validators.required,
          Validators.minLength(playerMinNameLength),
          Validators.maxLength(playerMaxNameLength),
        ],
      }),
      playerTwo: new FormControl('', {
        nonNullable: true,
        validators: [
          Validators.required,
          Validators.minLength(playerMinNameLength),
          Validators.maxLength(playerMaxNameLength),
        ],
      }),
    },
    { validators: [sameValueValidator] }
  );

  public get playerOne() {
    return this.playersForm.controls.playerOne;
  }

  public get playerTwo() {
    return this.playersForm.controls.playerTwo;
  }

  protected gameFacade = inject(GameFacade);
  public router = inject(Router);

  players$!: Observable<{ playerOne: string; playerTwo: string } | undefined>;

  ngOnInit() {
    this.players$ = this.gameFacade.players$.pipe(
      take(1),
      map((players) => ({
        playerOne: players?.playerOne?.name || '',
        playerTwo: players?.playerTwo?.name || '',
      }))
    );

    this.setInitialControlsValues();
  }

  setInitialControlsValues() {
    this.players$.subscribe((players) => {
      if (players?.playerOne && players?.playerTwo) {
        this.playerOne.setValue(players.playerOne);
        this.playerTwo.setValue(players.playerTwo);
      }
    });
  }

  goToNextStep() {
    this.gameFacade.updatePlayerName('playerOne', this.playerOne?.value.trim());
    this.gameFacade.updatePlayerName('playerTwo', this.playerTwo?.value.trim());

    this.router.navigateByUrl(links.wizard.cardsType);
  }

  protected unsetPlayerName(player: keyof PlayersNamesValues) {
    this.gameFacade.updatePlayerName(player, '');
  }
}
