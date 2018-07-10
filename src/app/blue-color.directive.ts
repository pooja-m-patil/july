import { Directive,ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[blueColored]'
})
export class BlueColorDirective {

  constructor(element:ElementRef) {
      element.nativeElement.style.color="blue";
  }

  @HostListener(':click',['$event'])
    elemClicked(elem){
      console.log('clicked',elem);
    }
}
