import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';

interface ProximaInspeccion {
  codigo:          string;
  lugarProduccion: string;
  fecha:           string;
  hora:            string;
}

interface TarjetaInspeccion {
  tipo:    'FITOSANITARIA' | 'TECNICA';
  total:   number;
  proxima: ProximaInspeccion | null;
}

@Component({
  selector: 'app-incio',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './incio.html',
  styleUrl: './incio.css',
})
export class Incio implements OnInit {

  private apiUrl = 'http://localhost:3000';

  nombreTecnico = '';
  fechaActual: Date = new Date();

  tecnicas: TarjetaInspeccion = {
    tipo: 'TECNICA', total: 0, proxima: null
  };

  fitosanitarias: TarjetaInspeccion = {
    tipo: 'FITOSANITARIA', total: 0, proxima: null
  };

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  private getHeaders(): HttpHeaders {
    const token = isPlatformBrowser(this.platformId)
      ? localStorage.getItem('token') : '';
    return new HttpHeaders({ 'Authorization': `Bearer ${token}` });
  }

  private getDocumentoTecnico(): string {
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
    if (isPlatformBrowser(this.platformId)) {
      this.nombreTecnico = localStorage.getItem('nombre') || 'Técnico';
    }
    this.cargarInspecciones();
  }

  cargarInspecciones(): void {
    const doc = this.getDocumentoTecnico();
    this.http.get<any[]>(
      `${this.apiUrl}/inspecciones/asignadas/${doc}`,
      { headers: this.getHeaders() }
    ).subscribe({
      next: (data) => {
        const programadas = data.filter(i => i.estado === 'PROGRAMADA');

        const tecnicas = programadas.filter(i => i.tipoInspeccion === 'TECNICA');
        const fitos = programadas.filter(i => i.tipoInspeccion === 'FITOSANITARIA');

        this.tecnicas = {
          tipo: 'TECNICA',
          total: tecnicas.length,
          proxima: tecnicas.length > 0 ? {
            codigo: `INS-${String(tecnicas[0].idOrden).padStart(3, '0')}`,
            lugarProduccion: tecnicas[0].lugarProduccion || tecnicas[0].nroRegICAlugar,
            fecha: tecnicas[0].fechaProgramada ? tecnicas[0].fechaProgramada.split('T')[0] : '—',
            hora: '08:00 AM'
          } : null
        };

        this.fitosanitarias = {
          tipo: 'FITOSANITARIA',
          total: fitos.length,
          proxima: fitos.length > 0 ? {
            codigo: `INS-${String(fitos[0].idOrden).padStart(3, '0')}`,
            lugarProduccion: fitos[0].lugarProduccion || fitos[0].nroRegICAlugar,
            fecha: fitos[0].fechaProgramada ? fitos[0].fechaProgramada.split('T')[0] : '—',
            hora: '08:00 AM'
          } : null
        };
      },
      error: () => {
        this.nombreTecnico = localStorage.getItem('nombre') || 'Técnico';
      }
    });
  }

  get saludo(): string {
    const hora = this.fechaActual.getHours();
    if (hora < 12)  return 'Buenos días';
    if (hora < 18)  return 'Buenas tardes';
    return 'Buenas noches';
  }
}