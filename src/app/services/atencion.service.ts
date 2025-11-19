// src/app/services/atencion.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AtencionService {
  private apiUrl = `${environment.apiUrl}/atenciones`;

  constructor(private http: HttpClient) {}

  // 👉 Listar atenciones por mascota
  getAtencionesPorMascota(mascotaId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/mascota/${mascotaId}`);
  }

  // 👉 Crear atención (con soporte opcional para archivo adjunto)
  createAtencion(data: any, archivoAdjunto?: File): Observable<any> {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        formData.append(key, String(value));
      }
    });

    if (archivoAdjunto) {
      formData.append('atencion_archivoAdjunto', archivoAdjunto);
    }

    return this.http.post<any>(this.apiUrl, formData);
  }

  // Alias por si en algún lado usamos "crearAtencion"
  crearAtencion(data: any, archivoAdjunto?: File): Observable<any> {
    return this.createAtencion(data, archivoAdjunto);
  }

  // 👉 Actualizar atención (también vía FormData por si se cambia el archivo)
  updateAtencion(id: number, data: any, archivoAdjunto?: File): Observable<any> {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        formData.append(key, String(value));
      }
    });

    if (archivoAdjunto) {
      formData.append('atencion_archivoAdjunto', archivoAdjunto);
    }

    return this.http.put<any>(`${this.apiUrl}/${id}`, formData);
  }

  // Alias por si en algún lado usamos "actualizarAtencion"
  actualizarAtencion(id: number, data: any, archivoAdjunto?: File): Observable<any> {
    return this.updateAtencion(id, data, archivoAdjunto);
  }

  // 👉 Eliminar atención
  deleteAtencion(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
