import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
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

  constructor(private fb: FormBuilder, private _snackBar: MatSnackBar) {}

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
    this.imageDataList.push(event);
    this.firstForm.get('done').patchValue('true');
    const message = 'Sukses menambahkan ' + event.file_name + ' ke dalam list data';
    this._snackBar.open(message, null, {
      duration: 5000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
    });
    console.log('data img', this.imageDataList);
  }

  proceed() {
    this.secondForm.get('done').patchValue('true');
    this.isEditable = false;
    this.stepper.next();
  }
}
