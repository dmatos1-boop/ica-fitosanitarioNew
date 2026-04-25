import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from "@angular/router";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view-form',
  imports: [RouterLink, CommonModule],
  templateUrl: './view-form.html',
  styleUrl: './view-form.css',
})
export class ViewForm {

  departamentos = [

"Amazonas",
"Antioquia",
"Arauca",
"Atlántico",
"Bolívar",
"Boyacá",
"Caldas",
"Caquetá",
"Casanare",
"Cauca",
"Cesar",
"Chocó",
"Córdoba",
"Cundinamarca",
"Guainía",
"Guaviare",
"Huila",
"La Guajira",
"Magdalena",
"Meta",
"Nariño",
"Norte de Santander",
"Putumayo",
"Quindío",
"Risaralda",
"San Andrés y Providencia",
"Santander",
"Sucre",
"Tolima",
"Valle del Cauca",
"Vaupés",
"Vichada"

];
}
