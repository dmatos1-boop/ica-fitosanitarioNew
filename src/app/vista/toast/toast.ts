import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService, Toast } from '../../soa/toast.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="toast-container">
      <div *ngFor="let toast of toasts"
           [class]="'toast toast-' + toast.tipo"
           [class.saliendo]="toast.saliendo">
        <span class="toast-icono">
          {{ toast.tipo === 'exito' ? '✅' : toast.tipo === 'error' ? '❌' : 'ℹ️' }}
        </span>
        <span class="toast-mensaje">{{ toast.mensaje }}</span>
      </div>
    </div>
  `,
  styles: [`
    .toast-container {
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 9999;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .toast {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 12px 20px;
      border-radius: 8px;
      min-width: 280px;
      max-width: 400px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      animation: slideIn 0.3s ease;
      font-size: 0.9rem;
      font-weight: 500;
    }
    .toast-exito { background: #d1e7dd; color: #0a3622; border-left: 4px solid #2d6a4f; }
    .toast-error { background: #f8d7da; color: #842029; border-left: 4px solid #dc3545; }
    .toast-info  { background: #cfe2ff; color: #084298; border-left: 4px solid #0d6efd; }
    .saliendo { animation: slideOut 0.3s ease forwards; }
    @keyframes slideIn {
      from { transform: translateX(100%); opacity: 0; }
      to   { transform: translateX(0);    opacity: 1; }
    }
    @keyframes slideOut {
      from { transform: translateX(0);    opacity: 1; }
      to   { transform: translateX(100%); opacity: 0; }
    }
  `]
})
export class ToastComponent implements OnInit {
  toasts: Toast[] = [];

  constructor(private toastService: ToastService) {}

  ngOnInit(): void {
    this.toastService.toasts$.subscribe(toasts => {
      this.toasts = toasts;
    });
  }
}