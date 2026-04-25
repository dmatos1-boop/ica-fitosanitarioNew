import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-tabla-inspeccion',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './tabla-inspeccion.html',
  styleUrl: './tabla-inspeccion.css', 
})
export class TablaInspeccion {

  citas = [

    {
      nombre: "La Esperanza",
      inspeccion: "Fitosanitaria",
      fecha: new Date('2026-04-10T14:30:00'),
      estado: "Pendiente"
    },

    {
      nombre: "El porvenir",
      inspeccion: "Inspeccion",
      fecha: new Date('2026-04-01T09:30:00'),
      estado: "Realizada"
    },

    {
      nombre: "Villa verde",
      inspeccion: "Fitosanitaria",
      fecha: new Date('2026-04-20T12:30:00'),
      estado: "Pendiente"
    },

    {
      nombre: "El porvenir",
      inspeccion: "Inspeccion",
      fecha: new Date('2026-04-01T09:30:00'),
      estado: "Realizada"
    },

    {
      nombre: "El porvenir",
      inspeccion: "Inspeccion",
      fecha: new Date('2026-04-01T09:30:00'),
      estado: "Realizada"
    },

    {
      nombre: "El porvenir",
      inspeccion: "Inspeccion",
      fecha: new Date('2026-04-01T09:30:00'),
      estado: "Realizada"
    }

  ]

}
