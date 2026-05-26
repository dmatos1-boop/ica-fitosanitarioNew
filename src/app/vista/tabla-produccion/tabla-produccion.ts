import { CommonModule } from '@angular/common';
import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-tabla-produccion',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './tabla-produccion.html',
  styleUrl: './tabla-produccion.css',
})
export class TablaProduccion implements OnInit {

  private apiUrl = 'http://localhost:3000';
  predios: any[] = [];

  constructor(
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
          this.predios = data.map(l => ({
  nombre: l.nombre,
  municipio: l.municipio,
  area_sembrada: l.extension || '—',
  producto: l.tipoProduccion || '—'
}));
        },
        error: () => console.error('Error al cargar lugares de producción')
      });
  }
}