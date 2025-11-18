// src/app/app.routes.ts
import { Routes } from '@angular/router';

// Guards
import { authGuard } from './core/guards/auth.guard';
import { roleGuard } from './core/guards/role.guard';

export const routes: Routes = [

  // Raíz -> login/auth
  { path: '', pathMatch: 'full', redirectTo: 'auth' },

  // Auth (lazy)
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
  },

  // Dashboard principal (privado)
  {
    path: 'dashboard',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent),
  },

  // Listado de Veterinarias
  {
    path: 'veterinarias',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/veterinarias/veterinarias.component')
        .then(m => m.VeterinariasComponent),
  },

  {
  path: 'veterinaria/:veterinariaId/admin',
  canActivate: [roleGuard],
  data: { roles: ['superadmin', 'admin'] },
  loadComponent: () =>
    import('./pages/veterinaria-admin/veterinaria-admin.component').then(
      m => m.VeterinariaAdminComponent
    ),
},


  // Sucursales por veterinaria
  {
    path: 'veterinaria/:id/sucursales',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/sucursales/sucursales.component')
        .then(m => m.SucursalesComponent),
  },

  // Dashboard operativo de una sucursal
  {
    path: 'veterinaria/:veterinariaId/sucursal/:sucursalId/dashboard',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./pages/sucursal-dashboard/sucursal-dashboard.routes')
        .then(m => m.sucursalDashboardRoutes),
  },

  // Configuración dentro del dashboard de sucursal
  {
    path: 'veterinaria/:veterinariaId/sucursal/:sucursalId/dashboard/configuracion',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/configuracion/configuracion.component')
        .then(m => m.ConfiguracionComponent),
    children: [
      {
        path: 'usuarios',
        canActivate: [authGuard],
        loadComponent: () =>
          import('./pages/usuarios/usuarios.component')
            .then(m => m.UsuariosComponent),
      },
      {
        path: 'empleados',
        canActivate: [authGuard],
        loadComponent: () =>
          import('./pages/empleados/empleados.component')
            .then(m => m.EmpleadosComponent),
      },
      {
        path: 'aliados',
        canActivate: [authGuard],
        loadComponent: () =>
          import('./pages/aliados/aliados.component')
            .then(m => m.AliadosComponent),
      },
      {
        path: 'tratamientos',
        canActivate: [authGuard],
        loadComponent: () =>
          import('./pages/tratamientos/tratamientos.component')
            .then(m => m.TratamientosComponent),
      },
      {
        path: 'enfermedades',
        canActivate: [authGuard],
        loadComponent: () =>
          import('./pages/enfermedades/enfermedades.component')
            .then(m => m.EnfermedadesComponent),
      },
      {
        path: 'servicios',
        canActivate: [authGuard],
        loadComponent: () =>
          import('./pages/servicios/servicios.component')
            .then(m => m.ServiciosComponent),
      },
      {
        path: 'proveedores',
        canActivate: [authGuard],
        loadComponent: () =>
          import('./pages/proveedores/proveedores.component')
            .then(m => m.ProveedoresComponent),
      },
      {
        path: 'productos',
        canActivate: [authGuard],
        loadComponent: () =>
          import('./pages/productos/productos.component')
            .then(m => m.ProductosComponent),
      },
      { path: '', pathMatch: 'full', redirectTo: 'usuarios' },
    ],
  },

  // Detalle de nómina
  {
    path: 'veterinaria/:veterinariaId/sucursal/:sucursalId/nomina/:nominaId/detalle',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/nomina/detalle-nomina/detalle-nomina.component')
        .then(m => m.DetalleNominaComponent),
  },
  {
    path: 'veterinaria/:veterinariaId/sucursal/:sucursalId/dashboard/nomina/:nominaId/detalle',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/nomina/detalle-nomina/detalle-nomina.component')
        .then(m => m.DetalleNominaComponent),
  },

  // --- NUEVO: NECESARIO PARA QUE NO EXPLOTE EL SISTEMA
  {
    path: 'forbidden',
    loadComponent: () =>
      import('./pages/errors/forbidden/forbidden.component')
        .then(m => m.ForbiddenComponent),
  },

  // Wildcard
  { path: '**', redirectTo: 'forbidden' }

];
