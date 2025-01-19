import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { CommonService } from 'src/app/core/services/commom/common.service';
import { SpinnerService } from 'src/app/core/services/spinner/spinner.service';


function termsValidator(control: FormControl) {
  const accepted = control.value;
  return accepted ? null : { terms: true };
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  hide: boolean = true;
  loginForm!: FormGroup;
  submitted = false;
  showPassword: boolean = false;


  constructor(private _service: AuthService, private _spinner: SpinnerService, private fb: FormBuilder, private _router: Router,
    private _common: CommonService) { }

  ngOnInit(): void {
    this.initlizationLoginForm();
  }
  get f() { return this.loginForm.controls; }

  /*********************
   * Name: initlizationLoginForm
   * @prarm : No
   *********************/
  initlizationLoginForm() {

    this.loginForm = this.fb.group({
      userName: ['', [ Validators.email, Validators.required]],
      password: ['', [Validators.required, Validators.minLength(5)]]


    });
  }
  get password() {
    return this.loginForm.controls['password'];
  }

  get username() {
    return this.loginForm.controls['userName'];
  }

  /*****************************
   * @Name : login
   * @Purpose : this is used to verify login
   * @param : None
   ***************************/
  login() {
    // this._spinner.show();
    // return
    // this._service.login(this.loginForm.value)
    if (this.loginForm.valid) {
      if (this.loginForm.controls['userName'].value == "any101t5@gmail.com" && this.loginForm.controls['password'].value == "Any@123") {
        this._router.navigate(['/app/dashboard'])
      }
      else {
        alert('invalid user name or password');
        this._spinner.hide();
      }
    }
    // .subscribe((res: any) => {
    //   this._common.setToken(res.authToken);
    //   this._common.setTenantId(res.tenantId);
    //   this._common.setLoginUserId(res.id);
    //   this._common.setRole(res.rolesName);
    //   this._common.setSubscriberType(res.subscriberVoLoginResponse.subscriberType);
    //   this._common.setClient(res.client);
    //   if (res.rolesName == 'PORTAL_ADMIN') {
    //     this._router.navigate(['app/home/admin-home'])
    //   } else {
    //     this._router.navigate(['app/home'])
    //   }
    //   this._spinner.hide();
    // });
  }
}
