import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appNumberOnly]'
})
export class NumberOnlyDirective {
  constructor(private _el: ElementRef) { }

  @HostListener('input', ['$event']) onInputChange(event: any) {
    const initalValue = event.target.value;

    event.target.value = initalValue.replace(/[^0-9]*/g, '');
    if (initalValue !== event.target.value) {
      event.stopPropagation();
    }
  }
}