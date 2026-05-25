import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ExitoComponent } from '../exito/exito';

@Component({
  selector: 'app-form-inspeccion',
  standalone: true,
  imports: [CommonModule, ExitoComponent, RouterLink,FormsModule],
  templateUrl: './form-inspeccion.html',
  styleUrl: './form-inspeccion.css',
})
export class FormInspeccion {

  exito = false;

  tipoInspeccion = '';
  predioSeleccionado = '';
  fechaCita = '';
  horaCita = '';
  observaciones = '';

  predios = [
    'El Porvenir',
    'La Esperanza',
    'Villa Verde'
  ];

  constructor(private router: Router) {}

  guardarCita() {

    this.exito = true;

  }

  volverListado() {

    this.router.navigate(['/usuario/visita']);

  }

}