import { Component } from '@angular/core';
import { TablaInspeccion } from '../tabla-inspeccion/tabla-inspeccion';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-view-inspecciones',
  imports: [TablaInspeccion,RouterLink],
  templateUrl: './view-inspecciones.html',
  styleUrl: './view-inspecciones.css',
})
export class ViewInspecciones {}
