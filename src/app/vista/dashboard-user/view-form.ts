import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { RouterLink, Router } from "@angular/router";
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ExitoComponent } from '../exito/exito';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-view-form',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule, ExitoComponent],
  templateUrl: './view-form.html',
  styleUrl: './view-form.css',
})
export class ViewForm implements OnInit {

  private apiUrl = 'http://localhost:3000';
  exito = false;
  error = '';
  cargando = false;

  departamentoSeleccionado = '';
  municipioSeleccionado = '';
  municipios: string[] = [];

  formData = {
    nombre: '',
    departamento: '',
    municipio: '',
    extension: null as number | null,
    direccion: ''
  };

  departamentos = [
    "Amazonas", "Antioquia", "Arauca", "Atlántico", "Bolívar", "Boyacá",
    "Caldas", "Caquetá", "Casanare", "Cauca", "Cesar", "Chocó", "Córdoba",
    "Cundinamarca", "Guainía", "Guaviare", "Huila", "La Guajira", "Magdalena",
    "Meta", "Nariño", "Norte de Santander", "Putumayo", "Quindío", "Risaralda",
    "San Andrés y Providencia", "Santander", "Sucre", "Tolima", "Valle del Cauca",
    "Vaupés", "Vichada"
  ];

  municipiosData: any = {
    Amazonas: ["Leticia", "Puerto Nariño"],
    Antioquia: ["Medellín", "Envigado", "Bello", "Itagüí", "Rionegro", "Apartadó", "Turbo", "Santa Fe de Antioquia"],
    Arauca: ["Arauca", "Arauquita", "Saravena", "Tame"],
    Atlántico: ["Barranquilla", "Soledad", "Malambo", "Puerto Colombia", "Sabanalarga"],
    Bolívar: ["Cartagena", "Magangué", "Turbaco", "Arjona", "Mompox"],
    Boyacá: ["Tunja", "Duitama", "Sogamoso", "Chiquinquirá", "Paipa"],
    Caldas: ["Manizales", "La Dorada", "Chinchiná", "Villamaría"],
    Caquetá: ["Florencia", "San Vicente del Caguán", "Puerto Rico"],
    Casanare: ["Yopal", "Aguazul", "Villanueva", "Paz de Ariporo"],
    Cauca: ["Popayán", "Santander de Quilichao", "Puerto Tejada"],
    Cesar: ["Valledupar", "Aguachica", "Bosconia"],
    Chocó: ["Quibdó", "Istmina", "Condoto"],
    Córdoba: ["Montería", "Cereté", "Lorica", "Sahagún"],
    Cundinamarca: ["Bogotá", "Soacha", "Chía", "Zipaquirá", "Facatativá", "Girardot"],
    Guainía: ["Inírida"],
    Guaviare: ["San José del Guaviare", "Calamar"],
    Huila: ["Neiva", "Pitalito", "Garzón", "La Plata"],
    "La Guajira": ["Riohacha", "Maicao", "Uribia", "Fonseca"],
    Magdalena: ["Santa Marta", "Ciénaga", "Fundación"],
    Meta: ["Villavicencio", "Acacías", "Granada", "Puerto López"],
    Nariño: ["Pasto", "Tumaco", "Ipiales", "Túquerres"],
    "Norte de Santander": ["Cúcuta", "Ocaña", "Pamplona", "Villa del Rosario"],
    Putumayo: ["Mocoa", "Puerto Asís", "Orito"],
    Quindío: ["Armenia", "Calarcá", "Montenegro", "Quimbaya"],
    Risaralda: ["Pereira", "Dosquebradas", "Santa Rosa de Cabal"],
    "San Andrés y Providencia": ["San Andrés", "Providencia"],
    Santander: ["Bucaramanga", "Floridablanca", "Girón", "Piedecuesta", "Barrancabermeja", "San Gil", "Socorro"],
    Sucre: ["Sincelejo", "Corozal", "Sampués"],
    Tolima: ["Ibagué", "Espinal", "Melgar", "Honda"],
    "Valle del Cauca": ["Cali", "Palmira", "Buenaventura", "Tuluá", "Cartago"],
    Vaupés: ["Mitú"],
    Vichada: ["Puerto Carreño"]
  };

  constructor(
    private router: Router,
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  private getHeaders(): HttpHeaders {
    const token = isPlatformBrowser(this.platformId)
      ? localStorage.getItem('token') : '';
    return new HttpHeaders({ 'Authorization': `Bearer ${token}` });
  }

  private getIdentificacion(): string {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('token');
      if (token) {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload.identificacion || '';
      }
    }
    return '';
  }

  ngOnInit(): void {}

  cargarMunicipios() {
    this.municipios = this.municipiosData[this.departamentoSeleccionado] || [];
    this.municipioSeleccionado = '';
    this.formData.departamento = this.departamentoSeleccionado;
  }

  guardarFormulario() {
    if (!this.formData.nombre || !this.departamentoSeleccionado || !this.municipioSeleccionado) {
      this.error = 'Por favor completa todos los campos obligatorios.';
      return;
    }

    this.cargando = true;
    this.error = '';

    const datos = {
      nombre: this.formData.nombre,
      departamento: this.departamentoSeleccionado,
      municipio: this.municipioSeleccionado,
      extension: this.formData.extension,
      direccion: this.formData.direccion,
      nroDocProductor: this.getIdentificacion()
    };

    this.http.post(`${this.apiUrl}/predios`, datos, { headers: this.getHeaders() })
      .subscribe({
        next: () => {
          this.cargando = false;
          this.exito = true;
        },
        error: () => {
          this.cargando = false;
          this.error = 'Error al registrar el predio. Intenta nuevamente.';
        }
      });
  }

  volverListado() {
    this.router.navigate(['/usuario/predio']);
  }
}