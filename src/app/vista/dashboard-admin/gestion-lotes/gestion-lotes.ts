import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoteService } from '../../../soa/lote.service';
import { ExitoComponent } from '../../exito/exito';

interface Lote {
  id: number;
  codigo: string;
  lugarProduccion: string;
  extension: number;
  cultivoAsociado: string;
  estado: 'Activo' | 'Inactivo' | 'Pendiente';
}

@Component({
  selector: 'app-gestion-lotes',
  standalone: true,
imports: [CommonModule, FormsModule, ExitoComponent],  templateUrl: './gestion-lotes.html',
styleUrl: './gestion-lotes.css'
})
export class GestionLotes implements OnInit {

  vista: 'lista' | 'formulario' | 'exito' = 'lista';
  modoEdicion = false;
  cargando = false;
  error = '';
  lotes: Lote[] = [];
  lugaresActivos = ['ICA-LP-2026-3571'];
  cultivosActivos = ['1'];
  formulario: Lote = this.formularioVacio();

  constructor(private loteService: LoteService) {}

  ngOnInit(): void {
    setTimeout(() => { this.cargarLotes(); }, 100);
  }

  cargarLotes(): void {
    this.cargando = true;
    this.loteService.listarLotes().subscribe({
      next: (data: any[]) => {
        this.lotes = data.map((l: any) => ({
          id: l.idLote,
          codigo: l.nroLote,
          lugarProduccion: l.nroRegICAlugar,
          extension: l.area,
          cultivoAsociado: l.cultivo || l.idCultivo,
          estado: l.estado === 'ACTIVO' ? 'Activo' : 'Inactivo'
        }));
        this.cargando = false;
      },
      error: (err: any) => {
        this.error = 'Error al cargar lotes';
        this.cargando = false;
      }
    });
  }

  formularioVacio(): Lote {
    return { id: 0, codigo: '', lugarProduccion: '', extension: 0, cultivoAsociado: '', estado: 'Activo' };
  }

  nuevo(): void {
    this.formulario = this.formularioVacio();
    this.modoEdicion = false;
    this.vista = 'formulario';
  }

  editar(l: Lote): void {
    this.formulario = { ...l };
    this.modoEdicion = true;
    this.vista = 'formulario';
  }

  toggleEstado(lote: Lote): void {
    const accion = lote.estado === 'Activo' ? 'desactivar' : 'activar';
    if (confirm(`¿Está seguro de ${accion} este lote?`)) {
      const nuevoEstado = lote.estado === 'Activo' ? 'INACTIVO' : 'ACTIVO';
      this.loteService.cambiarEstado(lote.id, nuevoEstado).subscribe({
        next: () => { lote.estado = lote.estado === 'Activo' ? 'Inactivo' : 'Activo'; },
        error: (err: any) => { this.error = 'Error al cambiar estado'; }
      });
    }
  }

  activar(l: Lote): void {
    if (confirm('¿Está seguro de activar este lote?')) {
      this.loteService.cambiarEstado(l.id, 'ACTIVO').subscribe({
        next: () => { l.estado = 'Activo'; },
        error: (err: any) => { this.error = 'Error al activar lote'; }
      });
    }
  }

  desactivar(l: Lote): void {
    if (confirm('¿Está seguro de desactivar este lote?')) {
      this.loteService.cambiarEstado(l.id, 'INACTIVO').subscribe({
        next: () => { l.estado = 'Inactivo'; },
        error: (err: any) => { this.error = 'Error al desactivar lote'; }
      });
    }
  }

  guardar(): void {
    if (this.modoEdicion) {
      this.loteService.actualizarLote(this.formulario.id, {
        nroLote: this.formulario.codigo,
        area: this.formulario.extension,
        cantPlantas: 0,
        cantProyectadaRecoleccion: 0,
        idCultivo: 1
      }).subscribe({
        next: () => { this.cargarLotes(); this.vista = 'exito'; },
        error: (err: any) => { this.error = 'Error al actualizar lote'; }
      });
    } else {
      this.loteService.crearLote({
        nroLote: this.formulario.codigo,
        area: this.formulario.extension,
        fechaSiembra: new Date().toISOString().split('T')[0],
        cantPlantas: 0,
        cantProyectadaRecoleccion: 0,
        idCultivo: 1,
        nroRegICAlugar: this.formulario.lugarProduccion
      }).subscribe({
        next: () => { this.cargarLotes(); this.vista = 'exito'; },
        error: (err: any) => { this.error = 'Error al crear lote'; }
      });
    }
  }

  eliminar(l: Lote): void {
    if (confirm('¿Está seguro de eliminar este lote? Esta acción no se puede deshacer.')) {
      this.loteService.eliminarLote(l.id).subscribe({
        next: () => { this.cargarLotes(); },
        error: (err: any) => { this.error = 'Error al eliminar lote'; }
      });
    }
  }

  volver(): void {
    this.vista = 'lista';
    this.cargarLotes();
  }
}