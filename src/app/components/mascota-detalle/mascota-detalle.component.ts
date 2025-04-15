import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-mascota-detalle',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  template: `
    <div class="detalle-panel">
      <h3>Detalles de la Mascota</h3>
      <p><strong>Nombre:</strong> {{ data.mascota_nombre }}</p>
      <p><strong>Especie:</strong> {{ data.mascota_especie }}</p>
      <p><strong>Raza:</strong> {{ data.mascota_raza }}</p>
      <p><strong>Sexo:</strong> {{ data.mascota_sexo }}</p>
      <p><strong>Nacimiento:</strong> {{ data.mascota_fecha_nac | date }}</p>
      <p><strong>Color:</strong> {{ data.mascota_color }}</p>
      <p><strong>Peso:</strong> {{ data.mascota_peso }} kg</p>
      <p><strong>Estado:</strong> {{ data.mascota_estado }}</p>
      <p><strong>Dueño:</strong> {{ data.cliente_nombre }} {{ data.cliente_apellido }} ({{ data.cliente_cedula }})</p>

      <img *ngIf="data.mascota_foto"
           [src]="'http://localhost:3000/api/mascotas/' + data.mascota_id + '/foto'"
           width="150" height="150"
           style="object-fit: cover; border-radius: 8px; margin-top: 10px;">

      <div style="margin-top: 20px; text-align: center;">
        <button mat-stroked-button color="primary" (click)="dialogRef.close()">Cerrar</button>
      </div>
    </div>
  `,
  styles: [`
    .detalle-panel {
      background-color: white;
      padding: 24px;
      border-radius: 12px;
      max-width: 420px;
      margin: auto;
      box-shadow: 0 6px 12px rgba(0,0,0,0.2);
    }
  `]
})
export class MascotaDetalleComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<MascotaDetalleComponent>
  ) {}
}
