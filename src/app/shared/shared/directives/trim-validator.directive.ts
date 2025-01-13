import { NgControl } from '@angular/forms';
import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appTrimValidator]'
})
export class TrimValidatorDirective {

  constructor(private el: ElementRef,
    private control: NgControl) {
  }

  @HostListener('input', ['$event']) onInputChange(event:any) {
    if(this.el.nativeElement.value.trim().length == 0){
      this.control.control?.setValue(this.el.nativeElement.value.trim())
    }
  }

}
