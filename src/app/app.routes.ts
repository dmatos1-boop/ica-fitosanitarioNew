import { Incio } from './vista/dashboard-tecnico/incio/incio';
import { Misinspecciones } from './vista/dashboard-tecnico/inspecciones/inspecciones';
import { Routes } from '@angular/router';
import { LoginComponent } from './vista/login/login';
import { DashboardAdminComponent } from './vista/dashboard-admin/dashboard-admin';
import { DashboardTecnicoComponent } from './vista/dashboard-tecnico/dashboard-tecnico';
import { DashboardUserComponent } from './vista/dashboard-user/dashboard-user';
import { ViewInicio } from './vista/dashboard-user/view-inicio';
import { ViewForm } from './vista/dashboard-user/view-form';
import { ViewPredio } from './vista/dashboard-user/view-predio';
import { ViewProduccion } from './vista/dashboard-user/view-produccion';
import { PageRequest } from './vista/page-request/page-request';
import { ViewFormProduccion } from './vista/dashboard-user/view-form-produccion';
import { ViewInspecciones } from './vista/dashboard-user/view-inspecciones';
import { GestionCultivos } from './vista/dashboard-admin/gestion-cultivos/gestion-cultivos';
import { GestionInspecciones } from './vista/dashboard-admin/gestion-inspecciones/gestion-inspecciones';
import { GestionLotes } from './vista/dashboard-admin/gestion-lotes/gestion-lotes';
import { GestionLugares } from './vista/dashboard-admin/gestion-lugares/gestion-lugares';
import { GestionPlagas } from './vista/dashboard-admin/gestion-plagas/gestion-plagas';
import { GestionPredios } from './vista/dashboard-admin/gestion-predios/gestion-predios';
import { GestionUsuariosComponent } from './vista/dashboard-admin/gestion-usuarios/gestion-usuarios';
import { ConfigUmbral } from './vista/dashboard-admin/config-umbral/config-umbral';
import { AdminInicio } from './vista/dashboard-admin/admin-inicio/admin-inicio';

export const routes: Routes = [

  { path: '', component: LoginComponent,
    children: [
      { path: 'request', component: PageRequest }
    ]
  },

  { path: 'admin', component: DashboardAdminComponent,
    children: [
      { path: 'inicio', component: AdminInicio },
      { path: 'usuarios', component: GestionUsuariosComponent },
      { path: 'predios', component: GestionPredios },
      { path: 'lugares-produccion', component: GestionLugares },
      { path: 'lotes', component: GestionLotes },
      { path: 'cultivos', component: GestionCultivos },
      { path: 'plagas', component: GestionPlagas },
      { path: 'inspecciones', component: GestionInspecciones },
      { path: 'umbral', component: ConfigUmbral },
      { path: '', redirectTo: 'inicio', pathMatch: 'full' }
    ]
  },

  { path: 'tecnico', component: DashboardTecnicoComponent,
    children: [
      { path: 'inicio', component: Incio },
      { path: 'asignaciones', component: Misinspecciones, data: { filtro: 'programadas' } },
      { path: 'visitas', component: Misinspecciones, data: { filtro: 'realizadas' } },
      { path: 'reportes', component: Misinspecciones, data: { filtro: 'todos' } },
      { path: '', redirectTo: 'inicio', pathMatch: 'full' }
    ]
  },

  { path: 'usuario', component: DashboardUserComponent,
    children: [
      { path: 'inicio', component: ViewInicio },
      { path: 'predio', component: ViewPredio },
      { path: 'formulario', component: ViewForm },
      { path: 'produccion', component: ViewProduccion },
      { path: 'formulario-produccion', component: ViewFormProduccion },
      { path: 'visita', component: ViewInspecciones },
      { path: '', redirectTo: 'inicio', pathMatch: 'full' }
    ]
  }

];