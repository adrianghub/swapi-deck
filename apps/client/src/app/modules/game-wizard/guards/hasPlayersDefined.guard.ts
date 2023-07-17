import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map, tap } from 'rxjs';
import { GameWizardFacade } from '../store/game-wizard.facade';

export const hasPlayersDefinedGuard: CanActivateFn = () => {
  const router = inject(Router);

  return inject(GameWizardFacade).players$.pipe(
    map((players) => !!players),
    tap((players) => !players && router.navigateByUrl('wizard/names'))
  );
};
