// src/app/core/guards/role.guard.ts
import { inject } from '@angular/core';
import { CanActivateFn, Router, ActivatedRouteSnapshot, UrlTree } from '@angular/router';

const TOKEN_KEY = 'auth_token';

function getRolesFromToken(): string[] {
  try {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) return [];
    // Decodificar parte payload del JWT
    const payload = JSON.parse(atob(token.split('.')[1] || ''));
    const roles = payload?.roles || payload?.role || [];
    return Array.isArray(roles) ? roles : [roles].filter(Boolean);
  } catch {
    return [];
  }
}

export const roleGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const router = inject(Router);
  const required: string[] = (route.data?.['roles'] as string[]) || [];

  // si no requiere roles explícitos, solo verifica login
  const token = localStorage.getItem(TOKEN_KEY);
  if (!token) {
    return router.createUrlTree(['/login'], {
      queryParams: { redirect: location.pathname + location.search },
    });
  }

  if (!required.length) return true;

  const roles = getRolesFromToken();
  const hasRole = required.some(r => roles.includes(r));

  return hasRole ? true : router.createUrlTree(['/forbidden']); // crea una página 403 si quieres
};
