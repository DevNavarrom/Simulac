import { Component, OnInit, Inject } from '@angular/core';
import {  MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Estudiantes } from '../../../modelos/Estudiantes';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  formRegistro: FormGroup;
  constructor(public fb: FormBuilder,
    public dialogRef: MatDialogRef<RegistroComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Estudiantes) {

      this.formRegistro = fb.group({
        'idEstudiante' : data.id_estudiante,
        'nombre': data.nombre,
        'programa': data.programa,
        'sexo': data.sexo
             });

     }

  ngOnInit() {
  }

  registrar(){
    if (this.formRegistro.value.idEstudiante!='') {
      this.dialogRef.close(this.formRegistro.value);
    } else {
      alert('Identificación requerida');
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
