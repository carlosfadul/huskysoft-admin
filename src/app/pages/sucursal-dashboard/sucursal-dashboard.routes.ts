import { Routes } from '@angular/router';
import { SucursalDashboardComponent } from './sucursal-dashboard.component';

export const sucursalDashboardRoutes: Routes = [
  {
    path: '',
    component: SucursalDashboardComponent,
    children: [
      {
        path: 'clientes',
        loadComponent: () =>
          import('../../components/clientes/clientes.component').then(m => m.ClientesComponent)
      },
      {
        path: 'mascotas',
        loadComponent: () =>
          import('../../components/mascotas/mascotas.component').then(m => m.MascotasComponent)
      },
      {
        path: '',
        redirectTo: 'clientes',
        pathMatch: 'full'
      }
    ]
  }
];
