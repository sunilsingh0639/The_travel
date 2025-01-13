import { AbstractControl, Validators } from '@angular/forms';



export function ValidateEmail(control: AbstractControl) {
  
  let emailRegEx = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/

  control.addValidators(Validators.pattern(emailRegEx))

  return ;
}


