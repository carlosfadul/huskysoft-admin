

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { Router, ActivatedRoute } from '@angular/router';
import { inject } from '@angular/core';

@Component({
  selector: 'app-configuracion',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, RouterModule],
  template: `
    <mat-card>
      <div class="botonera">
        <button mat-button class="white-button" (click)="volver()">← Volver al Dashboard</button>
      </div>
      <h2>Configuración de la Sucursal</h2>
      <div class="grid">
        <button mat-raised-button color="primary" routerLink="usuarios">Usuarios</button>
        <button mat-raised-button color="primary" routerLink="empleados">Empleados</button>
        <button mat-raised-button color="primary" routerLink="aliados">Aliados</button>
        <button mat-raised-button color="primary" routerLink="tratamientos">Tratamientos</button>
        <button mat-raised-button color="primary" routerLink="enfermedades">Enfermedades</button>
        <button mat-raised-button color="primary" routerLink="servicios">Servicios</button>
        <button mat-raised-button color="primary" routerLink="proveedores">Proveedores</button>
      </div>
    </mat-card>
    <router-outlet></router-outlet>
  `,
  styles: [`
    mat-card {
      padding: 20px;
    }
    .grid {
      display: grid;
      gap: 15px;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    }
  `]
})
export class ConfiguracionComponent {
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  volver() {
    const veterinariaId = this.route.snapshot.paramMap.get('veterinariaId');
    const sucursalId = this.route.snapshot.paramMap.get('sucursalId');

    this.router.navigate([
      '/veterinaria', veterinariaId, 'sucursal', sucursalId, 'dashboard'
    ]);
  }
}
