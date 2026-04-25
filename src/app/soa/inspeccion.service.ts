import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InspeccionService {

  private apiUrl = 'http://localhost:3000';

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  private getHeaders(): HttpHeaders {
    const token = isPlatformBrowser(this.platformId)
      ? localStorage.getItem('token')
      : '';
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  listarInspecciones(filtros?: any): Observable<any> {
    let url = `${this.apiUrl}/inspecciones`;
    if (filtros?.estado) url += `?estado=${filtros.estado}`;
    return this.http.get(url, { headers: this.getHeaders() });
  }

  programarInspeccion(datos: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/inspecciones`, datos, { headers: this.getHeaders() });
  }

  asignarTecnico(idOrden: number, documentoTecnico: string): Observable<any> {
    return this.http.patch(
      `${this.apiUrl}/inspecciones/${idOrden}/tecnico`,
      { documentoTecnico },
      { headers: this.getHeaders() }
    );
  }

  cancelarInspeccion(idOrden: number, motivo: string): Observable<any> {
  return this.http.patch(
    `${this.apiUrl}/inspecciones/${idOrden}/cancelar`,
    { motivo },
    { headers: this.getHeaders() }
  );
}
}