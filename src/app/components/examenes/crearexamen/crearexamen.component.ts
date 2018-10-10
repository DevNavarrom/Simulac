import { Component, OnInit } from '@angular/core';
import { AreasService } from '../../../services/areas.service';
import { TemasService } from '../../../services/temas.service';
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
  id_area:string;
  pregunta:DialogDataPreguntas;
  private preguntas:DialogDataPreguntas[] = [];

  constructor(private _areasService: AreasService, private _temasService:TemasService, public dialog: MatDialog) { }

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
      id_tema:this.tema_select
    }
    console.log(this.pregunta);

    const dialogRef = this.dialog.open(PreguntasExamenComponent, {
      panelClass: 'my-panel',
      width: '750px',
      data: this.pregunta
    });
      dialogRef.afterClosed().subscribe(result => {

      if ( !result ) {
       
        return;
      }
      console.log(result);
      this.preguntas.push(result);
      console.log(this.preguntas.length);
      //TODO: llenar tabla con array de preguntas

      
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

}
