import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../../../soa/usuario.service';
import { PredioService } from '../../../soa/predio.service';
import { CultivoService } from '../../../soa/cultivo.service';
import { InspeccionService } from '../../../soa/inspeccion.service';

@Component({
  selector: 'app-admin-inicio',
  imports: [CommonModule],
  templateUrl: './admin-inicio.html',
  styleUrl: './admin-inicio.css',
})
export class AdminInicio implements OnInit {

  constructor(
    private router: Router,
    private usuarioService: UsuarioService,
    private predioService: PredioService,
    private cultivoService: CultivoService,
    private inspeccionService: InspeccionService
  ) {}

  resumen = [
    { label: 'Usuarios Activos', valor: 0, icono: '👤' },
    { label: 'Predios Registrados', valor: 0, icono: '🗺️' },
    { label: 'Inspecciones Realizadas', valor: 0, icono: '🕵🏼‍♂️' },
    { label: 'Cultivos Activos', valor: 0, icono: '🌱' },
  ];

  pendientesData = [
    { label: 'Registro de Usuario', valor: 0, icono: '👨🏼‍🌾', ruta: 'usuarios' },
    { label: 'Registro de Predio', valor: 0, icono: '⛰️', ruta: 'predios' },
    { label: 'Registro Lugar Produccion', valor: 0, icono: '🏭', ruta: 'lugares-produccion' },
    { label: 'Registro Lote', valor: 0, icono: '🏠', ruta: 'lotes' },
    { label: 'Cita de Inspección', valor: 0, icono: '📅', ruta: 'inspecciones' },
  ];

  ngOnInit(): void {
    this.cargarResumen();
  }

  cargarResumen(): void {
    this.usuarioService.listarUsuarios().subscribe({
      next: (data: any[]) => {
        this.resumen[0].valor = data.filter(u => u.estado === 'ACTIVO').length;
      },
      error: (err) => console.error('Error usuarios:', err)
    });

    this.predioService.listarPredios().subscribe({
      next: (data: any[]) => {
        this.resumen[1].valor = data.length;
        this.pendientesData[1].valor = data.filter(p => p.estado === 'PENDIENTE').length;
      },
      error: (err) => console.error('Error predios:', err)
    });

    this.inspeccionService.listarInspecciones().subscribe({
      next: (data: any[]) => {
        this.resumen[2].valor = data.filter(i => i.estado === 'REALIZADA').length;
        this.pendientesData[4].valor = data.filter(i => i.estado === 'PENDIENTE').length;
      },
      error: (err) => console.error('Error inspecciones:', err)
    });

    this.cultivoService.listarCultivos().subscribe({
      next: (data: any[]) => {
        this.resumen[3].valor = data.filter(c => c.estado === 'ACTIVO').length;
      },
      error: (err) => console.error('Error cultivos:', err)
    });
  }

  pendientes(item: any): void {
    this.router.navigate(['/admin', item.ruta]);
  }
}