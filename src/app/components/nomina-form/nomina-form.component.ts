import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { NominaService } from '../../services/nomina.service';

@Component({
  selector: 'app-nomina-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule
  ],
  templateUrl: './nomina-form.component.html',
  styleUrls: ['./nomina-form.component.scss']
})
export class NominaFormComponent implements OnInit {
  form!: FormGroup;
  estados = ['borrador', 'calculada', 'pagada', 'cancelada'];

  constructor(
    private fb: FormBuilder,
    private nominaService: NominaService,
    public dialogRef: MatDialogRef<NominaFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      sucursal_id:     [this.data.sucursal_id, Validators.required],
      usuario_id:      [this.data.usuario_id],
      nomina_fecha:        [this.toDate(this.data.nomina?.nomina_fecha),       Validators.required],
      nomina_periodo_inicio: [this.toDate(this.data.nomina?.nomina_periodo_inicio), Validators.required],
      nomina_periodo_fin:    [this.toDate(this.data.nomina?.nomina_periodo_fin),    Validators.required],
      nomina_estado:     [this.data.nomina?.nomina_estado || 'borrador', Validators.required],
      total_nomina:      [this.data.nomina?.total_nomina || 0, Validators.required],
      observaciones:     [this.data.nomina?.observaciones || '']
    });
  }

  private toDate(d: any): Date | null {
    return d ? new Date(d) : null;
  }

  guardar(): void {
    if (this.form.invalid) return;
    const payload = this.form.value;
    const peticion = this.data.nomina?.nomina_id
      ? this.nominaService.updateNomina(this.data.nomina.nomina_id, payload)
      : this.nominaService.createNomina(payload);
    const resultado = this.data.nomina?.nomina_id ? 'updated' : 'created';
    peticion.subscribe(() => this.dialogRef.close(resultado));
  }
}

