import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-tabla-predios',
  imports: [CommonModule],
  standalone:true,
  templateUrl: './tabla-predios.html',
  styleUrl: './tabla-predios.css',
})
export class TablaPredios {

    predios = [

    {
      nombre: "La Esperanza",
      municipio: "Bucaramanga",
      area: 12.5,
      estado: "Activo"
    },

    {
      nombre: "El Porvenir",
      municipio: "Piedecuesta",
      area: 8.3,
      estado: "Activo"
    },

    {
      nombre: "Villa Verde",
      municipio: "Floridablanca",
      area: 20.1,
      estado: "Visita Pendiente"
    }

  ]
}
