import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { fromEvent } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import { ModalService } from './modal.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  escKey$;

  constructor(
    @Inject(ModalService) readonly modal$$: ModalService,
    @Inject(DOCUMENT) private readonly document
  ) {
    this.escKey$ = fromEvent<KeyboardEvent>(this.document, 'keydown')
      .pipe(
        filter((event) => {
          return event.key === 'Escape';
        }),
        tap(() => {
          this.modal$$.next(null);
        })
      )
      .subscribe();
  }
}
