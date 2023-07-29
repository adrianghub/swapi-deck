import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ActivatedRoute, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { GameFacade } from '../../../store/game.facade';
import { hasPlayersDefinedGuard } from './hasPlayersDefined.guard';

describe('hasPlayersDefinedGuard', () => {
  const gameWizardMock = {
    players$: of({
      playerOne: {
        name: 'Player 1',
      },
      playerTwo: {
        name: 'Player 2',
      },
    }),
  };

  const routerMock = {
    navigate: jest.fn(),
  };

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: GameFacade,
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
