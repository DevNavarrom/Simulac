import { Component, OnInit, Inject } from '@angular/core';
import {  MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Preguntas } from '../../../modelos/Preguntas';
import { Temas } from '../../../modelos/Temas';
import { TemasService } from '../../../services/temas.service';


@Component({
  selector: 'app-preguntas-examen',
  templateUrl: './preguntas-examen.component.html',
  styleUrls: ['./preguntas-examen.component.css']
})
export class PreguntasExamenComponent implements OnInit {

  formPreguntas:FormGroup;

  tema_select:string;
  temas;
  error = '';
  id_tema:string;
  id_area:string;
  preguntas;

  constructor(private _temasService:TemasService, public fb: FormBuilder,
    public dialogRef: MatDialogRef<PreguntasExamenComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Preguntas) { 

      /*this.formPreguntas = fb.group({
        'id_estudiante' : data.id_tema,
      });*/
      this.tema_select = data.id_tema;
    }

  ngOnInit() {
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
    this._temasService.getTemas()
      .subscribe((res) => {
        this.temas = res['datos'];
      },
      (err) => {
        this.error = err;
      }
    );
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
