import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DatasetRoutingModule } from './dataset-routing.module';
import { DatasetComponent } from './dataset.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [DatasetComponent],
  imports: [CommonModule, DatasetRoutingModule, SharedModule],
})
export class DatasetModule {}
