import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { links } from 'apps/client/src/app/shared/constants/game.constants';
import { ButtonComponent } from 'apps/client/src/app/shared/ui/atoms/button/button.component';
import { InputComponent } from 'apps/client/src/app/shared/ui/atoms/input/input.component';
import { GameFacade } from 'apps/client/src/app/store/game.facade';
import { of } from 'rxjs';
import { GameWizardLayout } from '../../layout/game-wizard/game-wizard.layout';
import { GameWizardNamesTab } from './game-wizard-names.tab';

describe('GameWizardNamesTab', () => {
  let component: GameWizardNamesTab;
  let fixture: ComponentFixture<GameWizardNamesTab>;
  let gameWizardFacadeMock: Partial<GameFacade>;
  let routerMock: Router;

  beforeEach(() => {
    gameWizardFacadeMock = {
      players$: of({
        playerOne: { name: 'John', score: 0 },
        playerTwo: { name: 'Jane', score: 0 },
      }),
      updatePlayerName: jest.fn(),
    };

    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        ReactiveFormsModule,
        RouterTestingModule,
        TranslateModule.forRoot(),
        InputComponent,
        ButtonComponent,
      ],
      declarations: [GameWizardNamesTab, GameWizardLayout],
      providers: [
        { provide: GameFacade, useValue: gameWizardFacadeMock },
        { provide: Router, useValue: { navigateByUrl: jest.fn() } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(GameWizardNamesTab);
    component = fixture.componentInstance;
    fixture.detectChanges();

    routerMock = TestBed.inject(Router);
  });

  it('should set the form controls from the players$ observable', () => {
    component.ngOnInit();

    expect(component.playerOne.value).toEqual('John');
    expect(component.playerTwo.value).toEqual('Jane');
  });

  it('should call goToNextStep() when next step button is clicked and form is valid', () => {
    const routerSpy = jest.spyOn(routerMock, 'navigateByUrl');
    const updatePlayerNameSpy = jest.spyOn(
      gameWizardFacadeMock,
      'updatePlayerName'
    );

    component.playersForm.setValue({ playerOne: 'John', playerTwo: 'Jane' });

    fixture.detectChanges();

    const nextStepButton = fixture.nativeElement.querySelector(
      '[data-cy="next-step-button"] button'
    );
    nextStepButton.click();

    expect(routerSpy).toHaveBeenCalledWith(links.wizard.cardsType);
    expect(updatePlayerNameSpy).toHaveBeenCalledTimes(2);
    expect(updatePlayerNameSpy).toHaveBeenNthCalledWith(1, 'playerOne', 'John');
    expect(updatePlayerNameSpy).toHaveBeenLastCalledWith('playerTwo', 'Jane');
  });

  it('should not call goToNextStep() when next step button is clicked and form is invalid', () => {
    const routerSpy = jest.spyOn(routerMock, 'navigateByUrl');

    component.playersForm.setValue({ playerOne: '', playerTwo: '' });

    fixture.detectChanges();

    const nextStepButton = fixture.nativeElement.querySelector(
      '[data-cy="next-step-button"] button'
    );
    nextStepButton.click();

    expect(routerSpy).not.toHaveBeenCalled();
  });

  it('should call goToPreviousStep() when previous step button is clicked', () => {
    const routerSpy = jest.spyOn(routerMock, 'navigateByUrl');

    const previousStepButton = fixture.nativeElement.querySelector(
      '[data-cy="main-menu-button"] button'
    );
    previousStepButton.click();

    expect(routerSpy).toHaveBeenCalledWith(links.base);
  });

  it('should call goToNextStep() when next step button is clicked and form is valid', () => {
    const routerSpy = jest.spyOn(routerMock, 'navigateByUrl');

    component.playersForm.setValue({ playerOne: 'John', playerTwo: 'Jane' });

    fixture.detectChanges();

    const nextStepButton = fixture.nativeElement.querySelector(
      '[data-cy="next-step-button"] button'
    );
    nextStepButton.click();

    expect(routerSpy).toHaveBeenCalledWith(links.wizard.cardsType);
  });

  it('should not call goToNextStep() when next step button is clicked and form is invalid', () => {
    const routerSpy = jest.spyOn(routerMock, 'navigateByUrl');

    component.playersForm.setValue({ playerOne: '', playerTwo: '' });

    fixture.detectChanges();

    const nextStepButton = fixture.nativeElement.querySelector(
      '[data-cy="next-step-button"] button'
    );
    nextStepButton.click();

    expect(routerSpy).not.toHaveBeenCalled();
  });
});
