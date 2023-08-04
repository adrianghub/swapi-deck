import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map, tap } from 'rxjs';
import { links } from '../../../shared/constants/game.constants';
import { GameFacade } from '../../../store/game.facade';

export const hasPlayersDefinedGuard: CanActivateFn = () => {
  const router = inject(Router);

  return inject(GameFacade).players$.pipe(
    map((players) => !!(players?.playerOne?.name && players?.playerTwo?.name)),
    tap((players) => !players && router.navigateByUrl(links.wizard.names))
  );
};
