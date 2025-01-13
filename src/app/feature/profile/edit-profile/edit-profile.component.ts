import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { EmailValidator, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfileService } from 'src/app/core/services/profile/profile.service';
import { ValidateEmail } from 'src/app/shared/shared/directives/emailValidator';
import { OperationService } from 'src/app/core/services/operations/operation.service';
import { SpinnerService } from 'src/app/core/services/spinner/spinner.service';
import { CommonService } from 'src/app/core/services/commom/common.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

  profileData: any;
  editProfileForm!: FormGroup
  changePasswordForm!: FormGroup
  matchPassword = 'form-control'
  allPrivilages: any;
  unmatched : boolean = false ;
  getProfile:any;
  uploadProfilePicture:any;

  constructor(private editProfileService: ProfileService, private _fb: FormBuilder 
    , private _toastr : ToastrService, private uploadService: OperationService,private _spinner: SpinnerService,  private _route: Router,private _common:CommonService) {
  }

  initializeForm() {
    this.editProfileForm = this._fb.group({
      firstName: ['', [Validators.required , Validators.minLength(3)]],
      middleName: [''],
      lastName: ['', [Validators.required,Validators.minLength(3)]],
      gender: ['', Validators.required],
      mobile: ['', [Validators.required,Validators.minLength(10)]],
      email: ['', [Validators.required, ValidateEmail]],
      role: ['', Validators.required]
    });
    this.changePasswordForm = this._fb.group({
      password: ['', [Validators.required,Validators.minLength(8), Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,15}')]],
      newPassword: ['', [Validators.required,Validators.minLength(8), Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,15}')]],
      confirmPassword: ['',
       [Validators.required ,Validators.minLength(8) , Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,15}')]]
    });

  }
  uploadProfilePic(event: any) {
    this._spinner.show();
      let formData = new FormData();
      formData.append('file', event.target.files[0]);
      this.uploadService.uploadDocument(formData).subscribe((res: any) => {  
        
        this.getProfile ={
          imagepath: res.path,
          imagename: res.fileName,
        }
        console.log(this.getProfile)
        this._toastr.success('Profile Picture Uploaded Sucessfully', 'Sucess!');
        this.getProfilePic(this.getProfile)
        this._spinner.hide();
        
       });
  }
 
  get editform() {
    return this.editProfileForm.controls
  }
  get email() {
    return this.editProfileForm.controls['email']
  }
  get password() {
    return this.changePasswordForm.controls['password']
  }
  get newPassword() {
    return this.changePasswordForm.controls['newPassword']
  }
  get confirmPassword() {
    return this.changePasswordForm.controls['confirmPassword']
  }



  ngOnInit(): void {
    this.initializeForm();
    this.getProfileData();
    this.getPrivilage();
    console.log(this.proFileImage,'profile')
   
 
  }

  getProfileData() {
    this.editProfileService.getData()
      .subscribe((res: any) => {
        console.log(res)
        this.profileData = res
        this.editProfileForm.patchValue({
          firstName: this.profileData?.firstName,
          middleName: this.profileData?.middleName,
          lastName: this.profileData?.lastName,
          gender: this.profileData?.gender,
          mobile: this.profileData?.mobile,
          email: this.profileData?.email,
          role: this.profileData?.role,
        })
      })
  }

  getPrivilage(){
    this.editProfileService.getPrivilages()
    .subscribe((res: any)=>{
      this.allPrivilages = res.privilege
    })
  }

  updateData() {
    const data = {
      firstName: this.editProfileForm.value.firstName,
      middleName: this.editProfileForm.value.middleName,
      lastName: this.editProfileForm.value.lastName,
      email: this.editProfileForm.value.email,
      mobile: this.editProfileForm.value.mobile,
      profilePicture: null,
      fileName: null,
      designation: "des",
      module: "modu",
      fullName: this.editProfileForm.value.firstName + ' ' + this.editProfileForm.value.middleName + ' ' + this.editProfileForm.value.lastName,
      gender: this.editProfileForm.value.gender,
      role: "ROLE_ADMIN",
    }
    this.editProfileService.updateProfileData(data)
      .subscribe((res: any) => {
        this._toastr.success('Profile Edited Successfully.' , 'Success')
        this._route.navigate(['app/profile/prpfileComponent'])
      })
  }



  get np() {
    return this.changePasswordForm.controls['newPassword'].value
  }
  get cnp() {
    return this.changePasswordForm.controls['confirmPassword'].value
  }


  changePassword() {
    if (this.np == this.cnp) {
      this.matchPassword = 'form-control is-valid'
      this.unmatched = false
      const body = {
        password: this.changePasswordForm.value.password,
        confirmPassword: this.changePasswordForm.controls['confirmPassword'].value
      }
      this.editProfileService.changePassword(body)
        .subscribe((res: any) => {
          console.log(res)
        });
    }
    else {
      this.matchPassword = 'form-control is-invalid'
      this.unmatched = true
    }
  }
  getProfilePic(getProfile:any){
    this.editProfileService.getProfilePic(getProfile).subscribe((res=>{
      this._common.setProfilePic(res?.profilePictureLink)
      this.uploadProfilePicture = res
      console.log( this.uploadProfilePicture)
    }))
  }
  public get proFileImage():string{
    return this._common.proFileImage
  }


}
