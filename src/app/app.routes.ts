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
    path: 'veterinaria/:id',
    loadComponent: () =>
      import('./pages/veterinaria-admin/veterinaria-admin.component').then(m => m.VeterinariaAdminComponent),
    canActivate: [authGuard]
  },
  {
    path: 'veterinaria/:id/sucursales',
    loadComponent: () =>
      import('./pages/sucursales/sucursales.component').then(m => m.SucursalesComponent),
    canActivate: [authGuard]
  }
  
    
];
