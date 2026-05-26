import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ExitoComponent } from '../exito/exito';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-form-inspeccion',
  standalone: true,
  imports: [CommonModule, ExitoComponent, RouterLink, FormsModule],
  templateUrl: './form-inspeccion.html',
  styleUrl: './form-inspeccion.css',
})
export class FormInspeccion implements OnInit {

  private apiUrl = 'http://localhost:3000';
  exito = false;
  error = '';
  cargando = false;

  tipoInspeccion = '';
  lugarSeleccionado = '';
  observaciones = '';

  lugares: any[] = [];

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

  ngOnInit(): void {
    this.http.get<any[]>(`${this.apiUrl}/lugares`, { headers: this.getHeaders() })
      .subscribe({
        next: (data) => {
          this.lugares = data.filter(l =>
            l.estado === 'ACTIVO' || l.estado === 'APROBADO'
          );
        },
        error: () => console.error('Error al cargar lugares')
      });
  }

  guardarCita() {
    if (!this.tipoInspeccion || !this.lugarSeleccionado) {
      this.error = 'Por favor selecciona el tipo de inspección y el lugar.';
      return;
    }

    this.cargando = true;
    this.error = '';

    const datos = {
      tipoInspeccion: this.tipoInspeccion,
      nroRegICAlugar: this.lugarSeleccionado,
      comentarios: this.observaciones
    };

    this.http.post(`${this.apiUrl}/inspecciones`, datos, { headers: this.getHeaders() })
      .subscribe({
        next: () => {
          this.cargando = false;
          this.exito = true;
        },
        error: () => {
          this.cargando = false;
          this.error = 'Error al agendar la inspección. Intenta nuevamente.';
        }
      });
  }

  volverListado() {
    this.router.navigate(['/usuario/visita']);
  }
}