import { links } from './../../../../shared/constants/game.constants';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  inject,
} from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'sdeck-layout-header',
  templateUrl: './layout-header.component.html',
  imports: [TranslateModule, MatDividerModule],
  styleUrls: ['./layout-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class LayoutHeaderComponent {
  @Input() center = false;

  links = links;

  protected router = inject(Router);
}
