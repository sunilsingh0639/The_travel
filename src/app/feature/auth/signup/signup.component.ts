import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SpinnerService } from 'src/app/core/services/spinner/spinner.service';
import { SubscriptionService } from 'src/app/core/services/subscriptions/subscription.service';
import { cities } from 'src/app/modal/cities';
import { ValidateEmail } from 'src/app/shared/shared/directives/emailValidator';



@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit{
step: number = 1

sigupForm! : FormGroup;
submitted = false;
planList : any;
emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
statesList: any[] = cities;
cities: any[] = [];
stage1Id: string = '';


constructor(private fb:FormBuilder ,private _service:SubscriptionService,
   private _toast: ToastrService, private _router: Router,private _spinner: SpinnerService) {}




ngOnInit(): void {
  this.initlizationsigupForm();
  this.getPlansList();
  }

keyPress(event: any) {
  const pattern = /[0-9\+\-\ ]/;
  let inputChar = String.fromCharCode(event.charCode);
  if (event.keyCode != 8 && !pattern.test(inputChar)) {
    event.preventDefault();
  }
}

keyGstn(event: any) {
  const pattern = /[0-9 A-Z\+\-\ ]/;
  let inputChar = String.fromCharCode(event.charCode);
  if (event.keyCode != 8 && !pattern.test(inputChar)) {
    event.preventDefault();
  }
}

/*********************
   * Name: initlizationsignupForm
   * @prarm : No
   *********************/

initlizationsigupForm(){

  this.sigupForm = this.fb.group({

    companyName : ['',[Validators.required,Validators.minLength(5)]],
    gstin : ['',[Validators.required,Validators.pattern("^[0-9 A-Z]*$")]],
    contactPerson : ['',[Validators.required,Validators.pattern("^[0-9]*$"),
                       Validators.minLength(10), Validators.maxLength(10)]],
    email : ['',[Validators.required, Validators.pattern(this.emailPattern)]],
    addressLine1 : ['',[Validators.required]],
    addressLine2 : [''],
    city : ['',[Validators.required]],
    state : ['',[Validators.required]],
    area : ['',[Validators.required]],
    zipCode : ['',[Validators.required,Validators.pattern("^[0-9]*$")]],
    firstName : ['',Validators.required],
    middleName : [''],
    lastName : ['',[Validators.required]],
    emailId : ['',[Validators.required,ValidateEmail]],
    subscribertype : ['',Validators.required],
    mobile : ['',[Validators.required]],
    gender : ['',[Validators.required]]
   
  });
}



 /*****************************
   * @Name : subscription
   * @Purpose : this is used to  susbscription plan
   * @param : None 
   ***************************/

subscription(){
  this._service.signUp(this.stage1Id)
  .subscribe(res => {
    this.saveSubscription(res);
  })
}
saveSubscription(res: any){
  this.step = 5;
  this._service.signUpSave(res)
  .subscribe(res => {
    this._toast.success(`You have Successfully onboarded. We have sent your
    username and temporary password on email.`);
    this._router.navigate(['/'])
  })
}
subscriptionStep1(){
  const reqData = {
    "planName": this.selected.planName,
    "price": this.selected.price
  }
  this._spinner.show();
   this._service.signUpStage1(reqData)
   .subscribe((res : any) =>{
    this.stage1Id = res.id;
    this.step = 2;
    this._spinner.hide();
   });
 }
subscriptionStep2(){
  const reqData = {
    "companyName": this.sigupForm.value.companyName,
    "contactNumber": this.sigupForm.value.contactPerson,
    "email": this.sigupForm.value.email,
    "addressLine1": this.sigupForm.value.addressLine1,
    "addressLine2": this.sigupForm.value.addressLine2,
    "area": this.sigupForm.value.area,
    "state": this.sigupForm.value.state,
    "city": this.sigupForm.value.city,
    "zipcode": this.sigupForm.value.zipCode,
    "correlationId": this.stage1Id
  }
  this._spinner.show();
   this._service.signUpStage2(reqData)
   .subscribe((res : any) =>{
    this._spinner.hide();
    this.stage1Id = res.id;
    this.step = 3;
   });
 }
 subscriptionStep3(){
  const reqData = {
    "firstName": this.sigupForm.value.firstName,
    "middleName": this.sigupForm.value.middleName,
    "lastName": this.sigupForm.value.lastName,
    "gender": this.sigupForm.value.gender,
    "contactNumber": this.sigupForm.value.mobile,
    "correlationId": this.stage1Id,
    "email": this.sigupForm.value.emailId,
    "subscriberType": this.sigupForm.value.subscribertype
  }
  this._spinner.show();
   this._service.signUpStage3(reqData)
   .subscribe((res : any) =>{
    this.step = 4;
    this._spinner.hide();
   });
 }
 convertToUppercase(event: any) {
    event.target.value = event.target.value.toUpperCase();
  }

  getPlansList(){
    this._service.plans()
    .subscribe((res:any) =>{
      this.planList = res.data;
    })
  }
selected : any;


  
  public get isDisableGoToInfo() : boolean {
    if(this.sigupForm.controls['companyName'].valid  &&
    
      this.sigupForm.controls['gstin'].valid 
      && this.sigupForm.controls['contactPerson'].valid
      && this.sigupForm.controls['addressLine1'].valid
      && this.sigupForm.controls['area'].valid
      && this.sigupForm.controls['zipCode'].valid
      && this.sigupForm.controls['city'].valid
      && this.sigupForm.controls['state'].valid
      && this.sigupForm.controls['email'].valid
     ) {
      return false;
    }
    return true;
  }

  
  public get isDisableGoToPayments() : boolean {

    if(this.sigupForm.controls['firstName'].valid  &&
    
      this.sigupForm.controls['middleName'].valid 
      && this.sigupForm.controls['lastName'].valid
      && this.sigupForm.controls['gender'].valid
      && this.sigupForm.controls['emailId'].valid
      && this.sigupForm.controls['mobile'].valid
      && this.sigupForm.controls['subscribertype'].valid
     
     ) {
      return false;
    }


    return true;
  }
  
  filterCities(){
    const state = this.sigupForm.value.state;
    this.sigupForm.patchValue({
      city: ''
    })
    this.cities = this.statesList.find(res => res.state == state).dist;
  }

  
}
