import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClienteService } from '../../services/cliente.service';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ClienteFormComponent } from '../../components/cliente-form/cliente-form.component';
import { Router } from '@angular/router';




@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule
  ],
  template: `
    <div class="acciones">
      <button mat-raised-button color="primary" (click)="abrirFormulario()">+ Nuevo Cliente</button>
    </div>

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
        <td mat-cell *matCellDef="let c">
          <button mat-icon-button color="accent" (click)="verDetalleCliente(c.cliente_id)">
            <mat-icon>visibility</mat-icon>
          </button>
          <button mat-icon-button color="primary" (click)="abrirFormulario(c)">
            <mat-icon>edit</mat-icon>
          </button>
          <button mat-icon-button color="warn" (click)="eliminarCliente(c.cliente_id)">
            <mat-icon>delete</mat-icon>
          </button>
        </td>
      </ng-container>


      <tr mat-header-row *matHeaderRowDef="columnas"></tr>
      <tr mat-row *matRowDef="let row; columns: columnas;"></tr>
    </table>

    <p *ngIf="clientes.length === 0">No hay clientes registrados.</p>
  `,
  styles: [`
    .acciones {
      margin-bottom: 15px;
    }
  `]
})
export class ClientesComponent implements OnInit {
  clientes: any[] = [];
  columnas: string[] = ['cliente_nombre', 'cliente_cedula', 'cliente_telefono', 'acciones'];
  sucursalId!: number;

  constructor(
    private route: ActivatedRoute,
    private clienteService: ClienteService,
    private dialog: MatDialog,
    private router: Router // ✅ agrega esto
  ) {}

  ngOnInit() {
    // Obtenemos sucursalId desde el padre porque estamos en una ruta hija
    this.route.parent?.paramMap.subscribe(params => {
      this.sucursalId = Number(params.get('sucursalId'));
      console.log('Sucursal ID desde el padre de la ruta:', this.sucursalId); // ✅ Debería imprimir 20
      this.obtenerClientes();
    });
  }
  

  obtenerClientes() {
    this.clienteService.getClientesPorSucursal(this.sucursalId).subscribe({
      next: (res: any) => this.clientes = res,
      error: err => console.error('Error al obtener clientes', err)
    });
  }

  abrirFormulario(cliente: any = null) {
    const dialogRef = this.dialog.open(ClienteFormComponent, {
      width: '400px',
      data: {
        cliente,
        sucursal_id: this.sucursalId // ✅ Aquí se pasa al formulario
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'created' || result === 'updated') {
        this.obtenerClientes();
      }
    });
  }

  eliminarCliente(id: number) {
    const confirmado = confirm('¿Estás seguro de eliminar este cliente?');
    if (confirmado) {
      this.clienteService.deleteCliente(id).subscribe(() => {
        this.obtenerClientes();
      });
    }
  }

  verDetalleCliente(clienteId: number) {
    this.route.parent?.paramMap.subscribe(params => {
      const veterinariaId = Number(params.get('veterinariaId'));
      const sucursalId = Number(params.get('sucursalId'));
  
      this.router.navigate([
        '/veterinaria',
        veterinariaId,
        'sucursal',
        sucursalId,
        'dashboard',
        'clientes',
        clienteId,
        'detalle'
      ]);
    });
  }
  
  
}

