import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {  RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar';

@Component({
  selector: 'app-dashboard-tecnico',
  standalone: true,
  imports:[RouterOutlet, CommonModule, SidebarComponent],
  templateUrl: './dashboard-tecnico.html',
  styleUrl: './dashboard-tecnico.css',
})
export class DashboardTecnicoComponent {

  //fecha actual
fechaActual: Date = new Date();
}
