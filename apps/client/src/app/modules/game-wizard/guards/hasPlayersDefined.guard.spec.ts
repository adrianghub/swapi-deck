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
        score: 0,
      },
      playerTwo: {
        name: 'Player 2',
        score: 0,
      },
    }),
  };

  let output: boolean | null;

  const routerMock = {
    navigateByUrl: jest.fn(),
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

    output = null;
  });

  it('should return true if players are defined', fakeAsync(() => {
    const activatedRoute = TestBed.inject(ActivatedRoute);

    const guardResult = TestBed.runInInjectionContext(() => {
      return hasPlayersDefinedGuard(
        activatedRoute.snapshot,
        {} as RouterStateSnapshot
      ) as Observable<boolean>;
    });

    guardResult.subscribe((result) => (output = result));
    tick(100);

    expect(output).toBe(true);
  }));

  it('should return false and redirect to the names tab if players are not defined', fakeAsync(() => {
    TestBed.overrideProvider(GameFacade, {
      useValue: {
        players$: of({}),
      },
    });

    const activatedRoute = TestBed.inject(ActivatedRoute);

    const guardResult = TestBed.runInInjectionContext(() => {
      return hasPlayersDefinedGuard(
        activatedRoute.snapshot,
        {} as RouterStateSnapshot
      ) as Observable<boolean>;
    });

    guardResult.subscribe((result) => (output = result));
    tick(100);

    expect(output).toBe(false);
    expect(routerMock.navigateByUrl).toHaveBeenCalledWith('/game-wizard/names');
  }));
});
