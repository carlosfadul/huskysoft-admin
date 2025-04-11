import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MascotaService } from '../../services/mascota.service';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-mascotas',
  standalone: true,
  
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './mascotas.component.html',
  styleUrls: ['./mascotas.component.scss']
})
export class MascotasComponent implements OnInit {
  sucursalId!: number;
  mascotas: any[] = [];
  columnas: string[] = ['foto', 'nombre', 'especie', 'raza', 'sexo', 'color', 'estado', 'acciones'];

  constructor(
    private mascotaService: MascotaService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.parent?.paramMap.subscribe(params => {
      this.sucursalId = Number(params.get('sucursalId'));
      this.obtenerMascotas();
    });
  }

  obtenerMascotas() {
    this.mascotaService.getMascotasPorSucursal(this.sucursalId).subscribe({
      next: res => this.mascotas = res,
      error: err => console.error('Error al obtener mascotas', err)
    });
  }
}
