import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PlagaService } from '../../../soa/plaga.service';
import { CultivoService } from '../../../soa/cultivo.service';
import { ExitoComponent } from '../../exito/exito';
import { ToastService } from '../../../soa/toast.service';

interface Plaga {
  id: number;
  nombre: string;
  cultivoAsociado: string;
  umbralAlerta: number;
  estado: 'Activo' | 'Inactivo';
}

@Component({
  selector: 'app-gestion-plagas',
  imports: [FormsModule, CommonModule, ExitoComponent],
  templateUrl: './gestion-plagas.html',
  styleUrl: './gestion-plagas.css',
})
export class GestionPlagas implements OnInit {

  vista: 'lista' | 'formulario' | 'exito' = 'lista';
  modoEdicion = false;
  cargando = false;
  error = '';
  plagas: Plaga[] = [];
  CultivosAsociados: any[] = [];
  CultivoSeleccionado: string = '';
  formulario: Plaga = this.formularioVacio();
  intentoEnvio = false;

  constructor(
    private plagaService: PlagaService,
    private cultivoService: CultivoService,
    private toast: ToastService
  ) {}

  ngOnInit(): void {
    setTimeout(() => { this.cargarPlagas(); this.cargarCultivos(); }, 100);
  }

  cargarCultivos(): void {
    this.cultivoService.listarCultivos().subscribe({
      next: (data: any[]) => {
        this.CultivosAsociados = data.filter(c => c.estado === 'ACTIVO');
      },
      error: () => { this.toast.error('Error al cargar cultivos'); }
    });
  }

  cargarPlagas(): void {
    this.cargando = true;
    this.plagaService.listarPlagas().subscribe({
      next: (data: any[]) => {
        this.plagas = data.map((p: any) => ({
          id: p.idPlaga,
          nombre: p.nombreComun,
          cultivoAsociado: p.cultivosAsociados || p.tipoPlaga,
          umbralAlerta: p.umbralAlerta,
          estado: p.estado === 'ACTIVO' ? 'Activo' : 'Inactivo'
        }));
        this.cargando = false;
      },
      error: () => {
        this.toast.error('Error al cargar plagas');
        this.cargando = false;
      }
    });
  }

  formularioVacio(): Plaga {
    return { id: 0, nombre: '', cultivoAsociado: '', umbralAlerta: 0, estado: 'Activo' };
  }

  nuevo(): void {
    this.formulario = this.formularioVacio();
    this.modoEdicion = false;
    this.vista = 'formulario';
  }

  editar(p: Plaga): void {
    this.formulario = { ...p };
    this.modoEdicion = true;
    this.vista = 'formulario';
  }

  toggleEstado(p: Plaga): void {
    const accion = p.estado === 'Activo' ? 'desactivar' : 'activar';
    if (confirm(`¿Está seguro de ${accion} esta plaga?`)) {
      const nuevoEstado = p.estado === 'Activo' ? 'INACTIVO' : 'ACTIVO';
      this.plagaService.cambiarEstado(p.id, nuevoEstado).subscribe({
        next: () => {
          p.estado = p.estado === 'Activo' ? 'Inactivo' : 'Activo';
          this.toast.exito(`Plaga ${accion === 'desactivar' ? 'desactivada' : 'activada'} correctamente.`);
        },
        error: () => { this.toast.error('Error al cambiar estado de la plaga'); }
      });
    }
  }

  guardar(): void {
    this.intentoEnvio = true;
    if (this.cargando) return;
    this.cargando = true;

    const cultivoSeleccionado = this.CultivosAsociados.find(
      c => c.nombreComun === this.formulario.cultivoAsociado
    );
    const idCultivo = cultivoSeleccionado ? cultivoSeleccionado.idCultivo : null;

    if (this.modoEdicion) {
      this.plagaService.actualizarPlaga(this.formulario.id, {
        nombreCientifico: this.formulario.nombre,
        nombreComun: this.formulario.nombre,
        tipoPlaga: this.formulario.cultivoAsociado,
        descripcion: ''
      }).subscribe({
        next: () => {
          this.plagaService.actualizarUmbral(this.formulario.id, this.formulario.umbralAlerta).subscribe({
            next: () => {
              this.cargando = false;
              this.toast.exito('Plaga actualizada exitosamente.');
              this.cargarPlagas();
              this.vista = 'exito';
            }
          });
        },
        error: () => {
          this.cargando = false;
          this.toast.error('Error al actualizar plaga');
        }
      });
    } else {
      this.plagaService.crearPlaga({
        nombreCientifico: this.formulario.nombre,
        nombreComun: this.formulario.nombre,
        tipoPlaga: this.formulario.cultivoAsociado,
        descripcion: '',
        umbralAlerta: this.formulario.umbralAlerta
      }).subscribe({
        next: (respuesta: any) => {
          const idPlaga = respuesta.idPlaga;
          if (idCultivo && idPlaga) {
            this.plagaService.asociarCultivo(idPlaga, idCultivo).subscribe({
              next: () => {
                this.cargando = false;
                this.toast.exito('Plaga creada y asociada al cultivo exitosamente.');
                this.cargarPlagas();
                this.vista = 'exito';
              },
              error: () => {
                this.cargando = false;
                this.toast.info('Plaga creada pero no se pudo asociar al cultivo.');
                this.cargarPlagas();
                this.vista = 'exito';
              }
            });
          } else {
            this.cargando = false;
            this.toast.exito('Plaga creada exitosamente.');
            this.cargarPlagas();
            this.vista = 'exito';
          }
        },
        error: () => {
          this.cargando = false;
          this.toast.error('Error al crear plaga');
        }
      });
    }
  }

  eliminar(p: Plaga): void {
    if (confirm('¿Está seguro de eliminar esta plaga?')) {
      this.plagaService.eliminarPlaga(p.id).subscribe({
        next: () => {
          this.toast.exito('Plaga eliminada correctamente.');
          this.cargarPlagas();
        },
        error: () => { this.toast.error('Error al eliminar plaga'); }
      });
    }
  }

  volver(): void {
    this.vista = 'lista';
    this.cargarPlagas();
  }
}