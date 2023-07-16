import { Injectable, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Injectable()
export abstract class Subscribable implements OnDestroy {
  subs: Subscription[] = [];

  ngOnDestroy() {
    this.subs.forEach((sub) => sub.unsubscribe());
  }
}
