import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrediksiRoutingModule } from './prediksi-routing.module';
import { PrediksiComponent } from './prediksi.component';
import { SharedModule } from '../shared/shared.module';
import { UploadGambarComponent } from './upload-gambar/upload-gambar.component';
import { TableDataComponent } from './table-data/table-data.component';
import { PredictionComponent } from './prediction/prediction.component';

@NgModule({
  declarations: [PrediksiComponent, UploadGambarComponent, TableDataComponent, PredictionComponent],
  imports: [CommonModule, PrediksiRoutingModule, SharedModule],
})
export class PrediksiModule {}
