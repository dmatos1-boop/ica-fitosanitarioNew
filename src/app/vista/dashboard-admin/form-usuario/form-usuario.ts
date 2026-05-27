import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
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
  nroTarjetaProfesional?: string;
}

@Component({
  selector: 'app-form-usuario',
  imports: [CommonModule, FormsModule],
  templateUrl: './form-usuario.html',
  styleUrl: './form-usuario.css',
})
export class FormUsuario implements OnInit {

  @Input() usuarioEditar: Usuario | null = null;
  @Output() formularioGuardado = new EventEmitter<Usuario>();
  @Output() cancelado = new EventEmitter<void>();

  formulario: Usuario = this.vacio();
  modoEdicion = false;
  intentoEnvio = false;

  ngOnInit(): void {
    if (this.usuarioEditar) {
      this.formulario = { ...this.usuarioEditar };
      this.modoEdicion = true;
    }
  }

  vacio(): Usuario {
    return { id: 0, identificacion: '', nombre: '', apellido: '', telefono: '', correo: '', rol: '', estado: 'Activo' };
  }

  guardar(): void {
    this.intentoEnvio = true;
    if (!this.formulario.identificacion || !this.formulario.nombre ||
        !this.formulario.apellido || !this.formulario.correo || !this.formulario.rol) {
      return;
    }
    this.formularioGuardado.emit({ ...this.formulario });
  }

  cancelar(): void {
    this.cancelado.emit();
  }
}