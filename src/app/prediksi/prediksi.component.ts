import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-prediksi',
  templateUrl: './prediksi.component.html',
  styleUrls: ['./prediksi.component.scss']
})
export class PrediksiComponent implements OnInit {
  selectedIndex: number = 0;

  constructor() { }

  ngOnInit(): void {
  }

  selectionChange(): void {

  }

}
