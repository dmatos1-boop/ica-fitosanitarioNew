import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink, Router } from "@angular/router";
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-view-inicio',
  imports: [CommonModule, RouterLink],
  templateUrl: './view-inicio.html',
  styleUrl: './view-inicio.css',
})
export class ViewInicio implements OnInit {

  private apiUrl = 'http://localhost:3000';
  nombreProd = '';
  fechaActual: Date = new Date();

  accesos = [
    { label: 'Predios Aprobados', valor: '0', icono: '⛰️', date: '—', ruta: '/usuario/predio' },
    { label: 'Lotes Aprobados', valor: '0', icono: '🏠', date: '—', ruta: '/usuario/predio' },
    { label: 'Lugares de Producción', valor: '0', icono: '🏭', date: '—', ruta: '/usuario/produccion' },
    { label: 'Inspecciones Confirmadas', valor: '0', icono: '📅', date: '—', ruta: '/usuario/visita' }
  ];

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
    if (isPlatformBrowser(this.platformId)) {
      this.nombreProd = localStorage.getItem('nombre') || 'Productor';
    }

    this.http.get<any[]>(`${this.apiUrl}/predios`, { headers: this.getHeaders() })
      .subscribe({ next: (data) => {
        const activos = data.filter(p => p.estado === 'ACTIVO' || p.estado === 'APROBADO');
        this.accesos[0].valor = activos.length.toString();
        if (activos.length > 0) this.accesos[0].date = activos[0].fechaRegistro || '—';
      }});

    this.http.get<any[]>(`${this.apiUrl}/lotes`, { headers: this.getHeaders() })
      .subscribe({ next: (data) => {
        const activos = data.filter(l => l.estado === 'ACTIVO' || l.estado === 'APROBADO');
        this.accesos[1].valor = activos.length.toString();
      }});

    this.http.get<any[]>(`${this.apiUrl}/lugares`, { headers: this.getHeaders() })
      .subscribe({ next: (data) => {
        this.accesos[2].valor = data.length.toString();
      }});

    this.http.get<any[]>(`${this.apiUrl}/inspecciones`, { headers: this.getHeaders() })
      .subscribe({ next: (data) => {
        const confirmadas = data.filter(i => i.estado === 'PROGRAMADA' || i.estado === 'REALIZADA');
        this.accesos[3].valor = confirmadas.length.toString();
      }});
  }

  Dir(ruta: String) {
    this.router.navigate([ruta]);
  }

  get saludo(): string {
    const hora = this.fechaActual.getHours();
    if (hora < 12) return 'Buenos días';
    if (hora < 18) return 'Buenas tardes';
    return 'Buenas noches';
  }
}