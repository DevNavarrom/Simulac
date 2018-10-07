import { Component, OnInit ,Inject} from '@angular/core';

import {  MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-editar-estudiante',
  templateUrl: './editar-estudiante.component.html',
  styleUrls: []
})
export class EditarEstudianteComponent implements OnInit {
  forma: FormGroup;

  constructor(
    public fb: FormBuilder,
    public dialogRef: MatDialogRef<EditarEstudianteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

      this.forma = fb.group({
        'id_estudiante' : data.id_estudiante,
        'nombres': data.nombre,
        'programa': data.programa,
        'sexo':data.sexo
      });

    }

  ngOnInit() {
  }
  guardarCambios() {
    if (this.forma.value.id_estudiante != '' && this.forma.value.nombres != '' && this.forma.value.programa !='') {
      if (this.forma.value.sexo !== '') {
    this.dialogRef.close(this.forma.value);

  }  else {
    alert('Seleccione el sexo');
  }
  } else {
    alert('Faltan datos por llenar');
  }
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
