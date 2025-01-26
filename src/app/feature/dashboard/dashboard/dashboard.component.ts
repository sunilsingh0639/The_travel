import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { numberOfDays, NumberOfNightList } from 'src/app/modal/menu';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  numberOfNightList: any[] = NumberOfNightList;
  numberOfDays: any[] = numberOfDays;
  tripDetailsForm!: FormGroup;
  tripItineraryForm!: FormGroup;
  numberOfRoom: number = 1;
  min: number = 1;
  max: number = 20;
  step: number = 1;
  minDate: Date;
  maxDate: Date;
  constructor(private fb: FormBuilder) {
    const today = new Date();
    this.minDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
    this.maxDate = new Date(today.getFullYear() + 1, today.getMonth(), today.getDate() + 1);
 
   }

  ngOnInit(): void {
    this.initializeTripDetailsForm();
    this.initializeItineraryForm();
  }

  initializeTripDetailsForm() {
    this.tripDetailsForm = this.fb.group({
      leavingDate: ['', Validators.required],
      interests: ['', Validators.required],
      hotelRating: ['', Validators.required],
      adults: ['', Validators.required],
      infants: ['', Validators.required],
      childrens: ['', Validators.required],
    });
  }
  initializeItineraryForm() {
    this.tripItineraryForm = this.fb.group({
      cities: this.fb.array([]),

    });
    this.addCity();
  }

  get cities(): FormArray {
    return this.tripItineraryForm.get('cities') as FormArray;
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
        numberOfNights: [null, Validators.required],
        checkIn: [null, Validators.required],
        checkOut: [null, Validators.required],
        numberOfRoom: [null, Validators.required],
        meals: [null, Validators.required],
        visitedDay: [null, Validators.required],
        itineryContent: [null, Validators.required],
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
    //  this.step = 2;
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

  itinerySubmit() {
    console.log('value', this.tripItineraryForm.value);
    
  }

  increment() {
    if (this.numberOfRoom < this.max) {
      this.numberOfRoom++;
    }
  }

  decrement() {
    if (this.numberOfRoom > this.min) {
      this.numberOfRoom--;
    }
  }
}