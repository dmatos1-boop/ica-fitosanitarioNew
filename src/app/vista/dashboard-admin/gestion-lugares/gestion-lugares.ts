import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ModalService } from '../../../soa/modal-service';
import { LugarService } from '../../../soa/lugar.service';
import { ExitoComponent } from '../../exito/exito';
import { ToastService } from '../../../soa/toast.service';

export interface LugarProduccion {
  id: string;
  nombre: string;
  productorTitular: string;
  numeroICA: string;
  predioAsociado: string;
  extension: number;
  estado: 'Pendiente' | 'Activo' | 'Inactivo';
}

@Component({
  selector: 'app-gestion-lugares',
  imports: [CommonModule, FormsModule, ExitoComponent],
  templateUrl: './gestion-lugares.html',
  styleUrl: './gestion-lugares.css',
})
export class GestionLugares implements OnInit {

  constructor(
    private modalService: ModalService,
    private lugarService: LugarService,
    private toast: ToastService
  ) {}

  lugares: LugarProduccion[] = [];
  vista: 'lista' | 'formulario' | 'exito' = 'lista';
  modoEdicion = false;
  cargando = false;
  error = '';
  mostrarModalRechazo = false;
  lugarArechazar: LugarProduccion | null = null;
  motivoRechazo = '';

  formulario: LugarProduccion = this.formularioVacio();

  ngOnInit(): void {
    setTimeout(() => { this.cargarLugares(); }, 100);
  }

  cargarLugares(): void {
    this.cargando = true;
    this.lugarService.listarLugares().subscribe({
      next: (data: any[]) => {
        this.lugares = data.map((l: any) => ({
          id: l.nroRegistroICA,
          nombre: l.nombre,
          productorTitular: l.nroDocProductor,
          numeroICA: l.nroRegistroICA,
          predioAsociado: l.nroPredial,
          extension: l.extension,
          estado: l.estado === 'APROBADO' ? 'Activo' :
                  l.estado === 'RECHAZADO' ? 'Inactivo' : 'Pendiente'
        }));
        this.cargando = false;
      },
      error: () => {
        this.toast.error('Error al cargar lugares de producción');
        this.cargando = false;
      }
    });
  }

  formularioVacio(): LugarProduccion {
    return {
      id: '', nombre: '', productorTitular: '',
      numeroICA: '', predioAsociado: '',
      extension: 0, estado: 'Pendiente'
    };
  }

  abrirNuevo(): void {
    this.formulario = this.formularioVacio();
    this.modoEdicion = false;
    this.vista = 'formulario';
  }

  abrirEditar(l: LugarProduccion): void {
    this.formulario = { ...l };
    this.modoEdicion = true;
    this.vista = 'formulario';
  }

  aprobar(l: LugarProduccion): void {
    if (confirm('¿Está seguro de aprobar este lugar de producción?')) {
      this.lugarService.aprobarLugar(l.numeroICA).subscribe({
        next: () => {
          l.estado = 'Activo';
          this.toast.exito('Lugar de producción aprobado exitosamente.');
        },
        error: () => { this.toast.error('Error al aprobar lugar'); }
      });
    }
  }

  abrirRechazo(l: LugarProduccion): void {
    this.modalService.abrir({
      titulo: 'Motivo de rechazo',
      placeholder: 'Escriba el motivo del rechazo...',
      alConfirmar: (motivo: string) => {
        this.lugarService.rechazarLugar(l.numeroICA).subscribe({
          next: () => {
            l.estado = 'Inactivo';
            this.toast.exito('Lugar de producción rechazado correctamente.');
          },
          error: () => { this.toast.error('Error al rechazar lugar'); }
        });
      }
    });
  }

  desactivar(l: LugarProduccion): void {
    if (confirm('¿Está seguro de desactivar este lugar de producción?')) {
      this.lugarService.desactivarLugar(l.numeroICA).subscribe({
        next: () => {
          l.estado = 'Inactivo';
          this.toast.exito('Lugar de producción desactivado correctamente.');
        },
        error: () => { this.toast.error('Error al desactivar lugar'); }
      });
    }
  }

  alGuardar(lugar: LugarProduccion): void {
    if (lugar.id) {
      this.lugarService.actualizarLugar(lugar.numeroICA, {
        nombre: lugar.nombre,
        nroPredial: lugar.predioAsociado,
        nombreEmpresa: lugar.nombre,
        telefonoEmpresa: lugar.extension,
        ubicacion: '',
        departamento: '',
        municipio: '',
        vereda: ''
      }).subscribe({
        next: () => {
          this.cargarLugares();
          this.toast.exito('Lugar de producción actualizado exitosamente.');
          this.vista = 'exito';
        },
        error: () => { this.toast.error('Error al actualizar lugar'); }
      });
    } else {
      this.lugarService.crearLugar({
        nombre: lugar.nombre,
        nroPredial: lugar.predioAsociado,
        nombreEmpresa: lugar.nombre,
        telefonoEmpresa: String(lugar.extension),
        ubicacion: '',
        departamento: '',
        municipio: '',
        vereda: '',
        nroDocProductor: lugar.productorTitular
      }).subscribe({
        next: () => {
          this.cargarLugares();
          this.toast.exito('Lugar de producción creado exitosamente.');
          this.vista = 'exito';
        },
        error: () => { this.toast.error('Error al crear lugar'); }
      });
    }
  }

  toggleEstado(l: LugarProduccion): void {
    l.estado = l.estado === 'Activo' ? 'Inactivo' : 'Activo';
  }

  alCancelar(): void { this.vista = 'lista'; }

  volver(): void {
    this.vista = 'lista';
    this.cargarLugares();
  }
}