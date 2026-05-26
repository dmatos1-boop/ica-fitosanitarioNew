import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { ExitoComponent } from '../exito/exito';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-view-form-produccion',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, ExitoComponent],
  templateUrl: './view-form-produccion.html',
  styleUrl: './view-form-produccion.css',
})
export class ViewFormProduccion implements OnInit {

  private apiUrl = 'http://localhost:3000';
  exito = false;
  error = '';
  cargando = false;

  predios: any[] = [];

  formData = {
    predioId: '',
    nombre: '',
    extension: null as number | null,
    tipoProduccion: ''
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

  ngOnInit(): void {
    this.http.get<any[]>(`${this.apiUrl}/predios`, { headers: this.getHeaders() })
      .subscribe({
        next: (data) => {
          this.predios = data.filter(p =>
            p.estado === 'ACTIVO' || p.estado === 'APROBADO'
          );
        },
        error: () => console.error('Error al cargar predios')
      });
  }

  registrarProduccion() {
    if (!this.formData.nombre || !this.formData.predioId) {
      this.error = 'Por favor completa todos los campos obligatorios.';
      return;
    }

    this.cargando = true;
    this.error = '';

    const predio = this.predios.find(p => p.nroRegistroICA === this.formData.predioId);

    const datos = {
      nombre: this.formData.nombre,
      nroPredial: this.formData.predioId,
      extension: this.formData.extension,
      tipoProduccion: this.formData.tipoProduccion,
      departamento: predio?.departamento || '',
      municipio: predio?.municipio || '',
      nroDocProductor: this.getIdentificacion()
    };

    this.http.post(`${this.apiUrl}/lugares`, datos, { headers: this.getHeaders() })
      .subscribe({
        next: () => {
          this.cargando = false;
          this.exito = true;
        },
        error: () => {
          this.cargando = false;
          this.error = 'Error al registrar el lugar de producción.';
        }
      });
  }

  volverListado() {
    this.router.navigate(['/usuario/produccion']);
  }
}