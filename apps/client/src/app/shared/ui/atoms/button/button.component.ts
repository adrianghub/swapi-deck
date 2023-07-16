import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { IconsModule } from 'apps/client/src/app/core/icons/icons.module';
import type { ButtonSize, ButtonType } from './button.config';
import { buttonSizes, iconSizes } from './button.config';

@Component({
  standalone: true,
  selector: 'sdeck-button',
  template: ` <button
    mat-button
    class="button"
    [ngClass]="{ active: active, 'icon-only': !label }"
    [color]="type"
    [style]="buttonCssVariables"
    [disabled]="disabled"
    (click)="onClick()"
  >
    <div [ngClass]="{ content: label }">
      <i-feather *ngIf="icon" [name]="icon" [style]="iconCssVariables" />

      <span>{{ label }}</span>
    </div>
  </button>`,
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, MatButtonModule, IconsModule],
})
export class ButtonComponent {
  @Input() type: ButtonType = 'primary';
  @Input() size: ButtonSize = 'medium';
  @Input() label?: string;
  @Input() icon?: string;
  @Input() disabled = false;
  @Input() active = false;

  @Output()
  clicked = new EventEmitter<Event>();

  protected get buttonCssVariables(): string {
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

  protected get iconCssVariables(): string {
    return `
      --iconWidth: ${iconSizes[this.size].iconWidth};
    `;
  }

  protected onClick(): void {
    this.clicked.emit();
  }
}
