import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ActivatedRoute, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { GameFacade } from '../../../store/game.facade';
import { hasCardTypeDefinedGuard } from './hasCardTypeDefined.guard';

describe('hasCardTypeDefinedGuard', () => {
  const gameBoardMock = {
    cardsType$: of('people'),
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
          useValue: gameBoardMock,
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

  it('should return true if cards type is defined', fakeAsync(() => {
    const activatedRoute = TestBed.inject(ActivatedRoute);

    const guardResult = TestBed.runInInjectionContext(() => {
      return hasCardTypeDefinedGuard(
        activatedRoute.snapshot,
        {} as RouterStateSnapshot
      ) as Observable<boolean>;
    });

    guardResult.subscribe((result) => (output = result));
    tick(100);

    expect(output).toBe(true);
  }));

  it('should return false and redirect to the cards type tab if cards type is not defined', fakeAsync(() => {
    TestBed.overrideProvider(GameFacade, {
      useValue: {
        cardsType$: of(null),
      },
    });

    const activatedRoute = TestBed.inject(ActivatedRoute);

    const guardResult = TestBed.runInInjectionContext(() => {
      return hasCardTypeDefinedGuard(
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
