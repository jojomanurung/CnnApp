import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrediksiRoutingModule } from './prediksi-routing.module';
import { PrediksiComponent } from './prediksi.component';
import { SharedModule } from '../shared/shared.module';
import { UploadGambarComponent } from './upload-gambar/upload-gambar.component';

@NgModule({
  declarations: [PrediksiComponent, UploadGambarComponent],
  imports: [CommonModule, PrediksiRoutingModule, SharedModule],
})
export class PrediksiModule {}
