import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VacunaService {

  private apiUrl = `${environment.apiUrl}/vacunas`;

  constructor(private http: HttpClient) {}

  // Obtener todas las vacunas
  getVacunas(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // (Opcionales, por si luego haces CRUD completo)
  getVacunaById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  createVacuna(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  updateVacuna(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }

  deleteVacuna(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
