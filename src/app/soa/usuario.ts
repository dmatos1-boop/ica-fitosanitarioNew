import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

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

  listarUsuarios(): Observable<any> {
    return this.http.get(`${this.apiUrl}/usuarios`, { headers: this.getHeaders() });
  }

  crearUsuario(datos: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/usuarios`, datos, { headers: this.getHeaders() });
  }

  actualizarUsuario(identificacion: string, datos: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/usuarios/${identificacion}`, datos, { headers: this.getHeaders() });
  }

  desactivarUsuario(identificacion: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}/usuarios/${identificacion}`, 
      { estado: 'INACTIVO' }, { headers: this.getHeaders() });
  }

  activarUsuario(identificacion: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}/usuarios/${identificacion}`, 
      { estado: 'ACTIVO' }, { headers: this.getHeaders() });
  }
}