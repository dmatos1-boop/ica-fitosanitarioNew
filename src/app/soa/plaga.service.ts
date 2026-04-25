import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlagaService {

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

  listarPlagas(): Observable<any> {
    return this.http.get(`${this.apiUrl}/plagas`, { headers: this.getHeaders() });
  }

  crearPlaga(datos: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/plagas`, datos, { headers: this.getHeaders() });
  }

  actualizarPlaga(idPlaga: number, datos: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/plagas/${idPlaga}`, datos, { headers: this.getHeaders() });
  }

  cambiarEstado(idPlaga: number, estado: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}/plagas/${idPlaga}/estado`,
      { estado }, { headers: this.getHeaders() });
  }

  asociarCultivo(idPlaga: number, idCultivo: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/plagas/${idPlaga}/cultivo`,
      { idCultivo }, { headers: this.getHeaders() });
  }

  actualizarUmbral(idPlaga: number, umbralAlerta: number): Observable<any> {
    return this.http.patch(`${this.apiUrl}/plagas/${idPlaga}/umbral`,
      { umbralAlerta }, { headers: this.getHeaders() });
  }

  eliminarPlaga(idPlaga: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/plagas/${idPlaga}`, { headers: this.getHeaders() });
  }
}