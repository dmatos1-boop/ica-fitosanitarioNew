import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:3000';

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private http: HttpClient
  ) {}

  login(email: string, clave: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/login`, { email, clave });
  }

  guardarSesion(token: string, rol: string, nombre: string): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('token', token);
      localStorage.setItem('userRole', rol);
      localStorage.setItem('nombre', nombre);
    }
  }

  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('token');
      localStorage.removeItem('userRole');
      localStorage.removeItem('nombre');
    }
  }

  obtenerToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('token');
    }
    return null;
  }

  obtenerRol(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('userRole');
    }
    return null;
  }

  obtenerNombre(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('nombre');
    }
    return null;
  }

  estaAutenticado(): boolean {
    return this.obtenerToken() !== null;
  }
}