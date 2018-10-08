import { Component, OnInit,Inject } from '@angular/core';
import {  MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-editar-temas',
  templateUrl: './editar-temas.component.html',
  styleUrls: []
})
export class EditarTemasComponent implements OnInit {

  forma: FormGroup;

  constructor(
    public fb: FormBuilder,
    public dialogRef: MatDialogRef<EditarTemasComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

      this.forma = fb.group({
        'id_tema' : data.id_tema,
        'desc_tema' : data.desc_tema,
        'desc_area': data.desc_area
             });

    }

  ngOnInit() {
  }
  guardarCambios() {
    
  
      if (this.forma.value.desc_tema !== '') {
    this.dialogRef.close(this.forma.value);

  }  else {
    alert('Ingrese la descripción del tema');
  }
  
  
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
