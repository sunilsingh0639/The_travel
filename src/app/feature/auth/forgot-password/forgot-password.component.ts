import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { SpinnerService } from 'src/app/core/services/spinner/spinner.service';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/core/services/commom/common.service';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


function termsValidator(control: FormControl) {
  const accepted = control.value;
  return accepted ? null : { terms: true };
}

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})

export class ForgotPasswordComponent implements OnInit {
  hide: boolean = true;
  forgetPasswordForm!: FormGroup;
  submitted = false;

  constructor(
    private _service: AuthService, 
    private _spinner: SpinnerService, 
    private fb: FormBuilder, 
    private _router: Router,
    private _common: CommonService, 
    private _toast: ToastrService
    ) {}

  ngOnInit(): void {
    this.initlizationForgetPasswordForm();
  }

  get f() { return this.forgetPasswordForm.controls; }

  /*********************
  * Name: initlizationForgetPasswordForm
  * @prarm : No
  *********************/
  initlizationForgetPasswordForm() {

    this.forgetPasswordForm = this.fb.group({
      email: ['', [Validators.required]],
      acceptTerms: [true, [Validators.requiredTrue, termsValidator]]


    });
  }

  get email() {
    return this.forgetPasswordForm.controls['email'];
  }

  /*****************************
   * @Name : login
   * @Purpose : this is used to verify login
   * @param : None
   ***************************/
  reset() {
    this._spinner.show();
    console.log('this.forgetPasswordForm.value ', this.forgetPasswordForm.value);
    this._service.forgotPassword(this.forgetPasswordForm.value)
      .subscribe((res: any) => {
        console.log('Response=> ', res);
        this._router.navigate(['/'])
        this._toast.info('Temporary password created successfully. Please check your mail. !!','Info!');
        this._spinner.hide();
      });
  }


}
