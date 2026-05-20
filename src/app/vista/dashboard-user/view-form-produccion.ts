import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ExitoComponent } from '../exito/exito';



@Component({
  selector: 'app-view-form-produccion',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './view-form-produccion.html',
  styleUrl: './view-form-produccion.css',
})
export class ViewFormProduccion {

  // Simulación de predios (esto luego viene del backend)
  predios = [
    { id: 1, nombre: 'La Esperanza' },
    { id: 2, nombre: 'El porvenir' },
   
  ];

  formData = {
    predioId: '',
    cultivo: '',
    area: null,
    tipoProduccion: '',
    fechaSiembra: '',
    fechaCosecha: '',
    fuenteAgua: '',
    riego: '',
    cantidad: null,
    destino: ''
  };

  registrarProduccion() {
    console.log('Datos enviados:', this.formData);

    // Aquí luego conecta con la API
    
  }
}
