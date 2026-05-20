import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from "@angular/router";



@Component({
  selector: 'app-view-inicio',
  imports: [CommonModule, RouterLink ],
  templateUrl: './view-inicio.html',
  styleUrl: './view-inicio.css',
})
export class ViewInicio {

  nombreProd= 'Henry Renul';

  accesos = [
  {
    label:"Predios Aprobados",
    valor:"2",
    icono:"⛰️",
    date:"jueves, 09 de abril de 2026",
    ruta:'/usuario/predio'
  },
  {
    label:"Lotes Aprobados",
    valor:"3",
    icono:"🏠",
    date:"jueves, 09 de abril de 2026",
    ruta:'/usuario/predio'
  },
  {
    label:"Lugares de Producción",
    valor:"2",
    icono:"🏭",
    date:"jueves, 09 de abril de 2026",
    ruta:'/usuario/produccion'
  },
  {
    label:"Inspecciones Confirmadas",
    valor:"4",
    icono:"📅",
    date:"jueves, 09 de abril de 2026",
    ruta:'/usuario/visita'
  }
];

constructor (private router:Router){}
Dir(ruta:String){
  this.router.navigate([ruta])
}

fechaActual: Date = new Date();

  // ── Saludo dinámico según la hora del día 
  get saludo(): string {
    const hora = this.fechaActual.getHours();
    if (hora < 12)  return 'Buenos días';
    if (hora < 18)  return 'Buenas tardes';
    return 'Buenas noches';
  }
  
}
