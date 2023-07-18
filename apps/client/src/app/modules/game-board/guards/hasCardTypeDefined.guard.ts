import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map, tap } from 'rxjs';
import { GameWizardFacade } from '../../game-wizard/store/game-wizard.facade';

export const hasCardTypeDefinedGuard: CanActivateFn = () => {
  const router = inject(Router);

  return inject(GameWizardFacade).cardsType$.pipe(
    map((cardType) => !!cardType),
    tap((cardType) => !cardType && router.navigateByUrl('wizard/names'))
  );
};
