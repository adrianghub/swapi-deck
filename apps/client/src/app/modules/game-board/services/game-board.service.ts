import { Injectable, TemplateRef, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { filter, of } from 'rxjs';
import {
  DialogComponent,
  DialogData,
} from '../../../shared/ui/organisms/dialog/dialog.component';
import {
  SwapiBaseDto,
  SwapiPersonDto,
  SwapiStarshipDto,
} from '../models/swapi.dto';

@Injectable({
  providedIn: 'root',
})
export class GameBoardService {
  private dialog = inject(MatDialog);

  openGameResultsDialog(
    dialogRef: TemplateRef<MatDialog>,
    selectedCards: SwapiBaseDto[]
  ): void {
    console.log('openGameResultsDialog', selectedCards);

    this.dialog
      .open(DialogComponent, {
        data: {
          templateRef: dialogRef,
          input$: of(selectedCards),
          labels: {
            title: 'misc.dialog.title',
            submit: 'misc.dialog.submit',
          },
          options: {
            disabled: true,
          },
          result: false,
        } as DialogData<SwapiPersonDto[] | SwapiStarshipDto[], boolean>,
        width: '1000px',
        disableClose: true,
      })
      .afterClosed()
      .pipe(filter((option) => !!option));
  }
}
