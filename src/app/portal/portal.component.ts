import { Component, Inject } from '@angular/core';
import { ModalService } from '../modal.service';

@Component({
  selector: 'app-portal',
  templateUrl: './portal.component.html',
  styleUrls: ['./portal.component.css'],
})
export class PortalComponent {
  constructor(@Inject(ModalService) readonly modal$$: ModalService) {}
}
