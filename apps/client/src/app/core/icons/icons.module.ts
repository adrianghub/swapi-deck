import { NgModule } from '@angular/core';
import { FeatherModule } from 'angular-feather';
import { ArrowLeft, ArrowRight, X } from 'angular-feather/icons';

const icons = {
  ArrowRight,
  ArrowLeft,
  X,
};

@NgModule({
  imports: [FeatherModule.pick(icons)],
  exports: [FeatherModule],
})
export class IconsModule {}
