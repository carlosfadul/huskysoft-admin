// src/app/app.routes.ts

import { Routes } from '@angular/router';
import { authGuard } from './auth/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent),
    canActivate: [authGuard]
  },
  {
    path: 'veterinarias',
    loadComponent: () =>
      import('./pages/veterinarias/veterinarias.component').then(m => m.VeterinariasComponent)
  },
  {
    path: 'veterinaria/:id/sucursales',
    loadComponent: () =>
      import('./pages/sucursales/sucursales.component').then(m => m.SucursalesComponent),
    canActivate: [authGuard]
  },
  {
    path: 'veterinaria/:veterinariaId/sucursal/:sucursalId/dashboard',
    loadChildren: () =>
      import('./pages/sucursal-dashboard/sucursal-dashboard.routes').then(m => m.sucursalDashboardRoutes)
  },
  {
    path: 'veterinaria/:veterinariaId/admin',
    loadComponent: () =>
      import('./pages/veterinaria-admin/veterinaria-admin.component').then(m => m.VeterinariaAdminComponent)
  },
  {
    path: 'veterinaria/:veterinariaId/sucursal/:sucursalId/dashboard/configuracion',
    loadComponent: () =>
      import('./pages/configuracion/configuracion.component').then(m => m.ConfiguracionComponent),
    children: [
      {
        path: 'usuarios',
        loadComponent: () =>
          import('./pages/usuarios/usuarios.component').then(m => m.UsuariosComponent)
      },
      {
        path: 'empleados',
        loadComponent: () =>
          import('./pages/empleados/empleados.component').then(m => m.EmpleadosComponent)
      },
      {
        path: 'aliados',
        loadComponent: () =>
          import('./pages/aliados/aliados.component').then(m => m.AliadosComponent),
        canActivate: [authGuard]
      }
    ]
  }
];


