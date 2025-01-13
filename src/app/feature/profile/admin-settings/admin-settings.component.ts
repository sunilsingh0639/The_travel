import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ProfileService } from 'src/app/core/services/profile/profile.service';

@Component({
  selector: 'app-admin-settings',
  templateUrl: './admin-settings.component.html',
  styleUrls: ['./admin-settings.component.scss']
})
export class AdminSettingsComponent {
  selected: string = 'passwordSettings';
  passwordPolicy!:FormGroup;
  isPasswordPolicyDefult: boolean = false
  editButton:boolean = true
  passwordPolicyData!:any
  constructor(private fb: FormBuilder, private service: ProfileService,
    private dialog: MatDialog, private _toast: ToastrService) { }
    ngOnInit() {
      this.initalizatiionFileValidation()
      this.getPasswordPolicy()
    }

    getPasswordPolicy(){
      this.service.getPasswordPolicy().subscribe((res:any)=>{
        this.isPasswordPolicyDefult = true;
        this.passwordPolicyData =res
        this.editButton = false
 console.log(res)
      })
    }


  initalizatiionFileValidation() {
    this.passwordPolicy = this.fb.group({
      passwordMaxAge: [''],
      minLengthOfPassword: [''],
      minLengthOfCharacter: [''],
      minLengthOfDigits:[''],
      minLengthOfUperCase: [''],
  
    })
  }
  addPasswordPolicy(){
if(this.editButton){
  const body= {
    passwordMaxAge:  this.passwordPolicy.value.passwordMaxAge,
      minLength:  this.passwordPolicy.value.minLengthOfPassword,
  
  upperCaseRequired: this.passwordPolicy.value.minLengthOfCharacter,
  specialCharRequired: this.passwordPolicy.value.minLengthOfDigits,
  digitRequired: this.passwordPolicy.value.minLengthOfUperCase,

  }
this.service.upDatePasswordPolicy(body).subscribe((res:any)=>{
  console.log(res)})
  this.getPasswordPolicy()
  this.getPasswordPolicy()
}
else{
  const body= {
    passwordMaxAge:  this.passwordPolicy.value.passwordMaxAge,
      minLength:  this.passwordPolicy.value.minLengthOfPassword,
  
  upperCaseRequired:  this.passwordPolicy.value.minLengthOfCharacter,
  specialCharRequired:  this.passwordPolicy.value.minLengthOfDigits,
  digitRequired:   this.passwordPolicy.value.minLengthOfUperCase,

  }
this.service.passwordPolicy(body).subscribe((res:any)=>{
  console.log(res)
  this.getPasswordPolicy()
  this.getPasswordPolicy()
})
}
 
  }

  edit(){
    this.editButton =true;
    this.isPasswordPolicyDefult =false
    this.editValuePatch()
  }
 
  editValuePatch(){
    this.passwordPolicy.patchValue({
      passwordMaxAge: this.passwordPolicyData.passwordMaxAge,
      minLengthOfPassword: this.passwordPolicyData.minLength,
      minLengthOfCharacter: this.passwordPolicyData.specialCharRequired,
      minLengthOfDigits:this.passwordPolicyData.digitRequired,
      minLengthOfUperCase:this.passwordPolicyData.upperCaseRequired,
    })
  }

}
