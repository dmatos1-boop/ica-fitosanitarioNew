import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { isPlatformBrowser } from '@angular/common';  
import { Router, RouterLinkWithHref, RouterLinkActive } from '@angular/router';
import { MenuService } from '../../soa/menu-services';
import { MenuItem } from '../../modelo/menu-item-modelo';


@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLinkWithHref, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css'
})
export class SidebarComponent implements OnInit {

  rol: string = '';
  menuItems: MenuItem[] = [];

  labelRol: Record<string, string> = {
    PRODUCTOR: 'Productor',
    FUNCIONARIO_ICA: 'Administrador',
    TECNICO: 'Técnico'
  };

  // Mapeo de roles del backend a roles del menú
  rolMenu: Record<string, string> = {
    FUNCIONARIO_ICA: 'admin',
    PRODUCTOR: 'productor',
    TECNICO: 'tecnico'
  };

  constructor(
    private menuService: MenuService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.rol = localStorage.getItem('userRole') ?? '';
      const rolParaMenu = this.rolMenu[this.rol] ?? this.rol;
      this.menuItems = this.menuService.getMenu(rolParaMenu);
    }
  }

  cerrarSesion(): void {
    localStorage.removeItem('userRole');
    localStorage.removeItem('token');
    localStorage.removeItem('nombre');
    this.router.navigate(['']);
  }
}