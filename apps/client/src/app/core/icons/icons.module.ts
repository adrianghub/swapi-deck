import { NgModule } from '@angular/core';
import { FeatherModule } from 'angular-feather';
import { ArrowLeft, Calendar, Plus, Search, X } from 'angular-feather/icons';

const icons = {
  ArrowLeft,
  Plus,
  X,
  Calendar,
  Search,
};

@NgModule({
  imports: [FeatherModule.pick(icons)],
  exports: [FeatherModule],
})
export class IconsModule {}
