import { Injectable } from '@angular/core';
import { AuthService } from '../soa/auth-service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthController {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  login(email: string, clave: string): Observable<any> {
    return this.authService.login(email, clave);
  }

  guardarSesion(token: string, rol: string, nombre: string): void {
    this.authService.guardarSesion(token, rol, nombre);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  obtenerRol(): string | null {
    return this.authService.obtenerRol();
  }

  obtenerNombre(): string | null {
    return this.authService.obtenerNombre();
  }

  estaAutenticado(): boolean {
    return this.authService.estaAutenticado();
  }
}
