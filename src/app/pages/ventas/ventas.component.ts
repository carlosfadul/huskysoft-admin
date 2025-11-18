// src/app/pages/ventas/ventas.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { VentaService, Venta } from '../../services/venta.service';
import { VentaFormComponent } from '../../components/venta-form/venta-form.component';

@Component({
  selector: 'app-ventas',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatSnackBarModule
  ],
  templateUrl: './ventas.component.html'
})
export class VentasComponent implements OnInit {
  sucursalId!: number;
  veterinariaId!: number;

  dataSource = new MatTableDataSource<Venta>([]);
  displayedColumns: string[] = [
    'venta_id',
    'cliente_id',
    'venta_fecha',
    'venta_estado',
    'total',
    'metodo_pago',
    'acciones'
  ];

  cargando = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ventaService: VentaService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  
  //---------------
  ngOnInit(): void {
  this.route.parent?.paramMap.subscribe(params => {
    this.sucursalId = Number(params.get('sucursalId'));
    this.veterinariaId = Number(params.get('veterinariaId'));
    this.cargarVentas();
  });
}

  cargarVentas(): void {
    if (!this.sucursalId) return;

    this.cargando = true;
    this.ventaService.getVentasPorSucursal(this.sucursalId).subscribe({
      next: ventas => {
        this.dataSource.data = ventas;
      },
      error: err => {
        console.error('Error al obtener las ventas', err);
        this.snackBar.open('Error al obtener las ventas', 'Cerrar', {
          duration: 3000
        });
      },
      complete: () => (this.cargando = false)
    });
  }

  nuevaVenta(): void {
    const dialogRef = this.dialog.open(VentaFormComponent, {
      width: '800px',
      data: {
        sucursalId: this.sucursalId,
        veterinariaId: this.veterinariaId,
        venta: null
      }
    });

    dialogRef.afterClosed().subscribe(guardado => {
      if (guardado) {
        this.cargarVentas();
      }
    });
  }

  editarVenta(venta: Venta): void {
    const dialogRef = this.dialog.open(VentaFormComponent, {
      width: '800px',
      data: {
        sucursalId: this.sucursalId,
        veterinariaId: this.veterinariaId,
        venta
      }
    });

    dialogRef.afterClosed().subscribe(guardado => {
      if (guardado) {
        this.cargarVentas();
      }
    });
  }

  eliminarVenta(venta: Venta): void {
    const confirmado = confirm(
      `¿Seguro que deseas eliminar la venta #${venta.venta_id}?`
    );
    if (!confirmado) return;

    this.ventaService.deleteVenta(venta.venta_id!).subscribe({
      next: () => {
        this.snackBar.open('Venta eliminado', 'Cerrar', { duration: 2000 });
        this.cargarVentas();
      },
      error: err => {
        console.error('Error al eliminar la venta', err);
        this.snackBar.open('Error al eliminar la venta', 'Cerrar', {
          duration: 3000
        });
      }
    });
  }

  // 👉 método usado internamente
  private verDetalleVenta(venta: Venta): void {
    this.router.navigate([
      '/veterinaria',
      this.veterinariaId,
      'sucursal',
      this.sucursalId,
      'dashboard',
      'venta',
      venta.venta_id!,
      'detalle'
    ]);
  }

  // 👉 alias para coincidir con el template (verDetalle(v))
  verDetalle(venta: Venta): void {
    this.verDetalleVenta(venta);
  }

  volverASucursales(): void {
  this.router.navigate(['/veterinaria', this.veterinariaId, 'admin'], { replaceUrl: true });
}

}
