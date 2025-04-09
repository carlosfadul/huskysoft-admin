import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClienteService } from '../../services/cliente.service';
import { ActivatedRoute } from '@angular/router';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [CommonModule, MatTableModule],
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

      <tr mat-header-row *matHeaderRowDef="columnas"></tr>
      <tr mat-row *matRowDef="let row; columns: columnas;"></tr>
    </table>

    <p *ngIf="clientes.length === 0">No hay clientes registrados.</p>
  `
})
export class ClientesComponent implements OnInit {
  clientes: any[] = [];
  columnas: string[] = ['cliente_nombre', 'cliente_cedula', 'cliente_telefono'];
  sucursalId!: number;

  constructor(
    private clienteService: ClienteService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.sucursalId = Number(this.route.snapshot.paramMap.get('sucursalId'));
    this.obtenerClientes();
  }

  obtenerClientes() {
    this.clienteService.getClientesPorSucursal(this.sucursalId).subscribe({
      next: (res: any) => this.clientes = res,
      error: err => console.error('Error al obtener clientes', err)
    });
  }
}

