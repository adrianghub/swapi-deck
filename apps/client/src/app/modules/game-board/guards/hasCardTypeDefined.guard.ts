import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map, tap } from 'rxjs';
import { links } from '../../../shared/constants/game.constants';
import { GameFacade } from '../../../store/game.facade';

export const hasCardTypeDefinedGuard: CanActivateFn = () => {
  const router = inject(Router);

  return inject(GameFacade).cardsType$.pipe(
    map((cardType) => !!cardType),
    tap((cardType) => !cardType && router.navigateByUrl(links.wizard.names))
  );
};
