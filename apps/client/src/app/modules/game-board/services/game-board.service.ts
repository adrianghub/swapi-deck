import {
  DialogComponent,
  DialogData,
} from '@/shared/ui/organisms/dialog/dialog.component';
import { Injectable, TemplateRef, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { filter, of } from 'rxjs';

interface GameResultDialogProps<T> {
  selectedCards: T[];
  dialogRef: TemplateRef<MatDialog>;
  playAgain: () => void;
  quitGame: () => void;
}

@Injectable({
  providedIn: 'root',
})
export class GameBoardService {
  private dialog = inject(MatDialog);

  openGameResultsDialog<T>({
    selectedCards,
    dialogRef,
    playAgain,
    quitGame,
  }: GameResultDialogProps<T>): void {
    this.dialog
      .open(DialogComponent, {
        data: {
          templateRef: dialogRef,
          input$: of(selectedCards),
          labels: {
            title: 'gameBoard.dialog.result.title',
            submit: 'gameBoard.dialog.result.submit',
            cancel: 'gameBoard.dialog.result.cancel',
          },
          options: {
            disabled: false,
          },
          submitCallbackFn: playAgain,
          cancelCallbackFn: quitGame,
          result: true,
        } as DialogData<T, boolean>,
        width: '1000px',
        disableClose: true,
      })
      .afterClosed()
      .pipe(filter((option) => !!option));
  }
}
