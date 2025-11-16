// src/app/core/guards/role.guard.ts

import { inject } from '@angular/core';
import {
  CanActivateFn,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';

export const roleGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const router = inject(Router);

  const requiredRoles = route.data['roles'] as string[] | undefined;

  // 🔹 Leer el usuario desde localStorage
  const usuarioStr = localStorage.getItem('usuario');
  let userRole: string | null = null;

  if (usuarioStr) {
    try {
      const usuario = JSON.parse(usuarioStr);
      // Ajustamos a tus nombres reales: "tipo" = "superadmin" | "admin" | ...
      userRole =
        usuario.tipo ??
        usuario.usuario_tipo ??
        usuario.role ??
        null;
    } catch (e) {
      console.error('Error parseando usuario de localStorage', e);
    }
  }

  console.log(
    'roleGuard -> requiredRoles:',
    requiredRoles,
    'userRole:',
    userRole,
    'rawUsuario:',
    usuarioStr
  );

  // Si no hay usuario en localStorage → ir al login
  if (!usuarioStr) {
    router.navigate(['/auth/login'], {
      queryParams: { redirect: state.url }
    });
    return false;
  }

  // Si no hay rol o no se pudo leer → acceso denegado
  if (!userRole) {
    router.navigate(['/forbidden']);
    return false;
  }

  // Si la ruta no define roles, dejamos pasar
  if (!requiredRoles || requiredRoles.length === 0) {
    return true;
  }

  // Si el rol del usuario está dentro de los permitidos, OK ✅
  if (requiredRoles.includes(userRole)) {
    return true;
  }

  // Si el rol no está permitido → forbidden
  router.navigate(['/forbidden']);
  return false;
};
