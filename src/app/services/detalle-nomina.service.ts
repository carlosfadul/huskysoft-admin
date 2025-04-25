// src/app/services/detalle-nomina.service.ts

import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DetalleNominaService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api/detalle-nomina';

  // Obtener todos los detalles por ID de nómina
  getDetallesPorNomina(nominaId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/nomina/${nominaId}`);
  }

  // Crear nuevo detalle
  crearDetalle(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  // Actualizar detalle
  actualizarDetalle(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }

  // Eliminar detalle
  eliminarDetalle(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  // Obtener un solo detalle por ID
  getDetalleById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }
}
