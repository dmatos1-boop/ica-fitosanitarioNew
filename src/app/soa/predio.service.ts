import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PredioService {

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

  listarPredios(): Observable<any> {
    return this.http.get(`${this.apiUrl}/predios`, { headers: this.getHeaders() });
  }

  crearPredio(datos: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/predios`, datos, { headers: this.getHeaders() });
  }

  actualizarPredio(nroRegistroICA: string, datos: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/predios/${nroRegistroICA}`, datos, { headers: this.getHeaders() });
  }

  aprobarPredio(nroRegistroICA: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}/predios/${nroRegistroICA}/estado`,
      { estado: 'APROBADO' }, { headers: this.getHeaders() });
  }

  rechazarPredio(nroRegistroICA: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}/predios/${nroRegistroICA}/estado`,
      { estado: 'RECHAZADO' }, { headers: this.getHeaders() });
  }

  desactivarPredio(nroRegistroICA: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}/predios/${nroRegistroICA}/estado`,
      { estado: 'SUSPENDIDO' }, { headers: this.getHeaders() });
  }
}