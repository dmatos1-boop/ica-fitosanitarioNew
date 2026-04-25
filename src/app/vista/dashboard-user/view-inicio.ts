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

  accesos = [
    { label:"Predios Aprobados", valor:"2",icono:"⛰️", date:"jueves, 09 de abril de 2026", ruta:'/usuario/predio'},
    { label:"Lotes Aprobados", valor:"3", icono:"🏠", date:"jueves, 09 de abril de 2026", ruta:'/usuario/predio'},
    { label:"Lugares de Producción", valor:"2", icono:"🏭", date:"jueves, 09 de abril de 2026", ruta:' /usuario/produccion'},
    { label:"Inspecciones Confirmadas", valor:"4", icono:"📅",date:"jueves, 09 de abril de 2026", ruta:'/usuario/visita'},
    

  ];

constructor (private router:Router){}
Dir(ruta:String){
  this.router.navigate([ruta])
}
  
}
