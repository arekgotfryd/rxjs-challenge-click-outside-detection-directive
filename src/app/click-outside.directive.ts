import { Directive, ElementRef, HostListener, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { filter, tap, withLatestFrom } from 'rxjs/operators';

@Directive({
  selector: '[clickOutside]',
})
export class ClickOutsideDirective {
  @Output() clickOutside = new Subject<boolean>();
  mouseDownOutside$ = new Subject<boolean>();
  mouseUpOutside$ = new Subject<boolean>();
  clickOutsideSub;
  constructor(private elementRef: ElementRef) {
    this.clickOutsideSub = this.mouseUpOutside$
      .pipe(
        withLatestFrom(this.mouseDownOutside$),
        filter(([mouseUpOutside, mouseDownOutside]) => {
          return mouseDownOutside && mouseUpOutside;
        }),
        tap(() => {
          this.clickOutside.next(true);
        })
      )
      .subscribe();
  }

  @HostListener('window:mousedown', ['$event'])
  mousedown(event) {
    this.elementRef.nativeElement.contains(event.target)
      ? this.mouseDownOutside$.next(false)
      : this.mouseDownOutside$.next(true);
  }

  @HostListener('window:mouseup', ['$event'])
  mouseup(event) {
    this.elementRef.nativeElement.contains(event.target)
      ? this.mouseUpOutside$.next(false)
      : this.mouseUpOutside$.next(true);
  }

  ngOnDestroy() {
    this.clickOutsideSub?.unsubscribe();
  }
}
