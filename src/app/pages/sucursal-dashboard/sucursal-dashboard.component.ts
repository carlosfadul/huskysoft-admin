// src/app/pages/sucursal-dashboard/sucursal-dashboard.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
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
  templateUrl: './sucursal-dashboard.component.html',
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

    .active-link {
      background: rgba(0, 0, 0, 0.06);
      font-weight: 600;
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
