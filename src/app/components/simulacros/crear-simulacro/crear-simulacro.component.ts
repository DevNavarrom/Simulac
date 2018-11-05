import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { ListarExamenesComponent } from '../../examenes/listar-examenes/listar-examenes.component';
import { Simulacros } from 'src/app/modelos/Simulacros';

@Component({
  selector: 'app-crear-simulacro',
  templateUrl: './crear-simulacro.component.html',
  styleUrls: ['./crear-simulacro.component.css']
})
export class CrearSimulacroComponent implements OnInit {
  fecha=new FormControl(new Date());
  simulacro: any={

    id_simulacro:'',
    id_examen:'',
    fecha:'',
    responsable:'',
    grupo:'',
    estado:''

  };
  constructor( public fb: FormBuilder,
    public dialogRef: MatDialogRef<CrearSimulacroComponent>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      

     }

     cargarExamenes()
     {

      const dialogRef = this.dialog.open(ListarExamenesComponent, {
        panelClass: 'my-panel',
        data: null
      });
        dialogRef.afterClosed().subscribe(result => {
  
        if ( !result ) {
         
          return;
        }
    this.simulacro.id_examen=result;

         
        });
  
     }
  ngOnInit() {
  }


  onNoClick(): void {
    this.dialogRef.close();
  }

}
