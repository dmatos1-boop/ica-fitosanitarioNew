import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalService } from '../../../soa/modal-service';
import { ExitoComponent } from '../../exito/exito';
import { InspeccionService } from '../../../soa/inspeccion.service';
import { UsuarioService } from '../../../soa/usuario.service';
import { LugarService } from '../../../soa/lugar.service';

interface Inspeccion {
  id: number;
  codigo: string;
  lugarProduccion: string;
  tipo: string;
  fechaProgramada: string;
  tecnicoAsignado: string;
  estado: 'Programada' | 'Solicitada' | 'Cancelada' | 'Realizada';
}

@Component({
  selector: 'app-gestion-inspecciones',
  standalone: true,
  imports: [CommonModule, FormsModule, ExitoComponent],
  templateUrl: './gestion-inspecciones.html',
  styleUrl: './gestion-inspecciones.css',
})
export class GestionInspecciones implements OnInit {

  vista: 'lista' | 'formulario' | 'exito' = 'lista';
  modoFormulario: 'nueva' | 'asignar' | 'reasignar' = 'nueva';
  inspeccionSeleccionada: Inspeccion | null = null;
  tecnicoSeleccionado = '';
  cargando = false;
  error = '';

  lugaresActivos: any[] = [];
  tecnicosActivos: any[] = [];
  tiposInspeccion = ['FITOSANITARIA', 'TECNICA'];

  inspecciones: Inspeccion[] = [];
  formulario: Partial<Inspeccion> = {};

  constructor(
    private modalService: ModalService,
    private inspeccionService: InspeccionService,
    private usuarioService: UsuarioService,
    private lugarService: LugarService
  ) {}

  ngOnInit(): void {
  this.cargarInspecciones();
  this.cargarTecnicos();
  this.cargarLugares();
}

  cargarTecnicos(): void {
    this.usuarioService.listarUsuarios().subscribe({
      next: (data: any[]) => {
        this.tecnicosActivos = data.filter(u => u.rol === 'TECNICO' && u.estado === 'ACTIVO');
      },
      error: () => { this.error = 'Error al cargar técnicos'; }
    });
  }

  cargarLugares(): void {
    this.lugarService.listarLugares().subscribe({
      next: (data: any[]) => { this.lugaresActivos = data; },
      error: () => { this.error = 'Error al cargar lugares'; }
    });
  }

  cargarInspecciones(): void {
  this.inspeccionService.listarInspecciones().subscribe({
    next: (data: any[]) => {
      this.inspecciones = data.map((i: any) => ({
        id: i.idOrden,
        codigo: `INS-${String(i.idOrden).padStart(3, '0')}`,
        lugarProduccion: i.lugarProduccion || i.nroRegICAlugar,
        tipo: i.tipoInspeccion,
        fechaProgramada: i.fechaProgramada ? i.fechaProgramada.split('T')[0] : i.fechaSolicitud ? i.fechaSolicitud.split('T')[0] : '—',
        tecnicoAsignado: i.documentoTecnico || '',
        estado: i.estado === 'PROGRAMADA' ? 'Programada' :
                i.estado === 'SOLICITADA' ? 'Solicitada' :
                i.estado === 'CANCELADA'  ? 'Cancelada'  : 'Realizada'
      }));
    },
    error: () => { this.error = 'Error al cargar inspecciones'; }
  });
}

  nuevaInspeccion(): void {
    this.formulario = {};
    this.tecnicoSeleccionado = '';
    this.modoFormulario = 'nueva';
    this.inspeccionSeleccionada = null;
    this.vista = 'formulario';
  }

  abrirAsignacion(ins: Inspeccion): void {
    this.inspeccionSeleccionada = ins;
    this.tecnicoSeleccionado = '';
    this.modoFormulario = 'asignar';
    this.vista = 'formulario';
  }

  abrirReasignacion(ins: Inspeccion): void {
    this.inspeccionSeleccionada = ins;
    this.tecnicoSeleccionado = ins.tecnicoAsignado;
    this.modoFormulario = 'reasignar';
    this.vista = 'formulario';
  }

  abrirCancelacion(ins: Inspeccion): void {
    this.modalService.abrir({
      titulo: 'Motivo de cancelación',
      placeholder: 'Escriba el motivo de la cancelación...',
      alConfirmar: (motivo: string) => {
        this.inspeccionService.cancelarInspeccion(ins.id, motivo).subscribe({
          next: () => { ins.estado = 'Cancelada'; },
          error: () => { this.error = 'Error al cancelar inspección'; }
        });
      }
    });
  }

  guardar(): void {
    if (this.cargando) return;
    this.cargando = true;

    if (this.modoFormulario === 'asignar' && this.inspeccionSeleccionada) {
  if (!this.tecnicoSeleccionado) {
    alert('Debe seleccionar un técnico.');
    this.cargando = false;
    return;
  }
  this.inspeccionService.asignarTecnico(this.inspeccionSeleccionada.id, this.tecnicoSeleccionado).subscribe({
    next: () => {
      this.cargando = false;
      this.vista = 'exito';
    },
    error: () => { this.cargando = false; this.error = 'Error al asignar técnico'; }
  });

    } else if (this.modoFormulario === 'reasignar' && this.inspeccionSeleccionada) {
  if (!this.tecnicoSeleccionado) {
    alert('Debe seleccionar un técnico.');
    this.cargando = false;
    return;
  }
  this.inspeccionService.asignarTecnico(this.inspeccionSeleccionada.id, this.tecnicoSeleccionado).subscribe({
    next: () => {
      this.cargando = false;
      this.vista = 'exito';
    },
    error: () => { this.cargando = false; this.error = 'Error al reasignar técnico'; }
  });

    } else if (this.modoFormulario === 'nueva') {
      this.inspeccionService.programarInspeccion({
        nroRegICAlugar: this.formulario.lugarProduccion,
        tipoInspeccion: this.formulario.tipo,
        fechaProgramada: this.formulario.fechaProgramada,
        documentoTecnico: this.tecnicoSeleccionado || null,
        nroDocFuncionario: '111222333'
      }).subscribe({
        next: () => {
          this.cargarInspecciones();
          this.cargando = false;
          this.vista = 'exito';
        },
        error: () => { this.cargando = false; this.error = 'Error al programar inspección'; }
      });
    }
  }

  volver(): void {
    this.vista = 'lista';
    this.cargarInspecciones();
  }
}