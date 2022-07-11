import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { PortalComponent } from './portal/portal.component';
import { ModalService } from './modal.service';
import { ClickOutsideDetectionDirective } from './click-outside-detection.directive';

@NgModule({
  imports: [BrowserModule, FormsModule],
  declarations: [AppComponent, PortalComponent, ClickOutsideDetectionDirective],
  bootstrap: [AppComponent],
  providers: [ModalService],
})
export class AppModule {}
