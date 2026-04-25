//ts creado para el fin de usar en formularios que solicitan departamentos
import { inject, Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class DepartamentosService{


private departamentos: string []= [

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

getDepartamentos(): string[] {
    return  this.departamentos;
}

}