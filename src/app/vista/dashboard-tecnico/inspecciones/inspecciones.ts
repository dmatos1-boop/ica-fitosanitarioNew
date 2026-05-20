import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ExitoComponent } from '../../exito/exito';
interface Inspeccion {
  id:              number;
  codigo:          string;
  lugarProduccion: string;
  tipo:            'FITOSANITARIA' | 'TECNICA';
  fechaProgramada: string;
  estado:          'Programada' | 'Realizada';
  productor:       string;
}

interface ResultadoFitosanitario {
  estadoFenologico:      string;
  areaInspeccionada:     number;
  totalPlantas:          number;
  plantasAfectadas:      number;
  cantidadProyectada:    number;
  cantidadCosechada:     number;
  comentarios:           string;
  porcentajeInfestacion: number;
  nivelAlerta:           'BAJO' | 'MEDIO' | 'ALTO';
}

interface ResultadoTecnico {
  areaAcopio:            number;
  areaResiduosVegetales: number;
  areaAlmacenamiento:    number;
  areaDosificacion:      number;
  areaResiduosMezclas:   number;
  areaHerramientas:      number;
  areaSanitaria:         number;
  comentarios:           string;
}

@Component({
  selector: 'app-inspecciones',
  standalone: true,
  imports: [CommonModule, FormsModule, ExitoComponent],
  templateUrl: './inspecciones.html',
  styleUrl: './inspecciones.css'
})
export class Misinspecciones {
  Object = Object;

  vista: 'lista' | 'detalle' | 'form-fito' | 'form-tecnica' | 'resultado-fito' | 'exito' = 'lista';
  inspeccionSeleccionada: Inspeccion | null = null;

  // ── Errores de validación por campo ───────────────────────
  // Cada clave corresponde a un campo del formulario
  erroresFito: Record<string, string>    = {};
  erroresTecnica: Record<string, string> = {};

  // ── Datos de prueba ────────────────────────────────────────
  inspecciones: Inspeccion[] = [
    { id: 1,
      codigo: 'INS-001',
      lugarProduccion: 'Invernadero Norte',
      tipo: 'FITOSANITARIA',
      fechaProgramada: '2026-04-20',
      estado: 'Programada',
      productor: 'Carlos Pérez'  
    },
    { id: 2,
      codigo: 'INS-002',
      lugarProduccion: 'Cultivo Sur',
      tipo: 'TECNICA',
      fechaProgramada: '2026-04-22',
      estado: 'Programada',
      productor: 'Ana Ruiz'
    },
    { id: 3,
      codigo: 'INS-003',
      lugarProduccion: 'Finca El Rosal',
      tipo: 'FITOSANITARIA',
      fechaProgramada: '2026-04-10',
      estado: 'Realizada',
      productor: 'María Castro'
    },
  ];

  // ── Formulario fitosanitario ───────────────────────────────
  formFito: Omit<ResultadoFitosanitario, 'porcentajeInfestacion' | 'nivelAlerta'> = this.fitoVacio();

  fitoVacio() {
    return {
      estadoFenologico:   '',
      areaInspeccionada:  0,
      totalPlantas:       0,
      plantasAfectadas:   0,
      cantidadProyectada: 0,
      cantidadCosechada:  0,
      comentarios:        ''
    };
  }

  resultadoFito: ResultadoFitosanitario | null = null;

  // ── Formulario técnico ─────────────────────────────────────
  formTecnica: ResultadoTecnico = this.tecnicaVacio();

  tecnicaVacio(): ResultadoTecnico {
    return {
      areaAcopio:            0,
      areaResiduosVegetales: 0,
      areaAlmacenamiento:    0,
      areaDosificacion:      0,
      areaResiduosMezclas:   0,
      areaHerramientas:      0,
      areaSanitaria:         0,
      comentarios:           ''
    };
  }

  // ── Navegación ─────────────────────────────────────────────

  verDetalle(ins: Inspeccion): void {
    this.inspeccionSeleccionada = ins;
    this.vista = 'detalle';
  }

  realizarInspeccion(ins: Inspeccion): void {
    this.inspeccionSeleccionada = ins;
    this.erroresFito   = {};
    this.erroresTecnica = {};

    if (ins.tipo === 'FITOSANITARIA') {
      this.formFito = this.fitoVacio();
      this.vista    = 'form-fito';
    } else {
      this.formTecnica = this.tecnicaVacio();
      this.vista       = 'form-tecnica';
    }
  }

