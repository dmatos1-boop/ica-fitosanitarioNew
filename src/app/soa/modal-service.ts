import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface ConfigModal {
  titulo:      string;
  placeholder: string;
  alConfirmar: (motivo: string) => void;
}

@Injectable({ providedIn: 'root' })
export class ModalService {

  // BehaviorSubject: guarda el último estado del modal
  private estado = new BehaviorSubject<ConfigModal | null>(null);

  // El dashboard-admin se suscribe a esto
  estado$ = this.estado.asObservable();

  // Los módulos hijos llaman a esto para abrir el modal
  abrir(config: ConfigModal): void { this.estado.next(config); }

  // Cierra el modal limpiando el estado
  cerrar(): void { this.estado.next(null); }
}