import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AtencionService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api/atenciones';

  // Obtener todas las atenciones (opcional)
  getAtenciones(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Atenciones por mascota
  getAtencionesPorMascota(mascotaId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/mascota/${mascotaId}`);
  }

  // Obtener una atención por id
  getAtencionById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // ===== METODOS QUE ESPERA EL FORMULARIO =====

  // Crear atención (acepta FormData o JSON)
  create(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, data);
  }

  // Actualizar atención
  update(id: number, data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, data);
  }

  // Eliminar atención
  deleteAtencion(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  // (Si quieres mantener también los nombres largos, puedes dejar estos alias)
  createAtencion(data: any): Observable<any> {
    return this.create(data);
  }

  updateAtencion(id: number, data: any): Observable<any> {
    return this.update(id, data);
  }
}

