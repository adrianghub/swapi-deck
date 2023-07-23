import { TemplateRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import {
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { of } from 'rxjs';
import { DialogComponent } from '../../../shared/ui/organisms/dialog/dialog.component';
import { GameBoardService } from './game-board.service';

describe('GameBoardService', () => {
  let service: GameBoardService;
  let matDialog: MatDialog;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatDialogModule],
      providers: [GameBoardService],
    });
    service = TestBed.inject(GameBoardService);
    matDialog = TestBed.inject(MatDialog);
  });

  describe('openGameResultsDialog', () => {
    it('should open the dialog with the correct configuration', () => {
      const selectedCards = [{}];
      const dialogRef = new MockTemplateRef({});
      const playAgain = jest.fn();
      const quitGame = jest.fn();

      const matDialogOpenSpy = jest.spyOn(matDialog, 'open').mockReturnValue({
        afterClosed: () => of(true),
      } as MatDialogRef<unknown, unknown>);

      service.openGameResultsDialog(
        selectedCards,
        dialogRef,
        playAgain,
        quitGame
      );

      expect(matDialogOpenSpy).toHaveBeenCalledWith(DialogComponent, {
        data: expect.objectContaining({
          templateRef: dialogRef,
          input$: expect.any(Object),
          labels: expect.objectContaining({
            title: 'gameBoard.dialog.result.title',
            submit: 'gameBoard.dialog.result.submit',
            cancel: 'gameBoard.dialog.result.cancel',
          }),
          options: expect.objectContaining({
            disabled: false,
          }),
          submitCallbackFn: playAgain,
          cancelCallbackFn: quitGame,
          result: true,
        }),
        width: '1000px',
        disableClose: true,
      });
    });
  });
});

class MockTemplateRef<T> extends TemplateRef<T> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(private _elementRef: any) {
    super();
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  createEmbeddedView(): any {
    return null;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  get elementRef(): any {
    return this._elementRef;
  }
}
