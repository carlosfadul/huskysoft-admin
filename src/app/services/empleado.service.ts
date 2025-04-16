// src/app/services/empleado.service.ts

import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class EmpleadoService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api/empleados';

  // Obtener empleados por sucursal
  getEmpleadosPorSucursal(sucursalId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/sucursal/${sucursalId}`);
  }

  // Obtener un empleado por ID
  getEmpleadoById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // Crear nuevo empleado (usa FormData por si hay foto)
  crearEmpleado(data: FormData): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  // Actualizar empleado existente
  actualizarEmpleado(id: number, data: FormData): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }

  // Eliminar empleado
  eliminarEmpleado(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
