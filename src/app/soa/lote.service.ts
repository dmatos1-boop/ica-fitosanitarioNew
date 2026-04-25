import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoteService {

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

  listarLotes(): Observable<any> {
    return this.http.get(`${this.apiUrl}/lotes`, { headers: this.getHeaders() });
  }

  listarLotesPorLugar(nroRegICAlugar: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/lotes/lugar/${nroRegICAlugar}`, { headers: this.getHeaders() });
  }

  crearLote(datos: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/lotes`, datos, { headers: this.getHeaders() });
  }

  actualizarLote(idLote: number, datos: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/lotes/${idLote}`, datos, { headers: this.getHeaders() });
  }

  eliminarLote(idLote: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/lotes/${idLote}`, { headers: this.getHeaders() });
  }

  cambiarEstado(idLote: number, estado: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}/lotes/${idLote}/estado`,
      { estado }, { headers: this.getHeaders() });
  }
}