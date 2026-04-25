import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormUsuario, Usuario } from '../form-usuario/form-usuario';
import { UsuarioService } from '../../../soa/usuario.service';
import { ExitoComponent } from '../../exito/exito';

@Component({
  selector: 'app-gestion-usuarios',
  standalone: true,
  imports: [CommonModule, FormUsuario, ExitoComponent],
  templateUrl: './gestion-usuarios.html',
  styleUrl: './gestion-usuarios.css',
})
export class GestionUsuariosComponent implements OnInit {

  vista: 'lista' | 'formulario' | 'exito' = 'lista';
  usuarioSeleccionado: Usuario | null = null;
  usuarios: Usuario[] = [];
  cargando = false;
  error = '';

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios(): void {
    this.cargando = true;
    this.usuarioService.listarUsuarios().subscribe({
      next: (data) => {
        this.usuarios = data.map((u: any) => ({
          id: u.identificacion,
          identificacion: u.identificacion,
          nombre: u.nombre,
          apellido: u.apellido,
          telefono: u.telefono,
          correo: u.email,
          rol: u.rol,
          estado: u.estado === 'ACTIVO' ? 'Activo' : 'Inactivo'
        }));
        this.cargando = false;
      },
      error: (err) => {
        this.error = 'Error al cargar usuarios';
        this.cargando = false;
        console.error(err);
      }
    });
  }

  nuevoUsuario(): void {
    this.usuarioSeleccionado = null;
    this.vista = 'formulario';
  }

  editar(u: Usuario): void {
    this.usuarioSeleccionado = u;
    this.vista = 'formulario';
  }

  toggleEstado(u: Usuario): void {
    const accion = u.estado === 'Activo' ? 'desactivar' : 'activar';
    if (confirm(`¿Está seguro de ${accion} este usuario?`)) {
      if (u.estado === 'Activo') {
        this.usuarioService.desactivarUsuario(u.identificacion).subscribe({
          next: () => { u.estado = 'Inactivo'; },
          error: () => { this.error = 'Error al cambiar estado'; }
        });
      } else {
        this.usuarioService.activarUsuario(u.identificacion).subscribe({
          next: () => { u.estado = 'Activo'; },
          error: () => { this.error = 'Error al cambiar estado'; }
        });
      }
    }
  }

  alGuardar(usuario: Usuario): void {
    if (usuario.id) {
      this.usuarioService.actualizarUsuario(usuario.identificacion, {
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        telefono: usuario.telefono,
        email: usuario.correo,
        rol: usuario.rol
      }).subscribe({
        next: () => {
          this.vista = 'exito';
          this.cargarUsuarios();
        },
        error: () => { this.error = 'Error al actualizar usuario'; }
      });
    } else {
      this.usuarioService.crearUsuario({
        identificacion: usuario.identificacion,
        nombreUsuario: usuario.correo,
        clave: '123456',
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        telefono: usuario.telefono,
        email: usuario.correo,
        rol: usuario.rol
      }).subscribe({
        next: () => {
          this.vista = 'exito';
          this.cargarUsuarios();
        },
        error: () => { this.error = 'Error al crear usuario'; }
      });
    }
  }

  alCancelar(): void { this.vista = 'lista'; }

  volver(): void {
    this.vista = 'lista';
    this.cargarUsuarios();
  }
}