import { CommonModule } from '@angular/common';
import { TablaProduccion } from '../tabla-produccion/tabla-produccion';
import { RouterLink } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-view-produccion',
  imports: [CommonModule,TablaProduccion,RouterLink],
  templateUrl: './view-produccion.html',
  styleUrl: './view-produccion.css',
})
export class ViewProduccion {

  
}


