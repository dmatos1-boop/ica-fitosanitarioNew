import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CultivoService } from '../../../soa/cultivo.service';
import { ExitoComponent } from '../../exito/exito';
import { ToastService } from '../../../soa/toast.service';

interface Cultivo {
  id: number;
  nombre: string;
  tipo: string;
  descripcion: string;
  estado: 'Activo' | 'Inactivo';
}

@Component({
  selector: 'app-gestion-cultivos',
  imports: [CommonModule, FormsModule, ExitoComponent],
  templateUrl: './gestion-cultivos.html',
  styleUrl: './gestion-cultivos.css',
})
export class GestionCultivos implements OnInit {

  vista: 'lista' | 'formulario' | 'exito' = 'lista';
  modoEdicion = false;
  cargando = false;
  error = '';
  cultivos: Cultivo[] = [];
  formulario: Cultivo = this.formularioVacio();
  intentoEnvio = false;

  constructor(
    private cultivoService: CultivoService,
    private toast: ToastService
  ) {}

  ngOnInit(): void {
    setTimeout(() => { this.cargarCultivos(); }, 100);
  }

  cargarCultivos(): void {
    this.cargando = true;
    this.cultivoService.listarCultivos().subscribe({
      next: (data: any[]) => {
        this.cultivos = data.map((c: any) => ({
          id: c.idCultivo,
          nombre: c.nombreComun,
          tipo: c.ciclo,
          descripcion: c.descripcion || '',
          estado: c.estado === 'ACTIVO' ? 'Activo' : 'Inactivo'
        }));
        this.cargando = false;
      },
      error: () => {
        this.toast.error('Error al cargar cultivos');
        this.cargando = false;
      }
    });
  }

  formularioVacio(): Cultivo {
    return { id: 0, nombre: '', tipo: '', descripcion: '', estado: 'Activo' };
  }

  nuevo(): void {
    this.formulario = this.formularioVacio();
    this.modoEdicion = false;
    this.vista = 'formulario';
  }

  editar(c: Cultivo): void {
    this.formulario = { ...c };
    this.modoEdicion = true;
    this.vista = 'formulario';
  }

  toggleEstado(c: Cultivo): void {
    const accion = c.estado === 'Activo' ? 'desactivar' : 'activar';
    if (confirm(`¿Está seguro de ${accion} este cultivo?`)) {
      const nuevoEstado = c.estado === 'Activo' ? 'INACTIVO' : 'ACTIVO';
      this.cultivoService.cambiarEstado(c.id, nuevoEstado).subscribe({
        next: () => {
          c.estado = c.estado === 'Activo' ? 'Inactivo' : 'Activo';
          this.toast.exito(`Cultivo ${accion === 'desactivar' ? 'desactivado' : 'activado'} correctamente.`);
        },
        error: () => { this.toast.error('Error al cambiar estado del cultivo'); }
      });
    }
  }

  guardar(): void {
    this.intentoEnvio = true;
    if (this.cargando) return;
    this.cargando = true;
    if (this.modoEdicion) {
      this.cultivoService.actualizarCultivo(this.formulario.id, {
        nombreCientifico: this.formulario.nombre,
        nombreComun: this.formulario.nombre,
        ciclo: this.formulario.tipo,
        nombreVariedad: this.formulario.tipo,
        descripcion: this.formulario.descripcion
      }).subscribe({
        next: () => {
          this.cargando = false;
          this.toast.exito('Cultivo actualizado exitosamente.');
          this.cargarCultivos();
          this.vista = 'exito';
        },
        error: () => {
          this.cargando = false;
          this.toast.error('Error al actualizar cultivo');
        }
      });
    } else {
      this.cultivoService.crearCultivo({
        nombreCientifico: this.formulario.nombre,
        nombreComun: this.formulario.nombre,
        ciclo: this.formulario.tipo,
        nombreVariedad: this.formulario.tipo,
        descripcion: this.formulario.descripcion
      }).subscribe({
        next: () => {
          this.cargando = false;
          this.toast.exito('Cultivo creado exitosamente.');
          this.cargarCultivos();
          this.vista = 'exito';
        },
        error: () => {
          this.cargando = false;
          this.toast.error('Error al crear cultivo');
        }
      });
    }
  }

  eliminar(c: Cultivo): void {
    if (confirm('¿Está seguro de eliminar este cultivo?')) {
      this.cultivoService.eliminarCultivo(c.id).subscribe({
        next: () => {
          this.toast.exito('Cultivo eliminado correctamente.');
          this.cargarCultivos();
        },
        error: () => { this.toast.error('Error al eliminar cultivo'); }
      });
    }
  }

  volver(): void {
    this.vista = 'lista';
    this.cargarCultivos();
  }
}