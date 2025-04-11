import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MascotaService } from '../../services/mascota.service';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-mascotas',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule
  ],
  template: `
    <h2>Mascotas de la Sucursal</h2>

    <table mat-table [dataSource]="mascotas" class="mat-elevation-z8" *ngIf="mascotas.length">

      <ng-container matColumnDef="foto">
        <th mat-header-cell *matHeaderCellDef>Foto</th>
        <td mat-cell *matCellDef="let m">
          <img [src]="'http://localhost:3000/api/mascotas/' + m.mascota_id + '/foto'" width="50" height="50"
            style="object-fit: cover; border-radius: 8px;" *ngIf="m.mascota_foto">
        </td>
      </ng-container>

      <ng-container matColumnDef="nombre">
        <th mat-header-cell *matHeaderCellDef>Nombre</th>
        <td mat-cell *matCellDef="let m">{{ m.mascota_nombre }}</td>
      </ng-container>

      <ng-container matColumnDef="especie">
        <th mat-header-cell *matHeaderCellDef>Especie</th>
        <td mat-cell *matCellDef="let m">{{ m.mascota_especie }}</td>
      </ng-container>

      <ng-container matColumnDef="sexo">
        <th mat-header-cell *matHeaderCellDef>Sexo</th>
        <td mat-cell *matCellDef="let m">{{ m.mascota_sexo }}</td>
      </ng-container>

      <ng-container matColumnDef="estado">
        <th mat-header-cell *matHeaderCellDef>Estado</th>
        <td mat-cell *matCellDef="let m">{{ m.mascota_estado }}</td>
      </ng-container>

      <ng-container matColumnDef="dueno">
        <th mat-header-cell *matHeaderCellDef>Dueño</th>
        <td mat-cell *matCellDef="let m">
          {{ m.cliente_nombre }} {{ m.cliente_apellido }} ({{ m.cliente_cedula }})
        </td>
      </ng-container>

      <ng-container matColumnDef="acciones">
        <th mat-header-cell *matHeaderCellDef>Acciones</th>
        <td mat-cell *matCellDef="let m">
          <button mat-icon-button color="warn" (click)="eliminarMascota(m.mascota_id)">
            <mat-icon>delete</mat-icon>
          </button>
        </td>
      </ng-container>

      <tr mat-header-row *matHeaderRowDef="columnas"></tr>
      <tr mat-row *matRowDef="let row; columns: columnas;"></tr>
    </table>

    <p *ngIf="mascotas.length === 0">No hay mascotas registradas.</p>
  `
})
export class MascotasComponent implements OnInit {
  mascotas: any[] = [];
  columnas: string[] = ['foto', 'nombre', 'especie', 'sexo', 'estado', 'dueno', 'acciones'];
  sucursalId!: number;

  constructor(
    private route: ActivatedRoute,
    private mascotaService: MascotaService
  ) {}

  ngOnInit() {
    const parentParams = this.route.parent?.snapshot.paramMap;
    this.sucursalId = Number(parentParams?.get('sucursalId'));
    this.obtenerMascotas();
  }

  obtenerMascotas() {
    this.mascotaService.getMascotasPorSucursal(this.sucursalId).subscribe({
      next: (res: any) => this.mascotas = res,
      error: err => console.error('Error al obtener mascotas', err)
    });
  }

  eliminarMascota(id: number) {
    const confirmado = confirm('¿Estás seguro de eliminar esta mascota?');
    if (confirmado) {
      this.mascotaService.deleteMascota(id).subscribe(() => {
        this.obtenerMascotas();
      });
    }
  }
}

