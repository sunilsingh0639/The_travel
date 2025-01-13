import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { OperationService } from './../../../core/services/operations/operation.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { CommonService } from 'src/app/core/services/commom/common.service';

@Component({
  selector: 'app-add-recon',
  templateUrl: './add-recon.component.html',
  styleUrls: ['./add-recon.component.scss'],
})
export class AddReconComponent implements OnInit {
  hideClient!:boolean
  allClients: any;
  reconForm!: FormGroup;
  selectedClient: any;
  editMode: any;
  selectedId: any;
  selectedRecon: any;

  constructor(private _common:CommonService,
    private addReconService: OperationService,
    private _fb: FormBuilder,
    private _route: Router,
    private _router: ActivatedRoute,
    private _toastr : ToastrService,
    private authService : AuthService
  ) {}

  ngOnInit(): void {
    if(this._common.subsType =='INDIVIDUAL_COMPANY'){
      this.hideClient =true
    } else{
      this.hideClient =false
    }
    if (this._route.url.includes('edit-recon')) {
      this.editMode = true;
      this.selectedId = this._router.snapshot.paramMap.get('id');
    }
    if(localStorage.getItem('subsType') === "TAX_PROFESSIONAL"){
        this.getClients();
      }
    this.initializeReconForm();
  }

  initializeReconForm() {
    this.reconForm = this._fb.group({
      name: ['', [Validators.required ,Validators.minLength(3)]],
      clientId: ['', [Validators.required]],
      description: ['',[ Validators.required , Validators.minLength(12)]],
      gstin: ['', [Validators.required,  Validators.minLength(15), Validators.pattern("^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$ ")]],
    });
    this.reconForm.controls['clientId'].valueChanges.subscribe((res) => {
      if (res) {
        this.addReconService.getClientById(res).subscribe((res: any) => {
          console.log(res);
          this.selectedClient = res;
        });
      }
    });
    if (this.editMode) {
      this.getSelectedRecons();
    }
    if(this._common.subsType =='INDIVIDUAL_COMPANY'){
      this.reconForm.patchValue({
        clientId: this._common.client.id
      })
      this.selectedClient =  this._common.client.id;
    } 
  }
  get form() {
    return this.reconForm.controls;
  }

  getClients() {
    this.addReconService.getClients().subscribe((res: any) => {
      console.log(res);
      this.allClients = res.data;
    });
  }

  getSelectedRecons() {
    this.addReconService.getReconsbyId(this.selectedId).subscribe((res:any) => {
      this.selectedRecon = res;
      const client = this.allClients.find((item:any) => {
        return item.clientName == this.selectedRecon?.data[0].client.clientName
      })
      this.reconForm.patchValue({
        clientId: client.id,
        gstin: this.selectedRecon?.data[0].gstin,
        name: this.selectedRecon?.data[0].name,
        description: this.selectedRecon?.data[0].description,
      });
    });
  }

  addRecon() {
    if (this.editMode) {
      const body = {   
        id: this.selectedRecon?.data[0].id,
        name: this.reconForm.value.name,
        gstin: this.reconForm.value.gstin,
        description: this.reconForm.value.description,
        clientId: this.selectedClient.id ,
      };
      this.addReconService.editRecons(body).subscribe((res: any) => {
        console.log(res);
        this._toastr.success('Recon Edited Successfilly' , 'Success')
      });
    } else {
      const body = {
        name: this.reconForm.value.name,
        gstin: this.reconForm.value.gstin,
        description: this.reconForm.value.description,
        clientId: this.selectedClient.id 
      };
      this.addReconService.addRecons(body).subscribe((res: any) => {
        console.log(res);
        this._toastr.success('Recon Added Successfilly' , 'Success')
      });
    }
    this._route.navigate(['/app/operations/recon']);
  }
}
