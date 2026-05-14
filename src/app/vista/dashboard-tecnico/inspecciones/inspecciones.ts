import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ExitoComponent } from '../../exito/exito';

// ── Modelos ───────────────────────────────────────────────────

interface Inspeccion {
  id:               number;
  codigo:           string;
  lugarProduccion:  string;
  tipo:             'FITOSANITARIA' | 'TECNICA';
  fechaProgramada:  string;
  estado:           'Programada' | 'Realizada';
  productor:        string;
}

// Resultado del formulario fitosanitario
interface ResultadoFitosanitario {
  estadoFenologico:      string;
  areaInspeccionada:     number;
  totalPlantas:          number;
  plantasAfectadas:      number;
  cantidadProyectada:    number;
  cantidadCosechada:     number;
  comentarios:           string;
  // Calculados automáticamente al guardar
  porcentajeInfestacion: number;
  nivelAlerta:           'BAJO' | 'MEDIO' | 'ALTO';
}

// Resultado del formulario técnico
interface ResultadoTecnico {
  areaAcopio:             number;
  areaResiduosVegetales:  number;
  areaAlmacenamiento:     number;
  areaDosificacion:       number;
  areaResiduosMezclas:    number;
  areaHerramientas:       number;
  areaSanitaria:          number;
  comentarios:            string;
}

@Component({
  selector: 'app-inspecciones',
  standalone: true,
  imports: [CommonModule, FormsModule, ExitoComponent],
  templateUrl: './inspecciones.html',
  styleUrl: './inspecciones.css'
})
export class Misinspecciones {

  // ── Estado de la vista ─────────────────────────────────────
  // 'lista'          → tabla principal
  // 'detalle'        → ver información completa
  // 'form-fito'      → formulario fitosanitario
  // 'form-tecnica'   → formulario técnico
  // 'resultado-fito' → resultado con nivel de alerta
  // 'exito'          → confirmación inspección técnica guardada
  vista: 'lista' | 'detalle' | 'form-fito' | 'form-tecnica' | 'resultado-fito' | 'exito' = 'lista';

  inspeccionSeleccionada: Inspeccion | null = null;

  // ── Datos estáticos de prueba ──────────────────────────────
  inspecciones: Inspeccion[] = [
    {
      id: 1,
      codigo: 'INS-001',
      lugarProduccion: 'Invernadero Norte',
      tipo: 'FITOSANITARIA',
      fechaProgramada: '2026-04-20',
      estado: 'Programada',
      productor: 'Carlos Pérez'
    },
    {
      id: 2,
      codigo: 'INS-002',
      lugarProduccion: 'Cultivo Sur',
      tipo: 'TECNICA',
      fechaProgramada: '2026-04-22',
      estado: 'Programada',
      productor: 'Ana Ruiz'
    },
    {
      id: 3,
      codigo: 'INS-003',
      lugarProduccion: 'Finca El Rosal',
      tipo: 'FITOSANITARIA',
      fechaProgramada: '2026-04-10',
      estado: 'Realizada',
      productor: 'María Castro'
    },
  ];

  // ── Formulario fitosanitario ───────────────────────────────
  formFito: Omit<ResultadoFitosanitario, 'porcentajeInfestacion' | 'nivelAlerta'> = {
    estadoFenologico:   '',
    areaInspeccionada:  0,
    totalPlantas:       0,
    plantasAfectadas:   0,
    cantidadProyectada: 0,
    cantidadCosechada:  0,
    comentarios:        ''
  };

  // Resultado calculado del fitosanitario
  resultadoFito: ResultadoFitosanitario | null = null;

  // ── Formulario técnico ─────────────────────────────────────
  formTecnica: ResultadoTecnico = {
    areaAcopio:            0,
    areaResiduosVegetales: 0,
    areaAlmacenamiento:    0,
    areaDosificacion:      0,
    areaResiduosMezclas:   0,
    areaHerramientas:      0,
    areaSanitaria:         0,
    comentarios:           ''
  };

  // ── Navegación ─────────────────────────────────────────────

  verDetalle(ins: Inspeccion): void {
    this.inspeccionSeleccionada = ins;
    this.vista = 'detalle';
  }

  realizarInspeccion(ins: Inspeccion): void {
    this.inspeccionSeleccionada = ins;

    // Redirige al formulario según el tipo de inspección
    if (ins.tipo === 'FITOSANITARIA') {
      this.formFito = {
        estadoFenologico:   '',
        areaInspeccionada:  0,
        totalPlantas:       0,
        plantasAfectadas:   0,
        cantidadProyectada: 0,
        cantidadCosechada:  0,
        comentarios:        ''
      };
      this.vista = 'form-fito';
    } else {
      this.formTecnica = {
        areaAcopio:            0,
        areaResiduosVegetales: 0,
        areaAlmacenamiento:    0,
        areaDosificacion:      0,
        areaResiduosMezclas:   0,
        areaHerramientas:      0,
        areaSanitaria:         0,
        comentarios:           ''
      };
      this.vista = 'form-tecnica';
    }
  }

  // ── Guardar formulario fitosanitario ───────────────────────
  guardarFito(): void {
    const porcentaje = this.formFito.totalPlantas > 0
      ? (this.formFito.plantasAfectadas / this.formFito.totalPlantas) * 100
      : 0;

    // Determina el nivel de alerta según los umbrales configurados
    let nivel: 'BAJO' | 'MEDIO' | 'ALTO';
    if (porcentaje <= 20)       nivel = 'BAJO';
    else if (porcentaje <= 60)  nivel = 'MEDIO';
    else                        nivel = 'ALTO';

    // Guarda el resultado calculado
    this.resultadoFito = {
      ...this.formFito,
      porcentajeInfestacion: Math.round(porcentaje * 100) / 100,
      nivelAlerta:           nivel
    };

    // Cambia la inspección a Realizada
    if (this.inspeccionSeleccionada) {
      this.inspeccionSeleccionada.estado = 'Realizada';
    }

    this.vista = 'resultado-fito';
  }

  // ── Guardar formulario técnico ─────────────────────────────
  guardarTecnica(): void {
    if (this.inspeccionSeleccionada) {
      this.inspeccionSeleccionada.estado = 'Realizada';
    }
    this.vista = 'exito';
  }

  volver(): void { this.vista = 'lista'; }
}