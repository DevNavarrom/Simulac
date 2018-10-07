import { Component, OnInit,Inject } from '@angular/core';
import {  MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-editar-area',
  templateUrl: './editar-area.component.html',
  styleUrls: []
})
export class EditarAreaComponent implements OnInit {

  forma: FormGroup;

  constructor(
    public fb: FormBuilder,
    public dialogRef: MatDialogRef<EditarAreaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

      this.forma = fb.group({
        'id_area' : data.id_area,
        'desc_area': data.desc_area,
             });

    }

  ngOnInit() {
  }
  guardarCambios() {
    if (this.forma.value.id_area != '') {
      if (this.forma.value.desc_area !== '') {
    this.dialogRef.close(this.forma.value);

  }  else {
    alert('Ingrese la descripción del area');
  }
  } else {
    alert('Ingrese un id para area');
  }
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
