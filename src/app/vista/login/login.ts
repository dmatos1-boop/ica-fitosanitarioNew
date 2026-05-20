import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthController } from '../../controlador/auth-control';
import { CommonModule } from '@angular/common';

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

  constructor(
    private authController: AuthController,
    private router: Router
  ) {}

  login() {
    const rol = this.authController.login(this.usuario, this.password);
    if (rol === 'FUNCIONARIO_ICA') {
      this.router.navigate(['/admin']);
    } else if (rol === 'PRODUCTOR') {
      this.router.navigate(['/usuario']);
    } else if (rol === 'TECNICO') {
      this.router.navigate(['/tecnico']);
    } else {
      alert('Usuario o contraseña incorrectos');
    }
  }
}