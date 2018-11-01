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
  private preguntas:DialogDataPreguntas[] = [];
  respuestas:IRespuestas[] = [];
  respuesta:IRespuestas;
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

  registrarPregunta() {
    this.pregunta = null;
    this.pregunta = {
      id_pregunta: 0,
      desc_pregunta: this.descrip_pregunta,
      id_area: this.area_select,
      id_tema:this.tema_select,
      imagen: 'img.jpg'
    }
    //let idPregunta:any[] = [];
    this._preguntasService.postPreguntas(this.pregunta).subscribe(datos => {
      if (datos['estado'] == 1) {
        alert(datos['datos'][0].id_pregunta);
        //idPregunta = datos['datos'];
        //this.id_pregunta = idPregunta[0].id_pregunta;
        this.id_pregunta = parseInt(datos['datos'][0].id_pregunta);
        this.pregunta = {
          id_pregunta: this.id_pregunta,
          desc_pregunta: this.descrip_pregunta,
          id_area: this.area_select,
          id_tema:this.tema_select,
          imagen: 'img.jpg'
        }
        this.preguntas.push(this.pregunta);
        
        //TODO invocar metodo para guardar respuestas
        this.guardarRespuestas();
      } else if (datos['estado'] == 23000) {
        alert('El area ya se encuentra registrada');
      }       else {
        alert('No guardado');
      }
    });
  }

  guardarRespuestas() {
    var mensaje:string = "No Guardado.";
    for (let i = 0; i < this.respuestas.length; i++) {
      this.respuestas[i].id_respuesta = this.id_pregunta+"R"+(i+1);
      this.respuestas[i].id_pregunta = this.id_pregunta;
      
      this.respuesta = null;
      this.respuesta = {
        id_pregunta : this.respuestas[i].id_pregunta,
        id_respuesta : this.respuestas[i].id_respuesta,
        desc_respuesta : this.respuestas[i].desc_respuesta,
        correcta : this.respuestas[i].correcta
      };
      console.log(this.respuesta);
      this._respuService.postRespuestas(this.respuesta).subscribe(res => {
        if (res['estado'] == 1) {
          mensaje = res['mensaje'];
        }
      });
    }
    //console.log(this.respuestas);
    alert(mensaje);
  }

  //Para cuando edito el input de preguntas agrego una respuesta vacia en el array
  editarPregunta(value:string) {
    if (this.respuestas.length==0 && value.length > 0) {
      let resp:IRespuestas={
        id_pregunta : 0,
        id_respuesta : "",
        desc_respuesta: "",
        correcta: 0
      };
      this.respuestas.push(resp);
    }/*else{
      console.log('sino editarPregunta()');
      this.respuestas.splice(this.respuestas.length, 1);
    }*/
    console.log('Cantidad Array->'+this.respuestas.length);
  }

  //Para cuando doy enter en un input de respuesta agrego una respuesta vacia en el array
  agregarItemRespuesta(resp:IRespuestas){
    console.log('Caracteres Respu->'+resp.desc_respuesta.length);
    if (resp.desc_respuesta.length >= 1) {
      let respu:IRespuestas={
        id_pregunta : 0,
        id_respuesta : "",
        desc_respuesta: "",
        correcta: 0
      };
      this.respuestas.push(respu);
    }else{
      console.log('Sino agregarItemRespuesta()');
    }
  }

  //Para cuando doy click en un radio button de las respuestas indico en el array cual es la correcta (1)
  actionIsSelected(idx:number) {
    for (let index = 0; index < this.respuestas.length; index++) {
      this.respuestas[index].correcta = 0;
      if (this.respuestas[idx].correcta == 0) {
        this.respuestas[idx].correcta = 1;
      }
      
    }
    console.log(this.respuestas);
  }

  guardarExamen() {
    if (this.preguntas.length > 0 && this.respuestas.length > 0 && this.descrip_pregunta.length > 0) {
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
    this.respuestas.splice(0, this.respuestas.length);
    this.descrip_examen = "";
    this.descrip_pregunta = "";
    this.mensaje = "";
  }

  public cargandoImagen(files: FileList){
    console.log(files[0].name);
    console.log(this.rutaImagen);
    this.nombreImagen = files[0].name;
		this._examenServie.postFileImagen(files[0]).subscribe(

			response => {
        this.rutaImagen = "../../../Api/imagenes/"+files[0].name;
				this.respuestaImagenEnviada = response; 
				if(this.respuestaImagenEnviada <= 1){
					console.log("Error en el servidor"); 
				}else{
					if(this.respuestaImagenEnviada.code == 200 && this.respuestaImagenEnviada.status == "success"){

						this.resultadoCarga = 1;
            
					}else{
						this.resultadoCarga = 2;
					}

				}
			},
			error => {
				console.log(<any>error);
			}

		);//FIN DE METODO SUBSCRIBE

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

}
