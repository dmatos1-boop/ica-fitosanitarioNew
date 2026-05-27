import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthController } from '../../controlador/auth-control';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ToastService } from '../../soa/toast.service';

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
  intentoEnvio = false;

  constructor(
    private http: HttpClient,
    private router: Router,
    private authController: AuthController,
    private toast: ToastService
  ) {}

  login() {
    this.intentoEnvio = true;

    if (!this.usuario || !this.password) {
      this.toast.error('Por favor ingresa correo y contraseña.');
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
        this.toast.exito(`Bienvenido, ${datos.nombre}`);
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
        this.toast.error('Usuario o contraseña incorrectos.');
        this.error = 'Usuario o contraseña incorrectos';
      }
    });
  }
}