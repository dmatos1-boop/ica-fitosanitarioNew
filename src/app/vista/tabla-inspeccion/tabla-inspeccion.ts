import { CommonModule } from '@angular/common';
import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-tabla-inspeccion',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './tabla-inspeccion.html',
  styleUrl: './tabla-inspeccion.css',
})
export class TablaInspeccion implements OnInit {

  private apiUrl = 'http://localhost:3000';
  citas: any[] = [];

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
    this.http.get<any[]>(`${this.apiUrl}/inspecciones`, { headers: this.getHeaders() })
      .subscribe({
        next: (data) => {
          this.citas = data.map(i => ({
            nombre: i.lugarProduccion || i.nroRegICAlugar,
            inspeccion: i.tipoInspeccion,
            fecha: i.fechaProgramada ? new Date(i.fechaProgramada) : null,
            estado: i.estado === 'PROGRAMADA' ? 'Programada' :
                    i.estado === 'REALIZADA'  ? 'Realizada'  :
                    i.estado === 'CANCELADA'  ? 'Cancelada'  : 'Solicitada'
          }));
        },
        error: () => console.error('Error al cargar inspecciones')
      });
  }
}