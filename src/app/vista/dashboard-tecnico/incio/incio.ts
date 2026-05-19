
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

// Modelo de la próxima inspección que se muestra en la tarjeta
interface ProximaInspeccion {
  codigo:          string;
  lugarProduccion: string;
  fecha:           string;
  hora:            string;
}

// Modelo de cada tarjeta de resumen
interface TarjetaInspeccion {
  tipo:             'FITOSANITARIA' | 'TECNICA';
  total:            number;          // cuántas tiene programadas
  proxima:          ProximaInspeccion | null; // la más cercana
}

@Component({
  selector: 'app-incio',
  imports: [CommonModule],
  templateUrl: './incio.html',
  styleUrl: './incio.css',
})
export class Incio {

    // Nombre del técnico — luego vendrá del servicio de autenticación
  nombreTecnico = 'Seul Salino';

  // Fecha actual para el saludo dinámico
  fechaActual: Date = new Date();

  // ── Tarjeta de inspecciones TÉCNICAS 
  tecnicas: TarjetaInspeccion = {
    tipo:  'TECNICA',
    total: 3,
    proxima: {
      codigo:'INS-002',
      lugarProduccion: 'Cultivo Sur',
      fecha:'2026-04-22',
      hora:'09:00 AM'
    }
  };

  // ── Tarjeta de inspecciones FITOSANITARIAS 
  fitosanitarias: TarjetaInspeccion = {
    tipo:  'FITOSANITARIA',
    total: 2,
    proxima: {
      codigo: 'INS-001',
      lugarProduccion: 'Invernadero Norte',
      fecha: '2026-04-20',
      hora: '07:30 AM'
    }
  };

  // ── Saludo dinámico según la hora del día 
  get saludo(): string {
    const hora = this.fechaActual.getHours();
    if (hora < 12)  return 'Buenos días';
    if (hora < 18)  return 'Buenas tardes';
    return 'Buenas noches';
  }

}




