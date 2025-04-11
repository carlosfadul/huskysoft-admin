import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mascota-detalle',
  standalone: true,
  imports: [CommonModule, MatDialogModule],
  template: `
    <h2 mat-dialog-title>Detalles de la Mascota</h2>
    <div mat-dialog-content>
      <p><strong>Nombre:</strong> {{ data.mascota_nombre }}</p>
      <p><strong>Especie:</strong> {{ data.mascota_especie }}</p>
      <p><strong>Raza:</strong> {{ data.mascota_raza }}</p>
      <p><strong>Sexo:</strong> {{ data.mascota_sexo }}</p>
      <p><strong>Nacimiento:</strong> {{ data.mascota_fecha_nac | date }}</p>
      <p><strong>Color:</strong> {{ data.mascota_color }}</p>
      <p><strong>Peso:</strong> {{ data.mascota_peso }} kg</p>
      <p><strong>Estado:</strong> {{ data.mascota_estado }}</p>
      <p><strong>Dueño:</strong> {{ data.cliente_nombre }} {{ data.cliente_apellido }} ({{ data.cliente_cedula }})</p>

      <div *ngIf="data.mascota_foto">
        <p><strong>Foto:</strong></p>
        <img [src]="'http://localhost:3000/api/mascotas/' + data.mascota_id + '/foto'" width="120" height="120"
             style="object-fit: cover; border-radius: 8px;">
      </div>
    </div>
    <div mat-dialog-actions>
      <button mat-button mat-dialog-close>Cerrar</button>
    </div>
  `
})
export class MascotaDetalleComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
