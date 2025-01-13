import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appGstinValidator]'
})
export class GstinValidatorDirective {

  constructor(private _el: ElementRef) { }

  @HostListener('input', ['$event']) onInputChange(event:any) {
    const initalValue = this._el.nativeElement.value;

   
    //  this._el.nativeElement.value = initalValue.replace("^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$ ");
     this._el.nativeElement.value = initalValue.toUpperCase();
    if ( initalValue !== this._el.nativeElement.value) {
      event.stopPropagation();
    }
  }

}
