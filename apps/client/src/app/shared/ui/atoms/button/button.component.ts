import { NgClass, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import type { ButtonSize, ButtonType } from './button.config';
import { buttonSizes, iconSizes } from './button.config';
import { IconsModule } from '@/core/icons/icons.module';

@Component({
  standalone: true,
  selector: 'sdeck-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIf, NgClass, MatButtonModule, IconsModule],
})
export class ButtonComponent {
  @Input() type: ButtonType = 'primary';
  @Input() size: ButtonSize = 'medium';
  @Input() label?: string;
  @Input() prefixIcon?: string;
  @Input() suffixIcon?: string;
  @Input() disabled = false;
  @Input() active = false;

  @Output() clicked = new EventEmitter<Event>();

  get buttonCssVariables(): string {
    if (this.label) {
      return `
      --fontSize: ${buttonSizes[this.size].fontSize};
      --padding: ${buttonSizes[this.size].padding};
    `;
    } else {
      return `
      --padding: ${iconSizes[this.size].padding};
    `;
    }
  }

  get iconCssVariables(): string {
    return `
      --iconWidth: ${iconSizes[this.size].iconWidth};
    `;
  }

  onClick(): void {
    if (!this.disabled) {
      this.clicked.emit();
    }
  }
}
