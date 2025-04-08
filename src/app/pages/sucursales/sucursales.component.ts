import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SucursalService } from '../../services/sucursal.service';
import { MatTableModule } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { SucursalFormComponent } from '../../components/sucursal-form/sucursal-form.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-sucursales',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule],
  template: `
    <button mat-button color="accent" (click)="volverAlPanel()">
      ⬅ Volver al Panel de Veterinaria
    </button>

    <div class="acciones">
      <button mat-raised-button color="primary" (click)="abrirFormulario()">+ Nueva Sucursal</button>
    </div>

    <h2>Sucursales de la Veterinaria</h2>

    <table mat-table [dataSource]="sucursales" class="mat-elevation-z8" *ngIf="sucursales.length">

      <!-- Columna: Logo -->
      <ng-container matColumnDef="logo">
        <th mat-header-cell *matHeaderCellDef> Logo </th>
        <td mat-cell *matCellDef="let s">
          <img [src]="'http://localhost:3000/api/sucursales/' + s.sucursal_id + '/logo'" 
              alt="Logo" 
              width="50" 
              height="50"
              style="object-fit: cover; border-radius: 8px;" />
        </td>
      </ng-container>



      <!-- Nombre -->
      <ng-container matColumnDef="sucursal_nombre">
        <th mat-header-cell *matHeaderCellDef>Nombre</th>
        <td mat-cell *matCellDef="let s">{{ s.sucursal_nombre }}</td>
      </ng-container>

      <!-- NIT -->
      <ng-container matColumnDef="sucursal_nit">
        <th mat-header-cell *matHeaderCellDef>NIT</th>
        <td mat-cell *matCellDef="let s">{{ s.sucursal_nit }}</td>
      </ng-container>

      <!-- Dirección -->
      <ng-container matColumnDef="sucursal_direccion">
        <th mat-header-cell *matHeaderCellDef>Dirección</th>
        <td mat-cell *matCellDef="let s">{{ s.sucursal_direccion }}</td>
      </ng-container>

      <!-- Teléfono -->
      <ng-container matColumnDef="sucursal_telefono">
        <th mat-header-cell *matHeaderCellDef>Teléfono</th>
        <td mat-cell *matCellDef="let s">{{ s.sucursal_telefono }}</td>
      </ng-container>

      <!-- Estado -->
      <ng-container matColumnDef="sucursal_estado">
        <th mat-header-cell *matHeaderCellDef>Estado</th>
        <td mat-cell *matCellDef="let s">{{ s.sucursal_estado }}</td>
      </ng-container>

      <!-- Acciones -->
      <ng-container matColumnDef="acciones">
        <th mat-header-cell *matHeaderCellDef> Acciones </th>
        <td mat-cell *matCellDef="let s">
          <button mat-icon-button color="primary" (click)="abrirFormulario(s)">
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

    <p *ngIf="sucursales.length === 0">No hay sucursales registradas.</p>
  `,
  styles: [`
    .acciones {
      margin: 15px 0;
    }
  `]
})
export class SucursalesComponent implements OnInit {
  sucursales: any[] = [];
  columnas: string[] = [
    'logo', 'sucursal_nombre', 'sucursal_nit', 'sucursal_direccion', 'sucursal_telefono', 'sucursal_estado', 'acciones'
  ];
  
  veterinariaId!: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private sucursalService: SucursalService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.veterinariaId = Number(this.route.snapshot.paramMap.get('id'));
    this.obtenerSucursales();
  }

  volverAlPanel() {
    this.router.navigate([`/veterinaria/${this.veterinariaId}`]);
  }

  obtenerSucursales() {
    this.sucursalService.getSucursalesPorVeterinaria(this.veterinariaId).subscribe({
      next: (res: any) => this.sucursales = res,
      error: err => console.error('Error al obtener sucursales', err)
    });
  }

  abrirFormulario(sucursal: any = null) {
    const dialogRef = this.dialog.open(SucursalFormComponent, {
      width: '400px',
      data: { sucursal, veterinaria_id: this.veterinariaId }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'updated' || result === 'created') {
        this.obtenerSucursales();
      }
    });
  }

  eliminarSucursal(id: number) {
    const confirmado = confirm('¿Estás seguro de eliminar esta sucursal?');
    if (confirmado) {
      this.sucursalService.deleteSucursal(id).subscribe(() => {
        this.obtenerSucursales(); // 🔁 Refrescar después de eliminar
      });
    }
  }
   

  getLogoUrl(id: number): string {
    return `http://localhost:3000/api/sucursales/${id}/logo`;
  }
}
