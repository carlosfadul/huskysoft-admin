// src/app/components/atencion-form/atencion-form.component.ts
import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

import { AtencionService } from '../../services/atencion.service';
import { ServicioService } from '../../services/servicio.service';

@Component({
  selector: 'app-atencion-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule
  ],
  templateUrl: './atencion-form.component.html',
  styleUrls: ['./atencion-form.component.scss']
})
export class AtencionFormComponent implements OnInit {

  form!: FormGroup;
  servicios: any[] = [];
  cargandoServicios = false;

  constructor(
    private fb: FormBuilder,
    private atencionService: AtencionService,
    private servicioService: ServicioService,
    private dialogRef: MatDialogRef<AtencionFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { mascotaId: number }
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      servicio_id: [null, Validators.required],
      atencion_cantidad: [1, [Validators.required, Validators.min(1)]],
      atencion_precio: [0, [Validators.required, Validators.min(0)]],
      atencion_detalle: [''],
      diagnostico: ['', Validators.required],
      tratamiento: [''],
      observaciones: ['']
    });

    this.cargarServicios();
  }

  cargarServicios(): void {
    this.cargandoServicios = true;
    this.servicioService.getServicios().subscribe({
      next: (res: any) => {
        this.servicios = res;
        this.cargandoServicios = false;
      },
      error: (err: any) => {
        console.error('Error al cargar servicios', err);
        this.cargandoServicios = false;
      }
    });
  }

  guardar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const valores = this.form.value;

    const payload = {
      mascota_id: this.data.mascotaId,
      servicio_id: valores.servicio_id,
      usuario_id: null,                // luego lo conectamos con el usuario logueado
      atencion_cantidad: valores.atencion_cantidad,
      atencion_precio: valores.atencion_precio,
      atencion_detalle: valores.atencion_detalle,
      atencion_estado: 'completada',   // por ahora fija
      diagnostico: valores.diagnostico,
      tratamiento: valores.tratamiento,
      observaciones: valores.observaciones
    };

    this.atencionService.crearAtencion(payload).subscribe({
      next: () => this.dialogRef.close('saved'),
      error: (err: any) => {
        console.error('Error al crear atención', err);
      }
    });
  }

  cancelar(): void {
    this.dialogRef.close();
  }
}

