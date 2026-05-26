import { CommonModule } from '@angular/common';
import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-tabla-predios',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './tabla-predios.html',
  styleUrl: './tabla-predios.css',
})
export class TablaPredios implements OnInit {

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
    this.http.get<any[]>(`${this.apiUrl}/predios`, { headers: this.getHeaders() })
      .subscribe({
        next: (data) => {
          this.predios = data.map(p => ({
            nombre: p.nombre,
            departamento: p.departamento,
            municipio: p.municipio,
            area: p.extension,
            estado: p.estado === 'ACTIVO' || p.estado === 'APROBADO' ? 'Activo' :
                    p.estado === 'INACTIVO' || p.estado === 'RECHAZADO' ? 'Inactivo' : p.estado
          }));
        },
        error: () => console.error('Error al cargar predios')
      });
  }
}