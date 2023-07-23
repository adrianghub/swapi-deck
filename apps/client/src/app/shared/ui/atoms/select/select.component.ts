import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { TranslateModule } from '@ngx-translate/core';
import { IconsModule } from 'apps/client/src/app/core/icons/icons.module';
import { ButtonComponent } from '../button/button.component';

@Component({
  standalone: true,
  selector: 'sdeck-select',
  template: `
    <mat-form-field class="form-field" appearance="outline">
      <mat-label>{{ label }}</mat-label>

      <div class="select-container">
        <mat-select
          [formControl]="control"
          [placeholder]="placeholder ?? ''"
          [attr.aria-label]="label ?? ''"
        >
          <mat-option
            *ngFor="let option of options"
            [value]="option"
            [attr.data-cy]="'select-option-' + option"
          >
            {{ 'misc.select.option.' + option | translate }}
          </mat-option>
        </mat-select>
      </div>

      <mat-hint *ngIf="hint">{{ hint }}</mat-hint>

      <mat-error *ngIf="(control.errors | keyvalue)?.[0] as error">
        <span>{{ 'misc.validationError.' + error.key | translate }}</span>
      </mat-error>
    </mat-form-field>
  `,
  styleUrls: ['./select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    TranslateModule,
    MatSelectModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    ButtonComponent,
    IconsModule,
    TranslateModule,
  ],
})
export class SelectComponent<T> implements OnInit {
  @Input({ required: true }) control!: FormControl<T>;
  @Input({ required: true }) options: T[] = [];
  @Input() label?: string;
  @Input() placeholder?: string;
  @Input() hint?: string;

  @Output() changed = new EventEmitter<T>();
  @Output() cleared = new EventEmitter<Event>();

  constructor(private destroyRef: DestroyRef) {}

  ngOnInit() {
    this.control.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((value) => {
        this.changed.emit(value);
      });
  }
}
