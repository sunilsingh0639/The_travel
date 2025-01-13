import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { SpinnerService } from 'src/app/core/services/spinner/spinner.service';

function passwordMatchValidator(control: AbstractControl): {[key: string]: boolean} | null {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');
  if (password!.pristine || confirmPassword!.pristine) {
    return null;
  }
  return password && confirmPassword && password.value !== confirmPassword.value ? { 'mismatch': true } : null;
}

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent implements OnInit {
  resetPasswordForm!: FormGroup;
  mismatch: any = {};
  constructor(private _service: AuthService, private _fb: FormBuilder,
    private _spinner: SpinnerService, private _router: Router,private _toast: ToastrService) {}
  ngOnInit(): void {
    this.initlizationResetPasswordForm();
  }

  initlizationResetPasswordForm() {
    this.resetPasswordForm = this._fb.group({
      userName: ['', [Validators.required]],
      oldPassword: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
    }, { validator: passwordMatchValidator });
  }

  resetPassword(){
    this._spinner.show();
    this._service.resetPassword(this.resetPasswordForm.value)
    .subscribe(res => {
      this._spinner.hide();
      this._toast.success('Password change sucessfully Please login with new password.', 'Success!');
      this._router.navigate(['/'])
    })
  }
}
