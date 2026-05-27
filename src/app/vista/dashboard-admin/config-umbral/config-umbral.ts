import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ExitoComponent } from '../../exito/exito';
import { PlagaService } from '../../../soa/plaga.service';
import { ToastService } from '../../../soa/toast.service';

@Component({
  selector: 'app-config-umbral',
  standalone: true,
  imports: [CommonModule, FormsModule, ExitoComponent],
  templateUrl: './config-umbral.html',
  styleUrl: './config-umbral.css'
})
export class ConfigUmbral implements OnInit {

  vista: 'formulario' | 'exito' = 'formulario';
  errorRangos = '';
  cargando = false;
  error = '';
  plagas: any[] = [];
  intentoEnvio = false;

  umbral = {
    bajo:  { min: 0,  max: 20  },
    medio: { min: 21, max: 60  },
    alto:  { min: 61, max: 100 }
  };

  constructor(
    private plagaService: PlagaService,
    private toast: ToastService
  ) {}

  ngOnInit(): void {
    this.cargarPlagas();
  }

  cargarPlagas(): void {
    this.plagaService.listarPlagas().subscribe({
      next: (data: any[]) => { this.plagas = data; },
      error: () => { this.toast.error('Error al cargar plagas'); }
    });
  }

  guardar(): void {
    this.intentoEnvio = true;
    this.errorRangos = '';
    const { bajo, medio, alto } = this.umbral;

    if (bajo.min !== 0) {
      this.errorRangos = 'El rango BAJO debe comenzar en 0.';
      this.toast.error('El rango BAJO debe comenzar en 0.');
      return;
    }
    if (bajo.max + 1 !== medio.min) {
      this.errorRangos = `El rango BAJO termina en ${bajo.max} pero MEDIO empieza en ${medio.min}. Deben ser consecutivos.`;
      this.toast.error(this.errorRangos);
      return;
    }
    if (medio.max + 1 !== alto.min) {
      this.errorRangos = `El rango MEDIO termina en ${medio.max} pero ALTO empieza en ${alto.min}. Deben ser consecutivos.`;
      this.toast.error(this.errorRangos);
      return;
    }

    this.cargando = true;
    const promesas = this.plagas.map(p =>
      this.plagaService.actualizarUmbral(p.idPlaga, bajo.max).toPromise()
    );

    Promise.all(promesas).then(() => {
      this.cargando = false;
      this.toast.exito('Umbrales de alerta guardados exitosamente.');
      this.vista = 'exito';
    }).catch(() => {
      this.cargando = false;
      this.toast.error('Error al guardar umbrales');
    });
  }

  volver(): void { this.vista = 'formulario'; }
}