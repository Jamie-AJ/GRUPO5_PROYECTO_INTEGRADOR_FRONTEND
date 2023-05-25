import { Component, EventEmitter, Output, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-deposito',
  templateUrl: './deposito.component.html',
  styleUrls: ['./deposito.component.css']
})
export class DepositoComponent {
  @Output() depositoCompletado = new EventEmitter<void>();
  private router = inject(Router);

  finalizarDeposito() {
    // Restablecer el estado del componente principal
    this.depositoCompletado.emit();
  }
}
