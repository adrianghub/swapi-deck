import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'sdeck-card',
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>{{ title }}</mat-card-title>
        <mat-card-subtitle>{{ subtitle }}</mat-card-subtitle>
      </mat-card-header>

      <div
        #placeholder
        class="placeholder-box"
        [class.fit-content]="fitPlaceholderContent"
      >
        <ng-content select="[placeholder-content]" />
      </div>
    </mat-card>
  `,
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements AfterViewInit {
  @Input() title!: string;
  @Input() subtitle!: string;
  @Input() customPlaceholderWidth!: string;
  @Input() fitPlaceholderContent = false;

  @ViewChild('placeholder')
  placeholder!: ElementRef<HTMLDivElement>;

  ngAfterViewInit() {
    if (this.customPlaceholderWidth && this.placeholder?.nativeElement) {
      this.placeholder.nativeElement.style.height = `${this.customPlaceholderWidth}px`;
    }
  }
}
