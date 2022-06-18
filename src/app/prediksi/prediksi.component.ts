import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatHorizontalStepper } from '@angular/material/stepper';

@Component({
  selector: 'app-prediksi',
  templateUrl: './prediksi.component.html',
  styleUrls: ['./prediksi.component.scss']
})
export class PrediksiComponent implements OnInit {
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
      done: ['', Validators.required],
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

  getFileList(): FormArray {
    return this.secondForm.controls['file_list'] as FormArray;
  }

  selectionChange(event: StepperSelectionEvent): void {
    this.selectedIndex = event.selectedIndex;
  }

  saveImage(event: FormGroup) {
    console.log(event);
    if (event) {
      this.getFileList().push(event);
    }
    console.log('data img', this.secondForm.value);
  }

}
