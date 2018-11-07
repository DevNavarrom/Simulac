import { Component, OnInit } from '@angular/core';
import { AreasService } from '../../../services/areas.service';
import { TemasService } from '../../../services/temas.service';
import { PreguntasService } from '../../../services/preguntas.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { PreguntasExamenComponent } from '../preguntas-examen/preguntas-examen.component';
import { Preguntas, DialogDataPreguntas } from '../../../modelos/Preguntas';
import { IRespuestas } from '../../../modelos/Respuestas';
import { RespuestasService } from '../../../services/respuestas.service';
import { ExamenesService } from '../../../services/examenes.service';
import { IExamen, IDetalleExamen } from 'src/app/modelos/Examen';
import { ActivatedRoute } from '@angular/router';
import { PreguntasModalComponent } from '../../preguntas-modal/preguntas-modal.component';


@Component({
  selector: 'app-crearexamen',
  templateUrl: './crearexamen.component.html',
  styleUrls: ['./crearexamen.component.css'],
  styles: [`
    .ng-invalid.ng-touched:not(form) {
      border: 1px solid red;
    }
  `]
})
export class CrearexamenComponent implements OnInit {

  areas;
  temas;
  error = '';
  area_select:string = "0";
  tema_select:string = "0";
  descrip_pregunta:string;
  descrip_examen:string;
  id_area:string;
  pregunta:DialogDataPreguntas = null;
  examen:IExamen = null;
  _examen = null;
  preguntas:DialogDataPreguntas[] = [];
  detalleExamen:IDetalleExamen = null;
  id_pregunta:number = 0;
  id_examen:number = 0;
  mensaje:string = "";
  public respuestaImagenEnviada;
  public resultadoCarga;
  public nombreImagen:string = "No hay imagen selecionada";
  public rutaImagen:string = "./assets/images/add-image.png";

  constructor(private _preguntasService:PreguntasService, private _areasService: AreasService, private _activatedRoute:ActivatedRoute,
    private _temasService:TemasService, private _respuService:RespuestasService, private _examenServie:ExamenesService, 
    public dialog: MatDialog) {
      this._activatedRoute.params.subscribe( params => {
        console.log(params['id']);
        this.id_examen = params['id'];
      });
     }

  ngOnInit() {
    this.cargarExamen();
    
    
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
      this.preguntas.push(result);
    });
  }


  eliminarExamen(idexa:number) {
    this._examenServie.deleteExamen(idexa).subscribe(res => {
      if (res['estado']==111) {
        this.mensaje = res['mensaje'];
      }
      alert(this.mensaje);
    });
  }

  cargarExamen() {
    if (this.id_examen != 0) {
      this._examenServie.getExamen(this.id_examen).subscribe(res => {
        this._examen = res['datos'][0];
        this.examen = {
          id_examen: this._examen.id_examen,
          id_area: this._examen.id_area,
          id_tema: this._examen.id_tema,
          desc_examen: this._examen.desc_examen,
          desc_area: this._examen.desc_area,
          desc_tema: this._examen.desc_tema
        }
        this.cargarAreas();
        this.area_select = this._examen.id_area;
        this.tema_select = this._examen.id_tema;
        this.id_examen = this._examen.id_examen;
        this.descrip_examen = this._examen.desc_examen;
        this.cargarTemas();
        this.mostrarPreguntas(this.id_examen);
      });
    }else {
      this.cargarAreas();
      //this.area_select="0";
      this.cargarTemas();
      this.tema_select="0";
    }
    
  }

  selectPregunta() {
    //let pregunta:Preguntas = new Preguntas(0,this.area_select,"",this.tema_select,"");
    /*this.pregunta.id_area = this.area_select;
    this.pregunta.id_tema = this.tema_select;*/
    if (this.area_select != "0") {
      this.pregunta = {
        id_pregunta: 0,
        desc_pregunta: '',
        id_area: this.area_select,
        id_tema: this.tema_select,
        imagen: ''
      }
      console.log(this.pregunta);

      const dialogRef = this.dialog.open(PreguntasExamenComponent, {
        panelClass: 'my-panel',
        width: '850px',
        data: this.pregunta
      });
      dialogRef.afterClosed().subscribe(result => {

        if (!result) {

          return;
        }
        console.log(result);
        this.preguntas.push(result);

      });
    } else {
      //TODO valido indicando que tengo que seleccionar un area antes
      alert('Debe seleccionar un area.');
    }

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

  

  guardarExamen() {
    if (this.preguntas.length > 0 && this.descrip_examen.length > 0) {
      this.examen = {
        id_tema: this.tema_select,
        desc_examen: this.descrip_examen,
        id_area: this.area_select,
        id_examen: this.id_examen,
        desc_area: "",
        desc_tema: ""
      };
      console.log(this.examen);
      this._examenServie.postExamen(this.examen).subscribe(resp => {
        if (resp['estado'] == 1) {
          this.id_examen = resp['datos'][0].id_examen;

          //Invoco metodo para registrar detalle delexamen(preguntas)
          this.preguntas.forEach(preg => {
            this.detalleExamen = {
              id_examen: this.id_examen,
              id_pregunta: preg.id_pregunta
            }
            console.log(this.detalleExamen);
            this._examenServie.postDetalleExamen(this.detalleExamen).subscribe(res => {
              if (res['estado'] == 1) {
                this.limpiar();
                this.mensaje = res['mensaje'];
                //alert(res['mensaje']);
                console.log(res['mensaje']);
              }

            })
          });
          alert('Examen creado satisfactoriamente.');

        }

      });
    }

  }

  limpiar() {
    this.preguntas.splice(0, this.preguntas.length);
    this.descrip_examen = "";
    this.descrip_pregunta = "";
    this.mensaje = "";
  }

  
  
  mostrarPreguntas(idexa:number): void {
    this._preguntasService.getPreguntasExamen(idexa)
      .subscribe((res) => {
        this.preguntas = res['datos'];
      },
      (err) => {
        this.error = err;
      }
    );
  }

  editarPregunta(preg:DialogDataPreguntas) {
    /*this._respuService.getRespuestas(id_preg)
        .subscribe(res => {
          if (res['estado']==111) {
            this.respuestas = null;
            this.respuestas = res['datos'];
            this.descrip_pregunta = desc_preg;
            this.id_pregunta = id_preg;
          }
    });
    console.log('editarPregunta(): '+this.respuestas);*/
    this.pregunta = null;
    this.pregunta = {
      id_pregunta : preg.id_pregunta,
      desc_pregunta: preg.desc_pregunta,
      id_area : this.area_select,
      id_tema : this.tema_select,
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

}
