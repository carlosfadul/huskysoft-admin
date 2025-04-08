
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-veterinaria-admin',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  template: `
    <h1>Panel de administración de la veterinaria</h1>

    <button mat-raised-button color="primary" (click)="irASucursales()">
      🏢 Gestionar Sucursales
    </button>
  `
})
export class VeterinariaAdminComponent implements OnInit {
  veterinariaId!: number;

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.veterinariaId = Number(this.route.snapshot.paramMap.get('id'));
  }

  irASucursales() {
    this.router.navigate([`/veterinaria/${this.veterinariaId}/sucursales`]);
  }
}
