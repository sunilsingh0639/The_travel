import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ClientService } from 'src/app/core/services/clients/client.service';
import { cities } from 'src/app/modal/cities';
import { ValidateEmail } from 'src/app/shared/shared/directives/emailValidator';

@Component({
  selector: 'app-add-new',
  templateUrl: './add-new.component.html',
  styleUrls: ['./add-new.component.scss']
})
export class AddNewComponent implements OnInit {
  editMode: boolean = false;
  constructor(private fb: FormBuilder, private client_service: ClientService,
    private _router: ActivatedRoute, private _route: Router,
    private _toast: ToastrService) {
  }
  addressForm!: FormGroup
  addClientForm!: FormGroup
  selectedId: any
  selectedUser: any
  statesList: any[] = cities;
  cities: any[] = [];
  ngOnInit(): void {
    this.intialization();
    if (this._route.url.includes('edit-client')) {
      this.editMode = true;
      this.selectedId = this._router.snapshot.paramMap.get('id');
      this.updateData();
    }
  
  }

  /************************************************* 
   addClientForm ==== this is a reactive form
   it use to for add new client
  *************************************************/
  intialization() {
    this.addClientForm = this.fb.group({
      clientName: ['', [Validators.required]],
      contactPerson: ['', [Validators.required]],
      contactNumber: ['', [Validators.required]],
      email: ['', [Validators.required, ValidateEmail]],
      address: this.fb.array([])
    })
    this.addressData();
  }
  get address() {
    return this.addClientForm.controls['address'] as FormArray;
  }

  get editform() {
    return this.addClientForm.controls
  }
  get email() {
    return this.addClientForm.controls['email']
  }
  get editAddressForm() {
    return this.addressForm.controls
  }




  addressData(): void {
    this.addressForm = this.fb.group({
      addressLine1: ['', [Validators.required]],
      addressLine2: [''],
      area: ['', [Validators.required]],
      state: ['', [Validators.required]],
      city: ['', [Validators.required]],
      zipCode: ['', [Validators.required]]
    })
    this.address.push(this.addressForm);
  }


  /************************************************************
    * clientById  object it is use to get selected client by id
    *********************************************************/
  public clientById: any
  /***************************************
      * upDateData function  use  for get client id wise 
      * and use patchvalue from listcomponent data
      ******************************************/
     
  updateData() {

    if (this.editMode) {
      this.client_service.getClientById(this.selectedId).subscribe((res: any) => {
        this.clientById = res
        const state = res.address && res.address.state ? res.address.state : '';
        if(state)
          this.cities = this.statesList.find(res => res.state == state).dist;
        this.addClientForm.patchValue({
          clientName: res.clientName,
          contactPerson: res.contactPerson,
          contactNumber: res.contactNumber,
          email: res.email,
        });
        this.addressForm.patchValue({

          addressLine1: res.address.addressLine1,
          addressLine2: res.address.addressLine2,
          area: res.address.area,
          state: state,
          city :res.address.city,
          zipCode: res.address.zipCode,
       
        }


        );

      })
    }
  }
  addClientData() {

    if (this.editMode) {
      const editBody = {
        id: this.selectedId,
        active: true,
        clientName: this.addClientForm.value.clientName,
        contactPerson: this.addClientForm.value.contactPerson,
        contactNumber: this.addClientForm.value.contactNumber,
        email: this.addClientForm.value.email,
        address: {
          id: this.selectedId,
          active: true,
          addressLine1: this.addressForm.value.addressLine1,
          addressLine2: this.addressForm.value.addressLine2,
          area: this.addressForm.value.area,
          city: this.addressForm.value.city,
          state: this.addressForm.value.state,
          zipCode: this.addressForm.value.zipCode
        }
      }
      this.client_service.updateClient(editBody).subscribe((res: any) => {
        this._toast.success('Client deatils updated successfully.', 'Success!')
        this._route.navigate(['app/clients'])

      })

      this.editMode = false;
    }
    else {
      const body = {

        active: true,
        clientName: this.addClientForm.value.clientName,
        contactPerson: this.addClientForm.value.contactPerson,
        contactNumber: this.addClientForm.value.contactNumber,
        email: this.addClientForm.value.email,
        address: {

          active: true,
          addressLine1: this.addressForm.value.addressLine1,
          addressLine2: this.addressForm.value.addressLine2,
          area: this.addressForm.value.area,
          city: this.addressForm.value.city,
          state: this.addressForm.value.state,
          zipCode: this.addressForm.value.zipCode
        }
      }
      this.client_service.addClient(body).subscribe((res: any) => {
        this._toast.success('Client deatils saved successfully.', 'Success!')
        this._route.navigate(['app/clients'])
      })
    }
  }
  get clientform() {
    return this.addClientForm.controls
  }
  get addresform() {
    return this.addressForm.controls
  }

  // get email() {
  //   return this.addClientForm.controls['email']
  // }

  cancel() {
    this._route.navigate(['app/clients'])
    // this.editMode = false;
    // this.addClientForm.reset();
  }
  filterCities(state: string){
    this.cities = this.statesList.find(res => res.state == state).dist;
  }
}





