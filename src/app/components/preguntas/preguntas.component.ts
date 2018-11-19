import { Component, OnInit } from '@angular/core';
import { AreasService } from '../../services/areas.service';
import { TemasService } from '../../services/temas.service';
import { PreguntasService } from '../../services/preguntas.service';
import { Preguntas, DialogDataPreguntas } from '../../modelos/Preguntas';
import { IRespuestas } from '../../modelos/Respuestas';
import { RespuestasService } from '../../services/respuestas.service';
import { ExamenesService } from '../../services/examenes.service';
import { MatDialog, MatSnackBar } from '@angular/material';
import { PreguntasModalComponent } from '../preguntas-modal/preguntas-modal.component';

@Component({
  selector: 'app-preguntas',
  templateUrl: './preguntas.component.html',
  styles: []
})
export class PreguntasComponent implements OnInit {

  areas;
  temas;
  error = '';
  area_select:string = "";
  tema_select:string = "";
  data:string="";
  descrip_pregunta:string;
  preguntas:DialogDataPreguntas[] = [];
  public respuestaImagenEnviada;
  public resultadoCarga;
  public nombreImagen:string = "No hay imagen selecionada";
  public rutaImagen:string = "./assets/images/add-image.png";
  pregunta:DialogDataPreguntas = null;
  id_pregunta:number = 0;

  constructor( private _areasService: AreasService, private _temasService:TemasService, 
    private _examenServie:ExamenesService, private _preguntasService:PreguntasService, 
    public snackBar: MatSnackBar,
    private _respuService:RespuestasService, public dialog: MatDialog ) {
      this.mostrarPreguntas();
     }

  ngOnInit() {
    this.cargarAreas();
      //this.area_select="0";
      this.cargarTemas();
      //this.tema_select="0";
  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
  mostrarDialogPregunta() {
    const dialogRef = this.dialog.open(PreguntasModalComponent, {
      panelClass: 'my-panel',
      width: '900px',
      data: this.pregunta
    });
    dialogRef.afterClosed().subscribe(result => {

      if (!result) {

        return;
      }
      console.log(result);
      //this.preguntas.push(result);
      this.mostrarPreguntas();
    });
  }

  quitarPregunta(pre:DialogDataPreguntas){
    
    if(confirm('¿Desea eliminar esta pregunta?')){

    this._preguntasService.eliminarPregunta(pre.id_pregunta)
    .subscribe((res) => {
      console.log(res)
      if(res['estado']==111)
      {
        this.openSnackBar('Pregunta  correctamente','Aceptar');
        this.mostrarPreguntas();

      }
    },
    (err) => {
      this.error = err;
    }
  );
  }
  }

  cargarAreas(): void {
    this._areasService.getAreas()
      .subscribe((res) => {
        this.areas = res['datos'];
        this.mostrarPreguntas();
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
        this.mostrarPreguntas();
      },
      (err) => {
        this.error = err;
      }
    );
    
  }

  


  editarPregunta(preg:DialogDataPreguntas) {
    this.pregunta = null;
    console.log(preg.imagen);
    this.pregunta = {
      id_pregunta : preg.id_pregunta,
      desc_pregunta: preg.desc_pregunta,
      id_area : preg.id_area,
      id_tema : preg.id_tema,
      imagen : preg.imagen
    }
    this.mostrarDialogPregunta();
    console.log('editarPregunta(): '+this.pregunta);
  }

  crearNueva() {
    this.pregunta = null;
    this.pregunta = {
      id_pregunta : 0,
      desc_pregunta: '',
      id_area : this.area_select,
      id_tema : this.tema_select,
      imagen : ''
    }
    this.mostrarDialogPregunta();

  }

  mostrarPreguntas(): void {

    let datos: any=
    {
      "area_select":this.area_select,
      "tema_select":this.tema_select,
      "data":this.data    }
    this._preguntasService.getPreguntasAreaTema(datos)
      .subscribe((res) => {
        this.preguntas = res['datos'];
      },
      (err) => {
        this.error = err;
      }
    );
  }

  limpiar() {
    this.descrip_pregunta = "";
  }

}
