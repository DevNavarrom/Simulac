import { Component, OnInit ,Inject} from '@angular/core';

import {  MatDialogRef, MAT_DIALOG_DATA,MatSnackBar } from '@angular/material';

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
    public snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any) {

      this.forma = fb.group({
        'id_estudiante' : data.id_estudiante,
        'nombres': data.nombre,
        'programa': data.programa,
        'sexo':data.sexo
      });

    }
    openSnackBar(message: string, action: string) {
      this.snackBar.open(message, action, {
        duration: 2000,
      });
    }

  ngOnInit() {
  }
  guardarCambios() {
    if (this.forma.value.id_estudiante != '' && this.forma.value.nombres != '' && this.forma.value.programa !='') {
      if (this.forma.value.sexo !== '') {
    this.dialogRef.close(this.forma.value);

  }  else {
+    this.openSnackBar('Seleccione el sexo','Aceptar');
    
  }
  } else {
+    this.openSnackBar('Faltan datos por llenar','Aceptar');

  }
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
