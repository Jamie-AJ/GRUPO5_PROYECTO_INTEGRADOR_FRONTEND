import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-retiro',
  templateUrl: './retiro.component.html',
  styleUrls: ['./retiro.component.css']
})
export class RetiroComponent {
  @Output() retiroCompletado = new EventEmitter<void>();
  
  finalizarRetiro() {
    // Restablecer el estado del componente principal
    this.retiroCompletado.emit();
  }

}
