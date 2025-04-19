import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TratamientoService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api/tratamientos';

  getTratamientos(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  crearTratamiento(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  actualizarTratamiento(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }

  eliminarTratamiento(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  getTratamientoById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
}
