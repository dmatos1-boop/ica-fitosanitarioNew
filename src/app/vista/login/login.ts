import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthController } from '../../controlador/auth-control';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {

  usuario = '';
  password = '';
  cargando = false;
  error = '';

  constructor(
    private http: HttpClient,
    private router: Router,
    private authController: AuthController
  ) {}

  login() {
    if (!this.usuario || !this.password) {
      this.error = 'Ingresa correo y contraseña';
      return;
    }
    this.cargando = true;
    this.error = '';

    this.http.post<any>('http://localhost:3000/auth/login', {
      email: this.usuario,
      clave: this.password
    }).subscribe({
      next: (respuesta) => {
        this.cargando = false;
        const datos = respuesta.datos ?? respuesta;
        this.authController.guardarSesion(datos.token, datos.rol, datos.nombre);
        const rol = (datos.rol as string).toLowerCase();
        if (rol.includes('funcionario') || rol.includes('admin')) {
          this.router.navigate(['/admin']);
        } else if (rol.includes('tecnico')) {
          this.router.navigate(['/tecnico']);
        } else if (rol.includes('productor')) {
          this.router.navigate(['/usuario']);
        } else {
          this.error = 'Rol no reconocido: ' + datos.rol;
        }
      },
      error: () => {
        this.cargando = false;
        this.error = 'Usuario o contraseña incorrectos';
      }
    });
  }
}