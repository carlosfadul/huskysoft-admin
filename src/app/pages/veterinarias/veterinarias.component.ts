import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VeterinariaService } from '../../services/veterinaria.service';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { VeterinariaFormComponent } from '../../components/veterinaria-form/veterinaria-form.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-veterinarias',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule, MatDialogModule],
  template: `
    <h2>Veterinarias Registradas</h2>

    <div class="acciones">
      <button mat-raised-button color="primary" (click)="abrirFormulario()">+ Nueva Veterinaria</button>
    </div>

    <table mat-table [dataSource]="veterinarias" class="mat-elevation-z8" *ngIf="veterinarias.data.length">

    columnas: string[] = ['veterinaria_logo', 'veterinaria_nombre', 'veterinaria_nit', 'veterinaria_telefono', 'veterinaria_estado', 'acciones'];

      
      <!-- Logo -->
      <ng-container matColumnDef="veterinaria_logo">
        <th mat-header-cell *matHeaderCellDef> Logo </th>
        <td mat-cell *matCellDef="let v">
          <img [src]="'http://localhost:3000/api/veterinarias/' + v.veterinaria_id + '/logo'" width="50" height="50" style="object-fit: cover;" *ngIf="v.veterinaria_logo">
        </td>
      </ng-container>
      <!-- Nombre -->
      <ng-container matColumnDef="veterinaria_nombre">
        <th mat-header-cell *matHeaderCellDef> Nombre </th>
        <td mat-cell *matCellDef="let v"> {{ v.veterinaria_nombre }} </td>
      </ng-container>

      <!-- NIT -->
      <ng-container matColumnDef="veterinaria_nit">
        <th mat-header-cell *matHeaderCellDef> NIT </th>
        <td mat-cell *matCellDef="let v"> {{ v.veterinaria_nit }} </td>
      </ng-container>

      <!-- Dirección -->
      <ng-container matColumnDef="veterinaria_direccion">
        <th mat-header-cell *matHeaderCellDef> Dirección </th>
        <td mat-cell *matCellDef="let v"> {{ v.veterinaria_direccion }} </td>
      </ng-container>

      <!-- Teléfono -->
      <ng-container matColumnDef="veterinaria_telefono">
        <th mat-header-cell *matHeaderCellDef> Teléfono </th>
        <td mat-cell *matCellDef="let v"> {{ v.veterinaria_telefono }} </td>
      </ng-container>

      <!-- Estado -->
      <ng-container matColumnDef="veterinaria_estado">
        <th mat-header-cell *matHeaderCellDef> Estado </th>
        <td mat-cell *matCellDef="let v"> {{ v.veterinaria_estado }} </td>
      </ng-container>

      <!-- Acciones -->
      <ng-container matColumnDef="acciones">
        <th mat-header-cell *matHeaderCellDef> Acciones </th>
        <td mat-cell *matCellDef="let v">
          <button mat-icon-button color="primary" (click)="editarVeterinaria(v)">
            <mat-icon>edit</mat-icon>
          </button>
          <button mat-icon-button color="warn" (click)="eliminarVeterinaria(v.veterinaria_id)">
            <mat-icon>delete</mat-icon>
          </button>
        </td>
      </ng-container>

      <tr mat-header-row *matHeaderRowDef="columnas"></tr>
      <tr mat-row *matRowDef="let row; columns: columnas;"></tr>
    </table>

    <p *ngIf="veterinarias.data.length === 0">No hay veterinarias registradas.</p>
  `
})
export class VeterinariasComponent implements OnInit {
  veterinarias = new MatTableDataSource<any>();
  columnas: string[] = ['veterinaria_logo', 
                        'veterinaria_nombre',
                        'veterinaria_nit', 
                        'veterinaria_telefono', 
                        'veterinaria_estado', 
                        'acciones'];


  constructor(
    private veterinariaService: VeterinariaService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.obtenerVeterinarias();
  }

  obtenerVeterinarias() {
    this.veterinariaService.getVeterinarias().subscribe({
      next: (res: any) => {
        this.veterinarias = new MatTableDataSource(res);

        console.log('Veterinarias actualizadas:', this.veterinarias.data);
      },
      error: (err) => {
        console.error('Error al obtener veterinarias ❌', err);
      }
    });
  }

  editarVeterinaria(veterinaria: any) {
    this.abrirFormulario(veterinaria);
  }

  eliminarVeterinaria(id: number) {
    const confirmado = confirm('¿Estás seguro de eliminar esta veterinaria?');
    if (confirmado) {
      this.veterinariaService.deleteVeterinaria(id).subscribe(() => {
        console.log('Veterinaria eliminada con éxito ✅');
        this.obtenerVeterinarias(); // 🔁 Refresca correctamente ahora
      });
    }
  }

  abrirFormulario(veterinaria: any = null) {
    const dialogRef = this.dialog.open(VeterinariaFormComponent, {
      width: '400px',
      data: { veterinaria }
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log('Dialog cerrado con resultado:', result);
      if (result) {
        this.obtenerVeterinarias();
      }
    });
  }
}
