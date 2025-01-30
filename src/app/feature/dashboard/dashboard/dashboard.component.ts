import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { destination } from 'src/app/modal/destination';
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
  paymentDetailsForm!: FormGroup;
  numberOfRoom: number = 0;
  min: number = 1;
  max: number = 20;
  step: number = 1;
  today = new Date();
  minDate: Date = new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate() + 1);;
  maxDate: Date = new Date(this.today.getFullYear() + 1, this.today.getMonth(), this.today.getDate() + 1);
  allCities: any[] = [];
  filteredCities: any[] = [];
  meals = new FormControl();
  mealsList = [
    { name: 'Breakfast', description: 'Delicious morning meal.' },
    { name: 'Lunch', description: 'Healthy midday meal.' },
    { name: 'Dinner', description: 'Hearty evening meal.' },
    { name: 'Snacks', description: 'Tasty treats to enjoy anytime.' },
    { name: 'Not Included', description: 'Not Included' },
  ];
  constructor(private fb: FormBuilder, private _router: Router) {
  }

  ngOnInit(): void {
    this.initializeTripDetailsForm();
    this.initializeItineraryForm();
    this.initializePaytmentGetwayForm();
    this.extractCities();
  }

  initializeTripDetailsForm() {
    this.tripDetailsForm = this.fb.group({
      leavingDate: ['', Validators.required],
      interests: ['', Validators.required],
      hotelRating: ['', Validators.required],
      adults: ['', Validators.required],
      infants: [''],
      childrens: [''],
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

  addCity() {
    if (this.cities.length < 15) {
      const cityGroup = this.fb.group({
        cityName: ['', Validators.required],
        cityId: [null, Validators.required],
        cityImages: [[], Validators.required],
        hotelName: ['', Validators.required],
        numberOfNights: [null, Validators.required],
        checkInTime: [null, Validators.required],
        checkInDate: [null, Validators.required],
        checkOutTime: [null, Validators.required],
        checkOutDate: [null, Validators.required],
        numberOfRoom: [null, Validators.required],
        meals: [[], Validators.required],
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

    if (this.tripDetailsForm.valid) {
      this.step = 2;
      console.log(this.tripDetailsForm.value);
    } else {
      this.tripDetailsForm.markAllAsTouched();
    }
  }

  itinerySubmit() {
    console.log('value', this.tripItineraryForm.value);
    if (this.tripItineraryForm.valid) {
      this.step = 3
    }
    else {
      this.tripItineraryForm.markAllAsTouched();
    }


  }
  increment(index: number) {
    debugger
    // if (this.numberOfRoom < this.max) {
    const control = this.cities.at(index).get('numberOfRoom');
    if (control && control.value < 20) {
      control.setValue((control.value || 0) + 1);
      // this.numberOfRoom++;
    }
    // }
  }

  decrement(index: number) {
    // if (this.numberOfRoom > this.min) {
    const control = this.cities.at(index).get('numberOfRoom');
    if (control && control.value > 1) {
      control.setValue(control.value - 1);
      // this.numberOfRoom--;
    }
    // }
  }

  extractCities() {
    this.allCities = destination[0].India.map((city: any) => ({
      id: city.id,
      name: city.city,
      images: city.images
    }));
    this.filteredCities = [...this.allCities];
  }

  searchCity(event: any) {
    const searchTerm = event.target.value.toLowerCase();
    this.filteredCities = this.allCities.filter(city =>
      city.name.toLowerCase().includes(searchTerm)
    );

  }

  selectCity(cityName: string, cityId: number, cityImages: any[], index: number) {
    this.cities.at(index).patchValue({
      cityName,
      cityId,
      cityImages
    });
    //this.filteredCities = [];
  }
  toggleDropdown(index: number) {
    console.log(this.filteredCities);

    if (this.cities.at(index).get('cityName')?.value === '') {
      this.filteredCities = [...this.allCities];
    }
  }
  initializePaytmentGetwayForm() {
    this.paymentDetailsForm = this.fb.group({
      price: ['', [Validators.required]],
      numberOfMember: ['', [Validators.required]],
      roadTransport: ['', [Validators.required]],
      gst: ['', [Validators.required]],
      total: [{ value: '', disabled: true }]
    })
  }

  get price() {
    return this.paymentDetailsForm.controls['price'];
  }
  get numberOfMember() {
    return this.paymentDetailsForm.controls['numberOfMember'];
  }
  get gst() {
    return this.paymentDetailsForm.controls['gst'];
  }

  changeEvent() {
    this.calculateTotal();
  }
  calculateTotal() {
    const pricePerPerson = this.paymentDetailsForm.get('price')?.value;
    const numberOfMember = this.paymentDetailsForm.get('numberOfMember')?.value;
    const gstPercentage = this.paymentDetailsForm.get('gst')?.value;

    const totalWithoutGST = pricePerPerson * numberOfMember;
    const gstAmount = (totalWithoutGST * gstPercentage) / 100;
    const totalAmount = totalWithoutGST + gstAmount;

    this.paymentDetailsForm.get('total')?.setValue(totalAmount.toFixed(2));
  }
  paymentSubmit() {
    const paymentArray = [
      { paymentMethod: 'Credit Card', amount: 100 },
      { paymentMethod: 'Debit Card', amount: 200 }
    ];

    const allFormData = {
      tripDetails: [
        this.tripDetailsForm.value
      ],
      tripItinery: this.tripItineraryForm.value,
      paymentGetway: [
        this.paymentDetailsForm.value
      ]

    }
    console.log('allFormData', allFormData);

    if (this.paymentDetailsForm.valid) {

      sessionStorage.setItem('pdfData', JSON.stringify(allFormData));
       this._router.navigate(['/app/pdf']);
    }
    else {
      this.paymentDetailsForm.markAllAsTouched();
    }
  }

  onMealsSelectionChange(event: any, index: number): void {
    let selectedMeals = [...event.value];
    const notIncluded = 'Not Included';
    const cityMealsControl = this.cities.at(index).get('meals');
    if (selectedMeals.includes(notIncluded) && selectedMeals.length > 1) {
      cityMealsControl?.setValue([notIncluded], { emitEvent: false });
    }

    else if (!selectedMeals.includes(notIncluded)) {
      cityMealsControl?.setValue(selectedMeals, { emitEvent: false });
    }
  }




}