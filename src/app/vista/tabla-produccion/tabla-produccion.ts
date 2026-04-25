import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-tabla-produccion',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './tabla-produccion.html',
  styleUrl: './tabla-produccion.css',
})
export class TablaProduccion {
  predios = [

    {
      nombre: "La Esperanza",
      municipio: "Bucaramanga",
      area_sembrada: 4.5,
      producto: "Papa"
    },

    {
      nombre: "El Porvenir",
      municipio: "Piedecuesta",
      area_sembrada: 2.3,
      producto: "Zanahoria"
    },

    {
      nombre: "Villa Verde",
      municipio: "Floridablanca",
      area_sembrada: 10.1,
      producto: "Maiz"
    },
    {
      nombre: "La Esperanza",
      municipio: "Bucaramanga",
      area_sembrada: 4.5,
      producto: "Papa"
    },
    {
      nombre: "La Esperanza",
      municipio: "Bucaramanga",
      area_sembrada: 4.5,
      producto: "Papa"
    }

  ]
}
