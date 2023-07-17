import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ActivatedRoute, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { GameWizardFacade } from '../store/game-wizard.facade';
import { hasPlayersDefinedGuard } from './hasPlayersDefined.guard';

describe('hasPlayersDefinedGuard', () => {
  const gameWizardMock = {
    players$: of({
      playerOne: 'Player 1',
      playerTwo: 'Player 2',
    }),
  };

  const routerMock = {
    navigate: jest.fn(),
  };

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: GameWizardFacade,
          useValue: gameWizardMock,
        },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {},
          },
        },
        {
          provide: Router,
          useValue: routerMock,
        },
      ],
    });
  });

  it('should return true', fakeAsync(() => {
    const activatedRoute = TestBed.inject(ActivatedRoute);

    const guardResult = TestBed.runInInjectionContext(() => {
      return hasPlayersDefinedGuard(
        activatedRoute.snapshot,
        {} as RouterStateSnapshot
      ) as Observable<boolean>;
    });

    let output = null;

    guardResult.subscribe((result) => (output = result));
    tick(100);

    expect(output).toBe(true);
  }));
});
