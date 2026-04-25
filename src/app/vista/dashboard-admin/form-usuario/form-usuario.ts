import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, OnInit} from '@angular/core';
import { FormsModule } from '@angular/forms';


export interface Usuario {
  id: number;
  identificacion: string;
  nombre: string;
  apellido: string;
  telefono: string;
  correo: string;
  rol: string;
  estado: 'Activo' | 'Inactivo';
}


@Component({
  selector: 'app-form-usuario',
  imports: [CommonModule, FormsModule],
  templateUrl: './form-usuario.html',
  styleUrl: './form-usuario.css',
})


export class FormUsuario {

  // Recibe el usuario a editar (null si es nuevo)
  @Input() usuarioEditar: Usuario | null = null;

  // Emite el formulario listo para guardar
  @Output() formularioGuardado = new EventEmitter<Usuario>();

  // Emite cuando el usuario cancela
  @Output() cancelado = new EventEmitter<void>();

  formulario: Usuario = this.vacio();
  modoEdicion = false;

  ngOnInit(): void {
    if (this.usuarioEditar) {
      // Si viene un usuario, copia sus datos al formulario
      this.formulario = { ...this.usuarioEditar };
      this.modoEdicion = true;
    }
  }

  vacio(): Usuario {
    return { id: 0, identificacion: '', nombre: '', apellido: '', telefono: '', correo: '', rol: '', estado: 'Activo' };
  }

  guardar(): void {
    // Solo emite hacia el padre, no sabe nada de la lista
    this.formularioGuardado.emit({ ...this.formulario });
  }

  cancelar(): void {
    this.cancelado.emit();
  }

}
