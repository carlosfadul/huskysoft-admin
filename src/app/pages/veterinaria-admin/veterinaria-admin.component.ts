//http://localhost:4200/veterinaria/admin
// src/app/pages/veterinaria-admin/veterinaria-admin.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { SucursalService } from '../../services/sucursal.service';
import { SucursalFormComponent } from '../../components/sucursal-form/sucursal-form.component';

@Component({
  selector: 'app-veterinaria-admin',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule
  ],
  template: `
    <h2>Panel de Administración de Veterinaria</h2>
    <p><strong>Veterinaria ID:</strong> {{ veterinariaId }}</p>

    <div class="acciones">
      <button mat-raised-button color="primary" (click)="crearSucursal()">+ Nueva Sucursal</button>
    </div>

    <table mat-table [dataSource]="sucursales" class="mat-elevation-z8" *ngIf="sucursales.length">

      <!-- Logo -->
      <ng-container matColumnDef="logo">
        <th mat-header-cell *matHeaderCellDef>Logo</th>
        <td mat-cell *matCellDef="let s">
          <img *ngIf="s.sucursal_logo" [src]="'http://localhost:3000/api/sucursales/' + s.sucursal_id + '/logo'" width="50" height="50" style="object-fit: cover; border-radius: 6px;">
        </td>
      </ng-container>

      <!-- Nombre -->
      <ng-container matColumnDef="nombre">
        <th mat-header-cell *matHeaderCellDef>Nombre</th>
        <td mat-cell *matCellDef="let s">{{ s.sucursal_nombre }}</td>
      </ng-container>

      <!-- Dirección -->
      <ng-container matColumnDef="direccion">
        <th mat-header-cell *matHeaderCellDef>Dirección</th>
        <td mat-cell *matCellDef="let s">{{ s.sucursal_direccion }}</td>
      </ng-container>

      <!-- Teléfono -->
      <ng-container matColumnDef="telefono">
        <th mat-header-cell *matHeaderCellDef>Teléfono</th>
        <td mat-cell *matCellDef="let s">{{ s.sucursal_telefono }}</td>
      </ng-container>

      <!-- NIT -->
      <ng-container matColumnDef="nit">
        <th mat-header-cell *matHeaderCellDef>NIT</th>
        <td mat-cell *matCellDef="let s">{{ s.sucursal_nit }}</td>
      </ng-container>

      <!-- Estado -->
      <ng-container matColumnDef="estado">
        <th mat-header-cell *matHeaderCellDef>Estado</th>
        <td mat-cell *matCellDef="let s">{{ s.sucursal_estado }}</td>
      </ng-container>

      <!-- Acciones -->
      <ng-container matColumnDef="acciones">
        <th mat-header-cell *matHeaderCellDef>Acciones</th>
        <td mat-cell *matCellDef="let s">
          <button mat-icon-button color="accent" (click)="irADashboard(s)">
            <mat-icon>launch</mat-icon>
          </button>
          <button mat-icon-button color="primary" (click)="editarSucursal(s)">
            <mat-icon>edit</mat-icon>
          </button>
          <button mat-icon-button color="warn" (click)="eliminarSucursal(s.sucursal_id)">
            <mat-icon>delete</mat-icon>
          </button>
        </td>
      </ng-container>

      <tr mat-header-row *matHeaderRowDef="columnas"></tr>
      <tr mat-row *matRowDef="let row; columns: columnas;"></tr>
    </table>

    <p *ngIf="!sucursales.length">No hay sucursales registradas.</p>
  `,
  styles: [`
    .acciones {
      margin-bottom: 15px;
    }
  `]
})
export class VeterinariaAdminComponent implements OnInit {
  veterinariaId!: number;
  sucursales: any[] = [];
  columnas: string[] = ['logo', 'nombre', 'direccion', 'telefono', 'nit', 'estado', 'acciones'];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private sucursalService: SucursalService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.veterinariaId = Number(this.route.snapshot.paramMap.get('veterinariaId'));
    this.obtenerSucursales();
  }

  obtenerSucursales() {
    this.sucursalService.getSucursalesPorVeterinaria(this.veterinariaId).subscribe({
      next: (res: any) => this.sucursales = res,
      error: (err) => console.error('Error al obtener sucursales', err)
    });
  }

  crearSucursal() {
    const dialogRef = this.dialog.open(SucursalFormComponent, {
      width: '400px',
      data: { veterinaria_id: this.veterinariaId }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) this.obtenerSucursales();
    });
  }

  editarSucursal(sucursal: any) {
    const dialogRef = this.dialog.open(SucursalFormComponent, {
      width: '400px',
      data: {
        veterinaria_id: this.veterinariaId,
        sucursal
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) this.obtenerSucursales();
    });
  }

  eliminarSucursal(id: number) {
    const confirmado = confirm('¿Seguro que deseas eliminar esta sucursal?');
    if (confirmado) {
      this.sucursalService.deleteSucursal(id).subscribe(() => this.obtenerSucursales());
    }
  }

  irADashboard(sucursal: any) {
    this.router.navigate([
      '/veterinaria',
      this.veterinariaId,
      'sucursal',
      sucursal.sucursal_id,
      'dashboard',
      'clientes'
    ]);
  }
}
