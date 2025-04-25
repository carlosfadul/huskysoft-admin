import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { NominaService, Nomina } from '../../services/nomina.service';
import { NominaFormComponent } from '../../components/nomina-form/nomina-form.component';

@Component({
  selector: 'app-nomina',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatCardModule
  ],
  templateUrl: './nomina.component.html',
  styleUrls: ['./nomina.component.scss']
})
export class NominaComponent implements OnInit {
  nominas: Nomina[] = [];
  columnas = [
    'nomina_fecha',
    'nomina_periodo_inicio',
    'nomina_periodo_fin',
    'nomina_estado',
    'total_nomina',
    'acciones'
  ];
  sucursalId!: number;
  veterinariaId!: number;

  constructor(
    private route: ActivatedRoute,
    private nominaService: NominaService,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Nos suscribimos a los parámetros del padre para leer ids
    this.route.parent?.paramMap.subscribe(params => {
      this.sucursalId    = Number(params.get('sucursalId'));
      this.veterinariaId = Number(params.get('veterinariaId'));
      this.cargarNominas();
    });
  }

  /** Carga todas las nóminas de esta sucursal */
  cargarNominas(): void {
    if (!this.sucursalId) return;
    this.nominaService.getNominasPorSucursal(this.sucursalId)
      .subscribe({
        next: (lista) => this.nominas = lista,
        error: (e)    => console.error('Error al cargar nóminas', e)
      });
  }

  /** Abre el diálogo de creación/edición */
  nueva(nomina?: Nomina): void {
    const ref = this.dialog.open(NominaFormComponent, {
      width: '600px',
      data: {
        nomina: nomina ?? null,
        sucursal_id: this.sucursalId,
        usuario_id: 1
      }
    });
    ref.afterClosed().subscribe(res => {
      if (res === 'created' || res === 'updated') {
        this.cargarNominas();
      }
    });
  }

  /** Elimina una nómina y refresca la lista */
  borrar(id: number): void {
    if (!confirm('¿Seguro de borrar esta nómina?')) return;
    this.nominaService.deleteNomina(id)
      .subscribe({
        next: ()  => this.cargarNominas(),
        error: (e) => console.error('Error al eliminar', e)
      });
  }

  /** Navega a la vista detalle de la nómina */
  detalle(nomina: Nomina): void {
    this.router.navigate([
      '/veterinaria',
      this.veterinariaId,
      'sucursal',
      this.sucursalId,
      'dashboard',
      'nomina',
      nomina.nomina_id,
      'detalle'
    ]);
  }

  /** Vuelve al listado de sucursales */
  volverASucursales(): void {
    this.router.navigate([
      '/veterinaria',
      this.veterinariaId,
      'sucursales'
    ]);
  }
}

