import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShellRoutingModule } from './shell-routing.module';
import { ShellComponent } from './shell.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { MenuItemsComponent } from './menu-items/menu-items.component';

@NgModule({
  declarations: [ShellComponent, MenuItemsComponent],
  imports: [
    CommonModule,
    ShellRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
  ],
})
export class ShellModule {}
