import { NgModule } from '@angular/core';
import { MenuBarModule } from '../menu-bar/menu-bar.module';
import { MainHeaderComponent } from './main-header.component';

@NgModule({
  declarations: [
    MainHeaderComponent
  ],
  imports: [
    MenuBarModule
  ],
  exports: [
    MainHeaderComponent
  ]
})
export class MainHeaderModule { }
