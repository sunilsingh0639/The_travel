import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NumberOfNightList } from 'src/app/modal/menu';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  numberOfNightList: any[] = NumberOfNightList;
  tripDetailsForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initializeTripDetailsForm();
  }

  initializeTripDetailsForm() {
    this.tripDetailsForm = this.fb.group({
      cities: this.fb.array([]), 
    });
    this.addCity(); 
  }

  get cities(): FormArray {
    return this.tripDetailsForm.get('cities') as FormArray;
  }

  addCity() {
    if (this.cities.length < 15) {
      const cityGroup = this.fb.group({
        cityName: ['', Validators.required],
        numberOfNights: [null, Validators.required],
      });
      this.cities.push(cityGroup);
    }
  }

  removeCity(index: number) {
    if (this.cities.length > 1) {
      this.cities.removeAt(index);
    }
  }

  submitForm() {
    if (this.tripDetailsForm.valid) {
      console.log(this.tripDetailsForm.value);
    } else {
     
    }
  }
}