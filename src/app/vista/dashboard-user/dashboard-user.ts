import { Component } from '@angular/core'
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar';




@Component({
selector:'app-dashboard-user',
standalone:true,
imports: [CommonModule, RouterOutlet,  SidebarComponent], 
templateUrl:'./dashboard-user.html',
styleUrl:'./dashboard-user.css'

})



export class DashboardUserComponent{
//sistema de navegacion entre paginas, inyeccion de dependencias
  constructor(private router: Router){}

  
    cerrarSesion(){

    this.router.navigate(['']);}



  // controla que pantalla se muestra
  vistaActual: string = 'inicio';

  cambiarVista(vista: string) {
    this.vistaActual = vista;
  }

  // Datos de ejemplo para la tabla
  
//departamentos colombia
mostrarformulario = false;

//fecha actual
fechaActual: Date = new Date();
}

