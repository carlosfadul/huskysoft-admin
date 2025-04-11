import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClienteService } from '../../services/cliente.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule
  ],
  template: `
    <h2>Clientes de la Sucursal</h2>

    <table mat-table [dataSource]="clientes" class="mat-elevation-z8" *ngIf="clientes.length">

      <ng-container matColumnDef="cliente_nombre">
        <th mat-header-cell *matHeaderCellDef>Nombre</th>
        <td mat-cell *matCellDef="let c">{{ c.cliente_nombre }} {{ c.cliente_apellido }}</td>
      </ng-container>

      <ng-container matColumnDef="cliente_cedula">
        <th mat-header-cell *matHeaderCellDef>Cédula</th>
        <td mat-cell *matCellDef="let c">{{ c.cliente_cedula }}</td>
      </ng-container>

      <ng-container matColumnDef="cliente_telefono">
        <th mat-header-cell *matHeaderCellDef>Teléfono</th>
        <td mat-cell *matCellDef="let c">{{ c.cliente_telefono }}</td>
      </ng-container>

      <ng-container matColumnDef="acciones">
        <th mat-header-cell *matHeaderCellDef>Acciones</th>
        <td mat-cell *matCellDef="let c" style="border: 1px solid red">
          <button mat-icon-button color="accent" (click)="verDetalleCliente(c.cliente_id)">
            <mat-icon>visibility</mat-icon>
          </button>
        </td>
      </ng-container>

      <tr mat-header-row *matHeaderRowDef="columnas"></tr>
      <tr mat-row *matRowDef="let row; columns: columnas;"></tr>
    </table>

    <p *ngIf="clientes.length === 0">No hay clientes registrados.</p>
  `
})
export class ClientesComponent implements OnInit {
  clientes: any[] = [];
  columnas: string[] = ['cliente_nombre', 'cliente_cedula', 'cliente_telefono', 'acciones'];
  veterinariaId!: number;
  sucursalId!: number;

  constructor(
    private clienteService: ClienteService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.veterinariaId = Number(this.route.snapshot.paramMap.get('veterinariaId'));
    this.sucursalId = Number(this.route.snapshot.paramMap.get('sucursalId'));
    this.obtenerClientes();
  }

  obtenerClientes() {
    this.clienteService.getClientesPorSucursal(this.sucursalId).subscribe({
      next: (res: any) => this.clientes = res,
      error: err => console.error('Error al obtener clientes', err)
    });
  }

  verDetalleCliente(clienteId: number) {
    this.router.navigate([
      '/veterinaria',
      this.veterinariaId,
      'sucursal',
      this.sucursalId,
      'dashboard',
      'clientes',
      clienteId,
      'detalle'
    ]);
  }
}


