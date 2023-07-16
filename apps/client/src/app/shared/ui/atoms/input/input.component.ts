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
import { MatInputModule } from '@angular/material/input';
import { TranslateModule } from '@ngx-translate/core';
import { IconsModule } from 'apps/client/src/app/core/icons/icons.module';
import { ButtonComponent } from '../button/button.component';

type InputType = 'text';

@Component({
  standalone: true,
  selector: 'sdeck-input',
  template: `
    <mat-form-field class="form-field" appearance="outline">
      <mat-label>{{ label }}</mat-label>

      <i-feather matPrefix *ngIf="icon" [name]="icon" class="icon"></i-feather>

      <div class="wrapper">
        <input
          matInput
          [type]="type"
          [formControl]="control"
          [placeholder]="placeholder ?? ''"
          [attr.aria-label]="label ?? ''"
          [readonly]="readonly"
        />

        <sdeck-button
          *ngIf="control.value"
          prefixIcon="x"
          size="small"
          class="clear"
          (clicked)="control.reset(); cleared.emit($event)"
        />
      </div>

      <mat-hint *ngIf="hint">{{ hint }}</mat-hint>

      <mat-error *ngIf="(control.errors | keyvalue)?.[0] as error">
        <span>{{ 'misc.validationError.' + error.key | translate }}</span>
      </mat-error>
    </mat-form-field>
  `,
  styleUrls: ['./input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    TranslateModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    ButtonComponent,
    IconsModule,
  ],
})
export class InputComponent implements OnInit {
  @Input() type: InputType = 'text';
  @Input({ required: true }) control!: FormControl<string | null>;
  @Input() label?: string;
  @Input() icon?: string;
  @Input() placeholder?: string;
  @Input() hint?: string;
  @Input() readonly = false;

  @Output() changed = new EventEmitter<string | null>();
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
