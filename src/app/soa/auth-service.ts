import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  private users = [
    { usuario: 'admin', password: '1234', rol: 'FUNCIONARIO_ICA' },
    { usuario: 'productor', password: '12345', rol: 'PRODUCTOR' },
    { usuario: 'tecnico', password: '123', rol: 'TECNICO' }
  ];

  login(usuario: string, password: string) {
    const user = this.users.find(
      u => u.usuario === usuario && u.password === password
    );
    if (user && isPlatformBrowser(this.platformId)) {
      localStorage.setItem('userRole', user.rol);
      return user.rol;
    }
    return null;
  }

  logout() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('userRole');
    }
  }
}