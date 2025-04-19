// src/app/pages/sucursal-dashboard/sucursal-dashboard.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-sucursal-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatSidenavModule,
    MatListModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule
  ],
  template: `
    <mat-sidenav-container class="dashboard-container">
      <mat-sidenav mode="side" opened class="sidenav">
        <mat-toolbar><b>Sucursal</b></mat-toolbar>
        <mat-nav-list>
          <a mat-list-item [routerLink]="['clientes']">
            <mat-icon>people</mat-icon>
            <span>Clientes</span>
          </a>
          <a mat-list-item [routerLink]="['mascotas']">
            <mat-icon>pets</mat-icon>
            <span>Mascotas</span>
          </a>
          <a mat-list-item [routerLink]="['nomina']">
            <mat-icon>payments</mat-icon>
            <span>Nómina</span>
          </a>
          <a mat-list-item [routerLink]="['configuracion']">
            <mat-icon>settings</mat-icon>
            <span>Configuración</span>
          </a>
        </mat-nav-list>
      </mat-sidenav>

      <mat-sidenav-content>
        <div class="app-contenido">
          <mat-toolbar color="primary">
            <b>Panel de Sucursal</b>
          </mat-toolbar>

          <router-outlet></router-outlet>
        </div>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: [`
    .dashboard-container {
      height: 100vh;
    }

    .sidenav {
      width: 250px;
    }

    .app-contenido {
      margin: 20px;
      background-color: rgba(255, 255, 255, 0.85);
      border-radius: 12px;
      padding: 20px;
    }

    mat-icon {
      margin-right: 10px;
    }

    mat-list-item {
      display: flex;
      align-items: center;
    }
  `]
})
export class SucursalDashboardComponent implements OnInit {
  veterinariaId!: number;
  sucursalId!: number;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.veterinariaId = Number(this.route.snapshot.paramMap.get('veterinariaId'));
    this.sucursalId = Number(this.route.snapshot.paramMap.get('sucursalId'));
  }
}
