import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatHorizontalStepper } from '@angular/material/stepper';

@Component({
  selector: 'app-prediksi',
  templateUrl: './prediksi.component.html',
  styleUrls: ['./prediksi.component.scss'],
})
export class PrediksiComponent implements OnInit {
  @ViewChild('stepper') stepper: MatHorizontalStepper;
  selectedIndex: number = 0;
  firstForm: FormGroup;
  secondForm: FormGroup;
  thirdForm: FormGroup;
  isEditable: boolean = true;
  imageDataList: any[] = [];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.firstForm = this.fb.group({
      done: ['', Validators.required],
    });

    this.secondForm = this.fb.group({
      done: ['', Validators.required],
    });

    this.thirdForm = this.fb.group({
      result: ['', Validators.required],
      is_saved: [false],
      convusion_matrix: [null],
    });
  }

  selectionChange(event: StepperSelectionEvent): void {
    const currentIndex = event.selectedIndex;
    const prevIndex = event.previouslySelectedIndex;

    // To set previous step state to nothing
    if (prevIndex > currentIndex) {
      event.previouslySelectedStep.state = '';
    }
    this.selectedIndex = currentIndex;
  }

  saveImage(event: any) {
    if (event) {
      this.imageDataList.push(event);
      this.firstForm.get('done').patchValue('true');
      this.stepper.next();
    }
    console.log('data img', this.imageDataList);
  }

  proceed() {
    this.secondForm.get('done').patchValue('true');
    this.isEditable = false;
    this.stepper.next();
  }
}
