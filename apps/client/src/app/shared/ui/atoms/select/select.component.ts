import { KeyValuePipe, NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  standalone: true,
  selector: 'sdeck-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgIf,
    NgFor,
    KeyValuePipe,
    TranslateModule,
    MatSelectModule,
    MatFormFieldModule,
    ReactiveFormsModule,
  ],
})
export class SelectComponent<T> {
  @Input({ required: true }) control!: FormControl<T>;
  @Input({ required: true }) options: T[] = [];
  @Input() label?: string;
  @Input() placeholder?: string;
  @Input() hint?: string;
}
