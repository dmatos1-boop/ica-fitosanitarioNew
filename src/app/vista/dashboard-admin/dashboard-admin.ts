import { CommonModule } from '@angular/common';
import { Component, OnInit} from '@angular/core'
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar';
import { FormsModule } from '@angular/forms';
import { ModalService, ConfigModal } from '../../soa/modal-service';


@Component({

selector:'app-dashboard-admin',
standalone:true,
imports: [CommonModule, RouterOutlet,  SidebarComponent, FormsModule], 
templateUrl:'./dashboard-admin.html',
styleUrl:'./dashboard-admin.css'


})

export class DashboardAdminComponent implements OnInit{

    //fecha actual
fechaActual: Date = new Date();


  // Estado del modal global
  configModal:  ConfigModal | null = null;
  motivoModal = '';

  constructor(private modalService: ModalService) {}

  ngOnInit(): void {
    // Escucha cuando cualquier módulo hijo pide abrir el modal
    this.modalService.estado$.subscribe(config => {
      this.configModal  = config;
      this.motivoModal  = '';
    });
  }

  confirmarModal(): void {
    if (!this.motivoModal.trim()) {
      alert('El motivo es obligatorio.');
      return;
    }
    // Ejecuta la acción del módulo hijo que abrió el modal
    this.configModal?.alConfirmar(this.motivoModal);
    this.modalService.cerrar();
  }

  cerrarModal(): void { this.modalService.cerrar(); }
}