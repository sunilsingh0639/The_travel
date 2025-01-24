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

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initializeTripDetailsForm();
  }

  initializeTripDetailsForm() {
    this.tripDetailsForm = this.fb.group({
      cities: this.fb.array([]),
      leavingDate: ['', Validators.required],
      interests: ['', Validators.required],
      hotelRating: ['', Validators.required],
      adults: ['', Validators.required],
      infants: ['', Validators.required],
      childrens: ['', Validators.required],
    });
    this.addCity();
  }

  get cities(): FormArray {
    return this.tripDetailsForm.get('cities') as FormArray;
  }
  get leavingDate() {
    return this.tripDetailsForm.controls['leavingDate'];
  }
  get interests() {
    return this.tripDetailsForm.controls['interests'];
  }
  get hotelRating() {
    return this.tripDetailsForm.controls['hotelRating'];
  }
  get adults() {
    return this.tripDetailsForm.controls['adults'];
  }
  get infants() {
    return this.tripDetailsForm.controls['infants'];
  }
  get childrens() {
    return this.tripDetailsForm.controls['childrens'];
  }

  addCity() {
    if (this.cities.length < 15) {
      const cityGroup = this.fb.group({
        cityName: ['', Validators.required],
        hotelName: ['', Validators.required],
        numberOfNights: [null, Validators.required]
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
    if (!this.tripDetailsForm.valid) {
      this.tripDetailsForm.markAllAsTouched();
    }
    console.log(this.tripDetailsForm.value);

    if (this.tripDetailsForm.valid) {
      alert('ok')
      console.log(this.tripDetailsForm.value);
    } else {

    }
  }
}