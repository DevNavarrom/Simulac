import { Component, OnInit } from '@angular/core';
import { AreasService } from '../../../services/areas.service';
import { TemasService } from '../../../services/temas.service';
import { PreguntasService } from '../../../services/preguntas.service';

import { MatDialog } from '@angular/material';
import { PreguntasExamenComponent } from '../preguntas-examen/preguntas-examen.component';
import { Preguntas, DialogDataPreguntas } from '../../../modelos/Preguntas';

@Component({
  selector: 'app-crearexamen',
  templateUrl: './crearexamen.component.html',
  styleUrls: ['./crearexamen.component.css']
})
export class CrearexamenComponent implements OnInit {

  areas;
  temas;
  error = '';
  area_select:string;
  tema_select:string;
  descrip_pregunta:string;
  id_area:string;
  pregunta:DialogDataPreguntas;
  private preguntas:DialogDataPreguntas[] = [];

  constructor(private _preguntasService:PreguntasService, private _areasService: AreasService, private _temasService:TemasService, public dialog: MatDialog) { }

  ngOnInit() {
    this.cargarAreas();
    //this.area_select="0";
    this.cargarTemas();
    this.tema_select="0";
  }

  selectPregunta(){
    //let pregunta:Preguntas = new Preguntas(0,this.area_select,"",this.tema_select,"");
    /*this.pregunta.id_area = this.area_select;
    this.pregunta.id_tema = this.tema_select;*/
    this.pregunta = {
      id_pregunta: '0',
      desc_pregunta: '',
      id_area: this.area_select,
      id_tema:this.tema_select,
      imagen: ''
    }
    console.log(this.pregunta);

    const dialogRef = this.dialog.open(PreguntasExamenComponent, {
      panelClass: 'my-panel',
      width: '850px',
      data: this.pregunta
    });
      dialogRef.afterClosed().subscribe(result => {

      if ( !result ) {
       
        return;
      }
      console.log(result);
      this.preguntas.push(result);
      
      });
  }

  quitarPregunta(pre:DialogDataPreguntas){
    var index = this.preguntas.indexOf(pre);
    this.preguntas.splice(index, 1);
  }
  cargarAreas(): void {
    this._areasService.getAreas()
      .subscribe((res) => {
        this.areas = res['datos'];
      },
      (err) => {
        this.error = err;
      }
    );
  }

  cargarTemas(): void {
    this._temasService.getBuscarTema(this.area_select)
      .subscribe((res) => {
        this.temas = res['datos'];
      },
      (err) => {
        this.error = err;
      }
    );
  }

  registrarPregunta() {
    this._preguntasService.postPreguntas(this.pregunta).subscribe(datos => {
      if (datos['estado'] == 1) {
        alert(datos['mensaje']);
        //TODO cambiar campo id_pregunta, quitar auto_increment para poder relacionar respuestas
        //TODO hacer procedimiento almacenado donde se haga select de la cantidad de preguntas y crear id el cual se retornara
        //TODO invocar metodo para guardar respuestas
      } else if (datos['estado'] == 23000) {
        alert('El area ya se encuentra registrada');
      }       else {
        alert('No guardado');
      }
    });
  }

}
