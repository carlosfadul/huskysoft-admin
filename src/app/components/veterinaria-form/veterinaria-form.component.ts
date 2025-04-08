import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { VeterinariaService } from '../../services/veterinaria.service';

@Component({
  selector: 'app-veterinaria-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  template: `
    <h2 mat-dialog-title>{{ data?.veterinaria ? 'Editar' : 'Nueva' }} Veterinaria</h2>
    
    <form [formGroup]="form" (ngSubmit)="guardar()" enctype="multipart/form-data">

      <!-- Nombre -->
      <mat-form-field appearance="outline" class="full-width">
        <mat-label>Nombre</mat-label>
        <input matInput formControlName="veterinaria_nombre" required>
      </mat-form-field>

      <!-- NIT -->
      <mat-form-field appearance="outline" class="full-width">
        <mat-label>NIT</mat-label>
        <input matInput formControlName="veterinaria_nit">
      </mat-form-field>

      <!-- Teléfono -->
      <mat-form-field appearance="outline" class="full-width">
        <mat-label>Teléfono</mat-label>
        <input matInput formControlName="veterinaria_telefono">
      </mat-form-field>

      <!-- Dirección -->
      <mat-form-field appearance="outline" class="full-width">
        <mat-label>Dirección</mat-label>
        <input matInput formControlName="veterinaria_direccion">
      </mat-form-field>

      <!-- Logo -->
      <div class="full-width">
        <label for="logo">Logo:</label><br>
        <input type="file" id="logo" (change)="onFileSelected($event)" />
      </div>

      <!-- Botones -->
      <div class="acciones">
        <button mat-button type="button" (click)="dialogRef.close()">Cancelar</button>
        <button mat-raised-button color="primary" type="submit" [disabled]="form.invalid">Guardar</button>
      </div>
    </form>
  `,
  styles: [`
    .full-width {
      width: 100%;
      margin-bottom: 15px;
    }
    .acciones {
      display: flex;
      justify-content: flex-end;
      gap: 10px;
      margin-top: 20px;
    }
  `]
})
export class VeterinariaFormComponent {
  form: FormGroup;
  selectedFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<VeterinariaFormComponent>,
    private veterinariaService: VeterinariaService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.form = this.fb.group({
      veterinaria_nombre: [data?.veterinaria?.veterinaria_nombre || '', Validators.required],
      veterinaria_nit: [data?.veterinaria?.veterinaria_nit || ''],
      veterinaria_telefono: [data?.veterinaria?.veterinaria_telefono || ''],
      veterinaria_direccion: [data?.veterinaria?.veterinaria_direccion || '']
    });
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0] || null;
  }

  guardar() {
    if (this.form.valid) {
      const formData = new FormData();
      formData.append('veterinaria_nombre', this.form.value.veterinaria_nombre);
      formData.append('veterinaria_nit', this.form.value.veterinaria_nit);
      formData.append('veterinaria_telefono', this.form.value.veterinaria_telefono);
      formData.append('veterinaria_direccion', this.form.value.veterinaria_direccion);

      if (this.selectedFile) {
        formData.append('veterinaria_logo', this.selectedFile);
      }

      if (this.data?.veterinaria) {
        this.veterinariaService.updateVeterinaria(this.data.veterinaria.veterinaria_id, formData)
          .subscribe(() => this.dialogRef.close('updated'));
      } else {
        this.veterinariaService.createVeterinaria(formData)
          .subscribe(() => this.dialogRef.close('updated'));
      }
    }
  }
}
