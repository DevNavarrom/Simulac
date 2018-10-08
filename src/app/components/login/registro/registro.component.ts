import { Component, OnInit, Inject } from '@angular/core';
import {  MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: []
})
export class RegistroComponent implements OnInit {
  forma: FormGroup;
 
  constructor(public fb: FormBuilder,
    public dialogRef: MatDialogRef<RegistroComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.forma = fb.group({
        'id_estudiante' : data.id_estudiante,
        'nombre': data.nombre,
        'programa': data.programa,
        'sexo':data.sexo
      });


     }

  ngOnInit() {
  }

  registrar() {
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
    console.log("no click ");
    this.dialogRef.close();
    
  }

}
