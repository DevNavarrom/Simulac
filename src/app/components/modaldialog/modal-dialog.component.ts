import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-modal-dialog',
  templateUrl: './modal-dialog.component.html',
  styleUrls: []
})
export class ModalDialogComponent implements OnInit {
  forma: FormGroup;
  mensaje: string="";
  tipo: string="";
  mostrarImput: boolean= false;

  constructor( public fb: FormBuilder,
    public dialogRef: MatDialogRef<ModalDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

     
             this.mensaje= data.mensaje;
             this.tipo=data.tipo;
             if(this.mensaje=='inputMessage')
             {
               this.mostrarImput=true;
             }

             this.forma = fb.group({
              'imput' : ""             
            });

     }

  ngOnInit() {
  }
  confirmar() {
      
    this.dialogRef.close(this.forma.value);

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
