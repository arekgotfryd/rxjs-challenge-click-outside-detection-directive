import {
  Directive,
  ElementRef,
  HostListener,
  Inject,
  Input,
} from '@angular/core';
import { Subject } from 'rxjs';
import { filter, tap, withLatestFrom } from 'rxjs/operators';
import { ModalService } from './modal.service';

@Directive({
  selector: '[clickOutsideDetection]',
})
export class ClickOutsideDetectionDirective {
  //classname of your modal
  @Input() clickOutsideDetection;
  mouseDownOutside$ = new Subject<boolean>();
  mouseUpOutside$ = new Subject<boolean>();
  modal;
  clickOutsideSub;
  constructor(
    private elementRef: ElementRef,
    @Inject(ModalService) readonly modal$$: ModalService
  ) {
    this.clickOutsideSub = this.mouseUpOutside$
      .pipe(
        withLatestFrom(this.mouseDownOutside$),
        filter(([mouseUpOutside, mouseDownOutside]) => {
          return mouseDownOutside && mouseUpOutside;
        }),
        tap(() => {
          this.modal$$.next(null);
        })
      )
      .subscribe();
  }

  @HostListener('mousedown', ['$event'])
  mousedown(event) {
    if (this.modal.contains(event.target)) {
      this.mouseDownOutside$.next(false);
    } else {
      this.mouseDownOutside$.next(true);
    }
  }

  @HostListener('mouseup', ['$event'])
  mouseup(event) {
    if (this.modal.contains(event.target)) {
      this.mouseUpOutside$.next(false);
    } else {
      this.mouseUpOutside$.next(true);
    }
  }

  ngAfterViewInit() {
    if (this.clickOutsideDetection) {
      this.modal = this.elementRef.nativeElement.querySelector(
        '.' + this.clickOutsideDetection
      );
    } else {
      this.modal = this.elementRef.nativeElement.querySelector('.modal');
    }
  }

  ngOnDestroy() {
    this.clickOutsideSub?.unsubscribe();
  }
}
