import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private showModalSubject: Subject<boolean> = new Subject<boolean>();
  showModal$: Observable<boolean> = this.showModalSubject.asObservable();

  constructor() { }

  setShowModal(show: boolean): void {
    this.showModalSubject.next(show);
  }
  closeShowModal(): void { 
    this.showModalSubject.next(false);
  }
}