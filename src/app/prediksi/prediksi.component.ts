import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatHorizontalStepper } from '@angular/material/stepper';

@Component({
  selector: 'app-prediksi',
  templateUrl: './prediksi.component.html',
  styleUrls: ['./prediksi.component.scss']
})
export class PrediksiComponent implements OnInit, AfterViewInit {
  @ViewChild('stepper') stepper: MatHorizontalStepper;
  selectedIndex: number = 0;
  firstForm: FormGroup;
  secondForm: FormGroup;
  thirdForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.firstForm = this.fb.group({
      file_name: ['', Validators.required],
      file_src: ['', Validators.required]
    });

    this.secondForm = this.fb.group({
      file_list: this.fb.array([], Validators.required)
    });

    this.thirdForm = this.fb.group({
      result: ['', Validators.required],
      is_saved: [false],
      convusion_matrix: [null]
    });
  }

  ngAfterViewInit(): void {
    console.log('stepper', this.stepper);
  }

  selectionChange(event: StepperSelectionEvent): void {
    console.log('selected index', event.selectedIndex);
    this.selectedIndex = event.selectedIndex;
  }

}
