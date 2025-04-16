// src/app/pages/usuarios/usuarios.component.ts
// http://localhost:4200/veterinaria/26/sucursal/20/dashboard/configuracion/usuarios
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuarioService } from '../../services/usuario.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { UsuarioFormComponent } from './usuario-form.component';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule
  ],
  styleUrls: ['./usuarios.component.scss'],
  template: `
    

    <h2>Usuarios</h2>

    <button mat-raised-button color="primary" (click)="abrirFormulario()">+ Nuevo Usuario</button>

    <table mat-table [dataSource]="usuarios" class="mat-elevation-z8">

      <ng-container matColumnDef="usuario_foto">
        <th mat-header-cell *matHeaderCellDef> Foto </th>
        <td mat-cell *matCellDef="let usuario">
          <img *ngIf="usuario.usuario_foto" [src]="usuario.usuario_foto" alt="Foto" width="40" height="40" style="border-radius: 50%;">
        </td>
      </ng-container>

      <ng-container matColumnDef="usuario_username">
        <th mat-header-cell *matHeaderCellDef> Usuario </th>
        <td mat-cell *matCellDef="let usuario"> {{usuario.usuario_username}} </td>
      </ng-container>

      <ng-container matColumnDef="usuario_tipo">
        <th mat-header-cell *matHeaderCellDef> Rol </th>
        <td mat-cell *matCellDef="let usuario"> {{usuario.usuario_tipo}} </td>
      </ng-container>

      <ng-container matColumnDef="acciones">
        <th mat-header-cell *matHeaderCellDef> Acciones </th>
        <td mat-cell *matCellDef="let usuario">
          <button mat-icon-button (click)="abrirFormulario(usuario)">
            <mat-icon>edit</mat-icon>
          </button>
          <button mat-icon-button color="warn" (click)="eliminarUsuario(usuario.usuario_id)">
            <mat-icon>delete</mat-icon>
          </button>
        </td>
      </ng-container>

      <tr mat-header-row *matHeaderRowDef="columnas"></tr>
      <tr mat-row *matRowDef="let row; columns: columnas;"></tr>
    </table>
  `,
})
export class UsuariosComponent implements OnInit {
  private usuarioService = inject(UsuarioService);
  private dialog = inject(MatDialog);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  usuarios: any[] = [];
  columnas: string[] = ['usuario_foto', 'usuario_username', 'usuario_tipo', 'acciones'];


  veterinariaId!: string;
  sucursalId!: string;

  ngOnInit(): void {
    this.veterinariaId = this.route.snapshot.paramMap.get('veterinariaId')!;
    this.sucursalId = this.route.snapshot.paramMap.get('sucursalId')!;
    this.cargarUsuarios();
  }

  volver() {
    this.router.navigate([
      '/veterinaria',
      this.veterinariaId,
      'sucursal',
      this.sucursalId,
      'dashboard'
    ]);
  }

  cargarUsuarios() {
    this.usuarioService.getUsuarios().subscribe(data => this.usuarios = data);
  }

  abrirFormulario(usuario?: any) {
    const dialogRef = this.dialog.open(UsuarioFormComponent, {
      data: usuario,
    });

    dialogRef.afterClosed().subscribe(resultado => {
      if (resultado) this.cargarUsuarios();
    });
  }

  eliminarUsuario(id: number) {
    if (confirm('¿Estás seguro de eliminar este usuario?')) {
      this.usuarioService.eliminarUsuario(id).subscribe(() => this.cargarUsuarios());
    }
  }
}

