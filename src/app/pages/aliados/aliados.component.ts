// src/app/pages/aliados/aliados.component.ts

import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AliadoService } from '../../services/aliado.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AliadoFormComponent } from '../../components/aliado-form/aliado-form.component';

@Component({
  selector: 'app-aliados',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule
  ],
  template: `
    <button mat-button class="white-button" (click)="volver()">← Volver</button>
    <h2>Aliados</h2>
    <button mat-raised-button color="primary" (click)="abrirFormulario()">+ Nuevo Aliado</button>

    <table mat-table [dataSource]="aliados" class="mat-elevation-z8">

      <ng-container matColumnDef="nombre_aliado">
        <th mat-header-cell *matHeaderCellDef> Nombre </th>
        <td mat-cell *matCellDef="let aliado"> {{aliado.nombre_aliado}} </td>
      </ng-container>

      <ng-container matColumnDef="direccion_aliado">
        <th mat-header-cell *matHeaderCellDef> Dirección </th>
        <td mat-cell *matCellDef="let aliado"> {{aliado.direccion_aliado}} </td>
      </ng-container>

      <ng-container matColumnDef="telefono_aliado">
        <th mat-header-cell *matHeaderCellDef> Teléfono </th>
        <td mat-cell *matCellDef="let aliado"> {{aliado.telefono_aliado}} </td>
      </ng-container>

      <ng-container matColumnDef="email_aliado">
        <th mat-header-cell *matHeaderCellDef> Email </th>
        <td mat-cell *matCellDef="let aliado"> {{aliado.email_aliado}} </td>
      </ng-container>

      <ng-container matColumnDef="nit_aliado">
        <th mat-header-cell *matHeaderCellDef> NIT </th>
        <td mat-cell *matCellDef="let aliado"> {{aliado.nit_aliado}} </td>
      </ng-container>

      <ng-container matColumnDef="aliado_estado">
        <th mat-header-cell *matHeaderCellDef> Estado </th>
        <td mat-cell *matCellDef="let aliado"> {{aliado.aliado_estado}} </td>
      </ng-container>

      <ng-container matColumnDef="acciones">
        <th mat-header-cell *matHeaderCellDef> Acciones </th>
        <td mat-cell *matCellDef="let aliado">
          <button mat-icon-button (click)="abrirFormulario(aliado)">
            <mat-icon>edit</mat-icon>
          </button>
          <button mat-icon-button color="warn" (click)="eliminarAliado(aliado.aliado_id)">
            <mat-icon>delete</mat-icon>
          </button>
        </td>
      </ng-container>

      <tr mat-header-row *matHeaderRowDef="columnas"></tr>
      <tr mat-row *matRowDef="let row; columns: columnas;"></tr>
    </table>
  `
})
export class AliadosComponent implements OnInit {
  private aliadoService = inject(AliadoService);
  private dialog = inject(MatDialog);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  aliados: any[] = [];
  columnas: string[] = [
    'nombre_aliado',
    'direccion_aliado',
    'telefono_aliado',
    'email_aliado',
    'nit_aliado',
    'aliado_estado',
    'acciones'
  ];

  veterinariaId!: string;
  sucursalId!: string;

  ngOnInit(): void {
    const route = this.route.parent ?? this.route;
  
    this.veterinariaId = route.snapshot.paramMap.get('veterinariaId')!;
    this.sucursalId = route.snapshot.paramMap.get('sucursalId')!;
  
    console.log('🟢 sucursalId desde parent.paramMap:', this.sucursalId);
    console.log('🟢 VeterinariaId:', this.veterinariaId);
  
    if (!this.sucursalId) {
      console.error('⛔ ERROR: El ID de sucursal es requerido');
      return;
    }
  
    this.cargarAliados();
  }

  cargarAliados() {
    this.aliadoService.getAliadosPorSucursal(this.sucursalId).subscribe(data => {
      this.aliados = data;
    });
  }

  abrirFormulario(aliado?: any) {
    if (!this.sucursalId) {
      console.warn('❌ No se encontró sucursalId al abrir el formulario');
      return;
    }

    const dialogRef = this.dialog.open(AliadoFormComponent, {
      data: {
        ...aliado,
        sucursal_id: this.sucursalId
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) this.cargarAliados();
    });
  }

  eliminarAliado(id: number) {
    if (confirm('¿Estás seguro de eliminar este aliado?')) {
      this.aliadoService.eliminarAliado(id).subscribe(() => this.cargarAliados());
    }
  }

  volver() {
    this.router.navigate([
      '/veterinaria',
      this.veterinariaId,
      'sucursal',
      this.sucursalId,
      'dashboard/configuracion'
    ]);
  }
}


