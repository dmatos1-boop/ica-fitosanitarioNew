import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-exito',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './exito.html',
  styleUrl: './exito.css'
})
export class ExitoComponent {

  // Mensaje personalizable desde cada módulo
  @Input() mensaje: string = '¡Guardado exitosamente!';

  // Emite cuando el usuario presiona "Volver"
  @Output() volver = new EventEmitter<void>();
}