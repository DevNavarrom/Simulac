import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { ListarExamenesComponent } from '../../examenes/listar-examenes/listar-examenes.component';
import { Simulacros } from 'src/app/modelos/Simulacros';
import { SimulacrosService } from 'src/app/services/simulacros.service';
import { formatDate } from '@angular/common';

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
    public dialog: MatDialog,private _simulacroService:SimulacrosService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      

     }

     crearSimulacro()
     {

      if(this.simulacro.id_simulacro != "" && this.simulacro.id_examen != "" && this.simulacro.estado != ""
      && this.simulacro.grupo != ""){

        let id:String=this.simulacro.id_simulacro;
        this.simulacro.id_simulacro =id.toUpperCase();

        let responsable: String=this.simulacro.responsable;
        this.simulacro.responsable=responsable.toUpperCase();

        let grupo: String=this.simulacro.grupo;
        this.simulacro.grupo=grupo.toUpperCase();

     this.simulacro.fecha =formatDate(this.fecha.value,'yyyy-MM-dd','en-US');
      this._simulacroService.postSimulacro(this.simulacro).subscribe(datos => {
        if (datos['estado'] == 1) {

         this.dialogRef.close("1");
         
        } else if (datos['estado'] == 23000) {
          alert('Ya existe un simulacro con ese ID');
        }       else {
          alert('No guardado');
        }
  
      });
    }
    else {
      alert("Faltan campos por llenar");
    }
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
