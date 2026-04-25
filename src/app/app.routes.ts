import { Routes } from '@angular/router';
import { LoginComponent } from './vista/login/login';
import { DashboardAdminComponent } from './vista/dashboard-admin/dashboard-admin';
import { DashboardTecnicoComponent } from './vista/dashboard-tecnico/dashboard-tecnico';
import { DashboardUserComponent } from './vista/dashboard-user/dashboard-user';
import { ViewInicio} from './vista/dashboard-user/view-inicio'
import { ViewForm} from './vista/dashboard-user/view-form'
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

  { path: '', component: LoginComponent ,
    children:[
      {path: 'request', component: PageRequest}
    ]
  },

  { path: 'admin', component: DashboardAdminComponent,
    children: [
    { path: 'inicio', component: AdminInicio },       // vista de bienvenida
    { path: 'usuarios', component: GestionUsuariosComponent},   // listado usuarios
    { path: 'predios', component: GestionPredios },    // listado predios
    { path: 'lugares-produccion',  component: GestionLugares },   // listado lugares
    { path: 'lotes', component: GestionLotes },      // listado lotes
    { path: 'cultivos', component: GestionCultivos },   // listado cultivos
    { path: 'plagas', component: GestionPlagas },     // listado plagas
    { path: 'inspecciones', component: GestionInspecciones },
    { path: 'umbral', component: ConfigUmbral },
    { path: '', redirectTo: 'inicio', pathMatch: 'full' }     
    ]
   },

  { path: 'tecnico', component: DashboardTecnicoComponent },

  { path: 'usuario', component: DashboardUserComponent,
    children:[
      { path: 'inicio', component: ViewInicio },// pagina de inicio dashboard
      { path: 'predio', component: ViewPredio },// gestion de predios y registro
      { path: 'formulario', component: ViewForm }, //formulario para registrar predio
      { path: 'produccion', component: ViewProduccion }, // modulo de produccion o lugares de produccion
      { path:  'formulario-produccion', component: ViewFormProduccion} , //formulario para registro de lugares de produccion
      { path: 'visita', component: ViewInspecciones },   //modulo de citas de inspecciones 
      { path: '', redirectTo: 'inicio', pathMatch: 'full' }
    ]
   }

];

