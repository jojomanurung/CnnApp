import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrediksiRoutingModule } from './prediksi-routing.module';
import { PrediksiComponent } from './prediksi.component';

@NgModule({
  declarations: [PrediksiComponent],
  imports: [CommonModule, PrediksiRoutingModule],
})
export class PrediksiModule {}
