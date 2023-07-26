import { EventEmitter, Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  $modal:EventEmitter<boolean> = new EventEmitter<boolean>();
  
}