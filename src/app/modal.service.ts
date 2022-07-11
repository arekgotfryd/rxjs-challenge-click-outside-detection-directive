import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable()
export class ModalService extends Subject<string | null> {}
