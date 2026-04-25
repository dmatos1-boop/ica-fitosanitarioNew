
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LugarService {

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

  listarLugares(): Observable<any> {
    return this.http.get(`${this.apiUrl}/lugares`, { headers: this.getHeaders() });
  }

  crearLugar(datos: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/lugares`, datos, { headers: this.getHeaders() });
  }

  actualizarLugar(nroRegistroICA: string, datos: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/lugares/${nroRegistroICA}`, datos, { headers: this.getHeaders() });
  }

  aprobarLugar(nroRegistroICA: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}/lugares/${nroRegistroICA}/estado`,
      { estado: 'APROBADO' }, { headers: this.getHeaders() });
  }

  rechazarLugar(nroRegistroICA: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}/lugares/${nroRegistroICA}/estado`,
      { estado: 'RECHAZADO' }, { headers: this.getHeaders() });
  }

  desactivarLugar(nroRegistroICA: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}/lugares/${nroRegistroICA}/estado`,
      { estado: 'SUSPENDIDO' }, { headers: this.getHeaders() });
  }
}