import { NgIf, NgTemplateOutlet } from '@angular/common';
import { Component, Inject, TemplateRef } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { TranslateModule } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { ButtonComponent } from '../../atoms/button/button.component';

export interface DialogData<I, R> {
  templateRef: TemplateRef<unknown>;
  input$: Observable<I>;
  labels: {
    title?: string;
    subtitle?: string;
    submit: string;
  };
  submitColor?: ThemePalette;
  result: R;
  options: {
    disabled: boolean;
  };
}

@Component({
  selector: 'sdeck-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
  standalone: true,
  imports: [
    MatDialogModule,
    TranslateModule,
    ButtonComponent,
    NgIf,
    NgTemplateOutlet,
  ],
})
export class DialogComponent<I, R> {
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData<I, R>) {}
}
