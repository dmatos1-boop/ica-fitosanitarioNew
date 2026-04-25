import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CultivoService {

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

  listarCultivos(): Observable<any> {
    return this.http.get(`${this.apiUrl}/cultivos`, { headers: this.getHeaders() });
  }

  crearCultivo(datos: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/cultivos`, datos, { headers: this.getHeaders() });
  }

  actualizarCultivo(idCultivo: number, datos: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/cultivos/${idCultivo}`, datos, { headers: this.getHeaders() });
  }

  cambiarEstado(idCultivo: number, estado: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}/cultivos/${idCultivo}/estado`,
      { estado }, { headers: this.getHeaders() });
  }

  eliminarCultivo(idCultivo: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/cultivos/${idCultivo}`, { headers: this.getHeaders() });
  }
}