import { RenderMode, ServerRoute } from '@angular/ssr';
//import { DashboardUserComponent } from './vista/dashboard-user/dashboard-user';

export const serverRoutes: ServerRoute[] = [
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
  
];
