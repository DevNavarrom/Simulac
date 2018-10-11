import { Component, OnInit, Inject } from '@angular/core';
import {  MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Preguntas, DialogDataPreguntas } from '../../../modelos/Preguntas';
import { Temas } from '../../../modelos/Temas';
import { TemasService } from '../../../services/temas.service';
import { PreguntasService } from '../../../services/preguntas.service';



@Component({
  selector: 'app-preguntas-examen',
  templateUrl: './preguntas-examen.component.html',
  styleUrls: ['./preguntas-examen.component.css']
})
export class PreguntasExamenComponent implements OnInit {

  //formPreguntas:FormGroup;

  tema_select:string;
  temas;
  error = '';
  id_tema:string;
  id_area:string;
  preguntas;

  constructor(private _temasService:TemasService, private _preguntasService:PreguntasService, public fb: FormBuilder,
    public dialogRef: MatDialogRef<PreguntasExamenComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogDataPreguntas) { 

      /*this.formPreguntas = fb.group({
        'idArea' : data.id_area,
      });*/
      this.id_area = data.id_area;
      this.id_tema = data.id_tema;
    }

  ngOnInit() {
    //this.id_area = this.formPreguntas.value.idArea;
    this.cargarTemas();
    this.tema_select = this.id_tema;
    this.mostrarPreguntas();
  }

  cargarTemas(): void {
    this._temasService.getBuscarTema(this.id_area)
      .subscribe((res) => {
        this.temas = res['datos'];
      },
      (err) => {
        this.error = err;
      }
    );
  }

  //TODO terminar de implementar este metodo
  mostrarPreguntas(): void {
    this._preguntasService.getPreguntasPorTema(this.tema_select)
      .subscribe((res) => {
        this.preguntas = res['datos'];
      },
      (err) => {
        this.error = err;
      }
    );
  }

  seleccionarPregunta(pre:any){
    let _pre:any = {
      id_pregunta : pre.id_pregunta,
      desc_pregunta : pre.desc_pregunta,
      id_area : this.id_area,
      id_tema : this.id_tema,
      imagen: ''
    }
    this.dialogRef.close(_pre);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
