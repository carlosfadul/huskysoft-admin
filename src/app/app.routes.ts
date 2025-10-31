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
      },
      {
        path: 'tratamientos',
        loadComponent: () =>
          import('./pages/tratamientos/tratamientos.component').then(m => m.TratamientosComponent)
      },
      {
        path: 'enfermedades',
        loadComponent: () =>
          import('./pages/enfermedades/enfermedades.component').then(m => m.EnfermedadesComponent)
      },
      {
        path: 'servicios',
        loadComponent: () =>
          import('./pages/servicios/servicios.component').then(m => m.ServiciosComponent)
      },
      {
        path: 'proveedores',
        loadComponent: () =>
          import('./pages/proveedores/proveedores.component').then(m => m.ProveedoresComponent)
      },
      {
        path: 'productos',
        loadComponent: () =>
          import('./pages/productos/productos.component').then(m => m.ProductosComponent)
      }
    ]
  },
  {
    path: 'veterinaria/:veterinariaId/sucursal/:sucursalId/nomina/:nominaId/detalle',
    loadComponent: () =>
      import('./pages/nomina/detalle-nomina/detalle-nomina.component')
        .then(m => m.DetalleNominaComponent)
  },
  {
    path: 'veterinaria/:veterinariaId/sucursal/:sucursalId/dashboard/nomina/:nominaId/detalle',
    loadComponent: () =>
      import('./pages/nomina/detalle-nomina/detalle-nomina.component')
        .then(m => m.DetalleNominaComponent)
  }


];