  // ── Validación fitosanitario ───────────────────────────────
  // Retorna true si el formulario es válido, false si tiene errores
  validarFito(): boolean {
    this.erroresFito = {};

    if (!this.formFito.estadoFenologico.trim())
      this.erroresFito['estadoFenologico'] = 'El estado fenológico es obligatorio.';

    if (!this.formFito.areaInspeccionada || this.formFito.areaInspeccionada <= 0)
      this.erroresFito['areaInspeccionada'] = 'El área debe ser mayor a 0.';

    if (!this.formFito.totalPlantas || this.formFito.totalPlantas <= 0)
      this.erroresFito['totalPlantas'] = 'La cantidad total de plantas debe ser mayor a 0.';

    if (this.formFito.plantasAfectadas < 0)
      this.erroresFito['plantasAfectadas'] = 'No puede ser un valor negativo.';

    if (this.formFito.plantasAfectadas > this.formFito.totalPlantas)
      this.erroresFito['plantasAfectadas'] = 'No puede superar el total de plantas.';

    if (!this.formFito.cantidadProyectada || this.formFito.cantidadProyectada <= 0)
      this.erroresFito['cantidadProyectada'] = 'La cantidad proyectada debe ser mayor a 0.';

    if (!this.formFito.cantidadCosechada || this.formFito.cantidadCosechada <= 0)
      this.erroresFito['cantidadCosechada'] = 'La cantidad cosechada debe ser mayor a 0.';

    // Retorna true si no hay ningún error
    return Object.keys(this.erroresFito).length === 0;
  }

  // ── Validación técnica ─────────────────────────────────────
  validarTecnica(): boolean {
    this.erroresTecnica = {};

    if (!this.formTecnica.areaAcopio || this.formTecnica.areaAcopio <= 0)
      this.erroresTecnica['areaAcopio'] = 'El área de acopio debe ser mayor a 0.';

    if (!this.formTecnica.areaResiduosVegetales || this.formTecnica.areaResiduosVegetales <= 0)
      this.erroresTecnica['areaResiduosVegetales'] = 'El área de residuos vegetales debe ser mayor a 0.';

    if (!this.formTecnica.areaAlmacenamiento || this.formTecnica.areaAlmacenamiento <= 0)
      this.erroresTecnica['areaAlmacenamiento'] = 'El área de almacenamiento debe ser mayor a 0.';

    if (!this.formTecnica.areaDosificacion || this.formTecnica.areaDosificacion <= 0)
      this.erroresTecnica['areaDosificacion'] = 'El área de dosificación debe ser mayor a 0.';

    if (!this.formTecnica.areaResiduosMezclas || this.formTecnica.areaResiduosMezclas <= 0)
      this.erroresTecnica['areaResiduosMezclas'] = 'El área de residuos de mezclas debe ser mayor a 0.';

    if (!this.formTecnica.areaHerramientas || this.formTecnica.areaHerramientas <= 0)
      this.erroresTecnica['areaHerramientas'] = 'El área de herramientas debe ser mayor a 0.';

    if (!this.formTecnica.areaSanitaria || this.formTecnica.areaSanitaria <= 0)
      this.erroresTecnica['areaSanitaria'] = 'El área sanitaria debe ser mayor a 0.';

    return Object.keys(this.erroresTecnica).length === 0;
  }

  // ── Guardar fitosanitario ──────────────────────────────────
  guardarFito(): void {
    // Detiene el guardado si hay errores
    if (!this.validarFito()) return;

    const porcentaje = (this.formFito.plantasAfectadas / this.formFito.totalPlantas) * 100;

    let nivel: 'BAJO' | 'MEDIO' | 'ALTO';
    if (porcentaje <= 20)      nivel = 'BAJO';
    else if (porcentaje <= 60) nivel = 'MEDIO';
    else                       nivel = 'ALTO';

    this.resultadoFito = {
      ...this.formFito,
      porcentajeInfestacion: Math.round(porcentaje * 100) / 100,
      nivelAlerta:           nivel
    };

    if (this.inspeccionSeleccionada)
      this.inspeccionSeleccionada.estado = 'Realizada';

    this.vista = 'resultado-fito';
  }

  // ── Guardar técnico ────────────────────────────────────────
  guardarTecnica(): void {
    if (!this.validarTecnica()) return;

    if (this.inspeccionSeleccionada)
      this.inspeccionSeleccionada.estado = 'Realizada';

    this.vista = 'exito';
  }

  volver(): void { this.vista = 'lista'; }
}