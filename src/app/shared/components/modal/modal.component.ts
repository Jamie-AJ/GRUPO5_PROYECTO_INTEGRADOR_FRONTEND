import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {

  @Input('show') display!: boolean;
  @Output() selection: EventEmitter<string> = new EventEmitter<string>();
  subject = new Subject<boolean>();

  action(value:boolean) {
    this.selection.emit('close');
    // this.bsModalRef.hide();
    this.subject.next(value);
    this.subject.complete();
  }
}
