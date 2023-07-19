import { Component } from '@angular/core';

@Component({
  selector: 'sdeck-cards-skeleton',
  template: `<ngx-skeleton-loader
    class="cards-skeleton"
    count="6"
    appearance="line"
    [theme]="{
  height: '250px',
  maxWidth: '250px',
  backgroundColor: '#D8DEE9',
  borderRadius: '4px',
}"
  ></ngx-skeleton-loader>`,
  styleUrls: ['./cards-skeleton.component.scss'],
})
export class CardsSkeletonComponent {}
