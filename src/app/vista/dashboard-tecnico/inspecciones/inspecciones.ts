import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ExitoComponent } from '../../exito/exito';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { ToastService } from '../../../soa/toast.service';

interface Inspeccion {
  id:              number;
  codigo:          string;
  lugarProduccion: string;
  tipo:            'FITOSANITARIA' | 'TECNICA';
  fechaProgramada: string;
  estado:          'Programada' | 'Realizada' | 'Cancelada' | 'Solicitada';
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
export class Misinspecciones implements OnInit {
  Object = Object;

  private apiUrl = 'http://localhost:3000';
  filtroEstado = 'todos';

  vista: 'lista' | 'detalle' | 'form-fito' | 'form-tecnica' | 'resultado-fito' | 'exito' = 'lista';
  inspeccionSeleccionada: Inspeccion | null = null;
  cargando = false;
  error = '';

  erroresFito: Record<string, string>    = {};
  erroresTecnica: Record<string, string> = {};

  inspecciones: Inspeccion[] = [];

  formFito: Omit<ResultadoFitosanitario, 'porcentajeInfestacion' | 'nivelAlerta'> = this.fitoVacio();
  resultadoFito: ResultadoFitosanitario | null = null;
  formTecnica: ResultadoTecnico = this.tecnicaVacio();

  constructor(
  private http: HttpClient,
  private route: ActivatedRoute,
  @Inject(PLATFORM_ID) private platformId: Object,
  private toast: ToastService
) {}

  private getHeaders(): HttpHeaders {
    const token = isPlatformBrowser(this.platformId)
      ? localStorage.getItem('token') : '';
    return new HttpHeaders({ 'Authorization': `Bearer ${token}` });
  }

  private getDocumentoTecnico(): string {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('token');
      if (token) {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload.identificacion || '';
      }
    }
    return '';
  }

  ngOnInit(): void {
    this.filtroEstado = this.route.snapshot.data['filtro'] || 'todos';
    this.cargarInspecciones();
  }

  cargarInspecciones(): void {
    this.cargando = true;
    const doc = this.getDocumentoTecnico();
    this.http.get<any[]>(
      `${this.apiUrl}/inspecciones/asignadas/${doc}`,
      { headers: this.getHeaders() }
    ).subscribe({
      next: (data) => {
        this.inspecciones = data
          .filter((i: any) => {
            if (this.filtroEstado === 'programadas') return i.estado === 'PROGRAMADA';
            if (this.filtroEstado === 'realizadas')  return i.estado === 'REALIZADA';
            return true;
          })
          .map((i: any) => ({
            id: i.idOrden,
            codigo: `INS-${String(i.idOrden).padStart(3, '0')}`,
            lugarProduccion: i.lugarProduccion || i.nroRegICAlugar,
            tipo: i.tipoInspeccion,
            fechaProgramada: i.fechaProgramada ? i.fechaProgramada.split('T')[0] : '—',
            estado: i.estado === 'PROGRAMADA' ? 'Programada' :
                    i.estado === 'REALIZADA'  ? 'Realizada'  :
                    i.estado === 'CANCELADA'  ? 'Cancelada'  : 'Solicitada',
            productor: i.nroDocFuncionario || '—'
          }));
        this.cargando = false;
      },
      error: () => {
        this.error = 'Error al cargar inspecciones';
        this.cargando = false;
      }
    });
  }

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

  verDetalle(ins: Inspeccion): void {
    this.inspeccionSeleccionada = ins;
    this.vista = 'detalle';
  }

  realizarInspeccion(ins: Inspeccion): void {
    this.inspeccionSeleccionada = ins;
    this.erroresFito    = {};
    this.erroresTecnica = {};
    if (ins.tipo === 'FITOSANITARIA') {
      this.formFito = this.fitoVacio();
      this.vista    = 'form-fito';
    } else {
      this.formTecnica = this.tecnicaVacio();
      this.vista       = 'form-tecnica';
    }
  }

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
    return Object.keys(this.erroresFito).length === 0;
  }

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

  guardarFito(): void {
  if (!this.validarFito()) {
    this.toast.error('Por favor corrige los errores del formulario.');
    return;
  }
  if (!this.inspeccionSeleccionada) return;

  this.http.post(
    `${this.apiUrl}/inspecciones/${this.inspeccionSeleccionada.id}/fitosanitaria`,
    {
      estadoFenologico:   this.formFito.estadoFenologico,
      areaInspeccionada:  this.formFito.areaInspeccionada,
      cantidadPlantas:    this.formFito.totalPlantas,
      plantasAfectadas:   this.formFito.plantasAfectadas,
      cantidadProyectada: this.formFito.cantidadProyectada,
      cantidadReal:       this.formFito.cantidadCosechada,
      comentarios:        this.formFito.comentarios
    },
    { headers: this.getHeaders() }
  ).subscribe({
    next: (res: any) => {
      const porcentaje = (this.formFito.plantasAfectadas / this.formFito.totalPlantas) * 100;
      this.resultadoFito = {
        ...this.formFito,
        porcentajeInfestacion: Math.round(porcentaje * 100) / 100,
        nivelAlerta: res.nivelAlerta || (porcentaje > 30 ? 'ALTO' : porcentaje > 10 ? 'MEDIO' : 'BAJO')
      };
      if (this.inspeccionSeleccionada)
        this.inspeccionSeleccionada.estado = 'Realizada';
      this.toast.exito('Inspección fitosanitaria registrada exitosamente.');
      this.vista = 'resultado-fito';
    },
    error: () => {
      this.toast.error('Error al guardar la inspección fitosanitaria.');
      this.error = 'Error al guardar la inspección fitosanitaria';
    }
  });
}

guardarTecnica(): void {
  if (!this.validarTecnica()) {
    this.toast.error('Por favor corrige los errores del formulario.');
    return;
  }
  if (!this.inspeccionSeleccionada) return;

  this.http.post(
    `${this.apiUrl}/inspecciones/${this.inspeccionSeleccionada.id}/tecnica`,
    {
      areaAcopio:                this.formTecnica.areaAcopio,
      areaResiduosVegetales:     this.formTecnica.areaResiduosVegetales,
      areaAlmacenamientoInsumos: this.formTecnica.areaAlmacenamiento,
      areaDosificacion:          this.formTecnica.areaDosificacion,
      areaResiduosMezclas:       this.formTecnica.areaResiduosMezclas,
      areaHerramientas:          this.formTecnica.areaHerramientas,
      areaSanitaria:             this.formTecnica.areaSanitaria,
      comentarios:               this.formTecnica.comentarios
    },
    { headers: this.getHeaders() }
  ).subscribe({
    next: () => {
      if (this.inspeccionSeleccionada)
        this.inspeccionSeleccionada.estado = 'Realizada';
      this.toast.exito('Inspección técnica registrada exitosamente.');
      this.vista = 'exito';
    },
    error: () => {
      this.toast.error('Error al guardar la inspección técnica.');
      this.error = 'Error al guardar la inspección técnica';
    }
  });
}

  volver(): void {
    this.vista = 'lista';
    this.cargarInspecciones();
  }
}