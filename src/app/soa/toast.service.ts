import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Toast {
  id: number;
  mensaje: string;
  tipo: 'exito' | 'error' | 'info';
  saliendo?: boolean;
}

@Injectable({ providedIn: 'root' })
export class ToastService {

  private toastsSubject = new BehaviorSubject<Toast[]>([]);
  toasts$ = this.toastsSubject.asObservable();
  private contador = 0;

  mostrar(mensaje: string, tipo: 'exito' | 'error' | 'info' = 'info', duracion = 3000): void {
    const id = ++this.contador;
    const toast: Toast = { id, mensaje, tipo };
    this.toastsSubject.next([...this.toastsSubject.value, toast]);

    setTimeout(() => {
      const toasts = this.toastsSubject.value.map(t =>
        t.id === id ? { ...t, saliendo: true } : t
      );
      this.toastsSubject.next(toasts);
      setTimeout(() => {
        this.toastsSubject.next(this.toastsSubject.value.filter(t => t.id !== id));
      }, 300);
    }, duracion);
  }

  exito(mensaje: string): void { this.mostrar(mensaje, 'exito'); }
  error(mensaje: string): void { this.mostrar(mensaje, 'error'); }
  info(mensaje: string): void { this.mostrar(mensaje, 'info'); }
}