import { Component, OnInit, Inject, LOCALE_ID } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, DateAdapter } from '@angular/material';
import { formatDate, DatePipe } from '@angular/common';

@Component({
  selector: 'app-editar-simulacro',
  templateUrl: './editar-simulacro.component.html',
  styleUrls: ['./editar-simulacro.component.css']
})
export class EditarSimulacroComponent implements OnInit {
  forma: FormGroup;
  fecha=new FormControl(new Date());

  constructor(    public fb: FormBuilder,
    public dialogRef: MatDialogRef<EditarSimulacroComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      
      this.forma = fb.group({
        'id_simulacro' : data.id_simulacro,
        'fecha': data.fecha,
        'responsable': data.responsable,
        'grupo':data.grupo,
        'estado':data.estado
      });
      console.log(data.fecha);
      
      this.fecha.setValue(new Date(data.fecha));
     }

  ngOnInit() {
  }

  guardarCambios() {
  
    if (this.forma.value.responsable != '' && this.forma.value.grupo != '') {
      if (this.forma.value.estado !== '') {
        this.forma.value.fecha=formatDate(this.fecha.value,'yyyy-MM-dd','en-US');
    this.dialogRef.close(this.forma.value);

  }  else {
    alert('Seleccione el estado');
  }
  } else {
    alert('Faltan datos por llenar');
  }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
