import { Component } from '@angular/core';
import { RouterLink , Router} from "@angular/router";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ExitoComponent } from '../exito/exito';


@Component({
  selector: 'app-view-form',
  standalone:true,
  imports: [RouterLink, CommonModule, FormsModule,ExitoComponent],
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

//funciones que usaremos para tomar el municipio y el departamento 
municipios: string[] = [];

departamentoSeleccionado: string = '';

municipioSeleccionado: string = ''


constructor(private router: Router) {}

exito = false; //para la vista exito no se muestre aun

//mostramos la vista exito luego de enviar el formulario
guardarFormulario() {

  this.exito = true;

}
// el boton de volver al incio
volverListado() {

  this.router.navigate(['/usuario/predio']);

}

// funcion para que cargue el municipio segun el departamento
cargarMunicipios() {

  this.municipios =
    this.municipiosData[this.departamentoSeleccionado] || [];

  this.municipioSeleccionado = '';

}

// municipios de prueba 
municipiosData: any = {

  Amazonas: [
    "Leticia",
    "Puerto Nariño"
  ],

  Antioquia: [
    "Medellín",
    "Envigado",
    "Bello",
    "Itagüí",
    "Rionegro",
    "Apartadó",
    "Turbo",
    "Santa Fe de Antioquia"
  ],

  Arauca: [
    "Arauca",
    "Arauquita",
    "Saravena",
    "Tame"
  ],

  Atlántico: [
    "Barranquilla",
    "Soledad",
    "Malambo",
    "Puerto Colombia",
    "Sabanalarga"
  ],

  Bolívar: [
    "Cartagena",
    "Magangué",
    "Turbaco",
    "Arjona",
    "Mompox"
  ],

  Boyacá: [
    "Tunja",
    "Duitama",
    "Sogamoso",
    "Chiquinquirá",
    "Paipa"
  ],

  Caldas: [
    "Manizales",
    "La Dorada",
    "Chinchiná",
    "Villamaría"
  ],

  Caquetá: [
    "Florencia",
    "San Vicente del Caguán",
    "Puerto Rico"
  ],

  Casanare: [
    "Yopal",
    "Aguazul",
    "Villanueva",
    "Paz de Ariporo"
  ],

  Cauca: [
    "Popayán",
    "Santander de Quilichao",
    "Puerto Tejada"
  ],

  Cesar: [
    "Valledupar",
    "Aguachica",
    "Bosconia"
  ],

  Chocó: [
    "Quibdó",
    "Istmina",
    "Condoto"
  ],

  Córdoba: [
    "Montería",
    "Cereté",
    "Lorica",
    "Sahagún"
  ],

  Cundinamarca: [
    "Bogotá",
    "Soacha",
    "Chía",
    "Zipaquirá",
    "Facatativá",
    "Girardot"
  ],

  Guainía: [
    "Inírida"
  ],

  Guaviare: [
    "San José del Guaviare",
    "Calamar"
  ],

  Huila: [
    "Neiva",
    "Pitalito",
    "Garzón",
    "La Plata"
  ],

  "La Guajira": [
    "Riohacha",
    "Maicao",
    "Uribia",
    "Fonseca"
  ],

  Magdalena: [
    "Santa Marta",
    "Ciénaga",
    "Fundación"
  ],

  Meta: [
    "Villavicencio",
    "Acacías",
    "Granada",
    "Puerto López"
  ],

  Nariño: [
    "Pasto",
    "Tumaco",
    "Ipiales",
    "Túquerres"
  ],

  "Norte de Santander": [
    "Cúcuta",
    "Ocaña",
    "Pamplona",
    "Villa del Rosario"
  ],

  Putumayo: [
    "Mocoa",
    "Puerto Asís",
    "Orito"
  ],

  Quindío: [
    "Armenia",
    "Calarcá",
    "Montenegro",
    "Quimbaya"
  ],

  Risaralda: [
    "Pereira",
    "Dosquebradas",
    "Santa Rosa de Cabal"
  ],

  "San Andrés y Providencia": [
    "San Andrés",
    "Providencia"
  ],

  Santander: [
    "Bucaramanga",
    "Floridablanca",
    "Girón",
    "Piedecuesta",
    "Barrancabermeja",
    "San Gil",
    "Socorro"
  ],

  Sucre: [
    "Sincelejo",
    "Corozal",
    "Sampués"
  ],

  Tolima: [
    "Ibagué",
    "Espinal",
    "Melgar",
    "Honda"
  ],

  "Valle del Cauca": [
    "Cali",
    "Palmira",
    "Buenaventura",
    "Tuluá",
    "Cartago"
  ],

  Vaupés: [
    "Mitú"
  ],

  Vichada: [
    "Puerto Carreño"
  ]

};
}
