import { KeyValuePipe, NgIf } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
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
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgIf,
    KeyValuePipe,
    TranslateModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    ButtonComponent,
    IconsModule,
  ],
})
export class InputComponent<T> implements AfterViewInit {
  @ViewChild('input') inputRef!: ElementRef;

  @Input() type: InputType = 'text';
  @Input({ required: true }) control!: FormControl<T | null>;
  @Input() label?: string;
  @Input() icon?: string;
  @Input() placeholder?: string;
  @Input() hint?: string;
  @Input() readonly = false;
  @Input() focus = false;

  @Output() cleared = new EventEmitter<Event>();

  ngAfterViewInit() {
    if (this.focus) {
      setTimeout(() => {
        this.inputRef.nativeElement.focus();
      }, 0);
    }
  }
}
