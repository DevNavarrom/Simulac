import { Component, OnInit } from '@angular/core';
import { AreasService } from '../../services/areas.service';
import { TemasService } from '../../services/temas.service';
import { PreguntasService } from '../../services/preguntas.service';
import { Preguntas, DialogDataPreguntas } from '../../modelos/Preguntas';
import { IRespuestas } from '../../modelos/Respuestas';
import { RespuestasService } from '../../services/respuestas.service';
import { ExamenesService } from '../../services/examenes.service';

@Component({
  selector: 'app-preguntas',
  templateUrl: './preguntas.component.html',
  styles: []
})
export class PreguntasComponent implements OnInit {

  areas;
  temas;
  error = '';
  area_select:string = "0";
  tema_select:string = "0";
  descrip_pregunta:string;
  private preguntas:DialogDataPreguntas[] = [];
  respuestas:IRespuestas[] = [];
  public respuestaImagenEnviada;
  public resultadoCarga;
  public nombreImagen:string = "No hay imagen selecionada";
  public rutaImagen:string = "./assets/images/add-image.png";
  pregunta:DialogDataPreguntas = null;
  id_pregunta:number = 0;
  respuesta:IRespuestas;

  constructor( private _areasService: AreasService, private _temasService:TemasService, 
    private _examenServie:ExamenesService, private _preguntasService:PreguntasService, private _respuService:RespuestasService ) { }

  ngOnInit() {
    this.cargarAreas();
      //this.area_select="0";
      this.cargarTemas();
      //this.tema_select="0";
  }

  quitarPregunta(pre:DialogDataPreguntas){
    var index = this.preguntas.indexOf(pre);
    this.preguntas.splice(index, 1);
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
      },
      (err) => {
        this.error = err;
      }
    );
  }

  //Para cuando edito el input de preguntas agrego una respuesta vacia en el array
  agregarRespuestaVacia(value:string) {
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

  registrarPregunta() {
    if (this.respuestas.length > 0 && this.descrip_pregunta.length > 0) {
      this.pregunta = null;
    this.pregunta = {
      id_pregunta: 0,
      desc_pregunta: this.descrip_pregunta,
      id_area: this.area_select,
      id_tema:this.tema_select,
      imagen: this.nombreImagen
    }
    //let idPregunta:any[] = [];
    this._preguntasService.postPreguntas(this.pregunta).subscribe(datos => {
      if (datos['estado'] == 1) {
        //alert(datos['datos'][0].id_pregunta);
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
        alert('Pregunta registrada satisfactoriamente.');
        //TODO invocar metodo para guardar respuestas
        this.guardarRespuestas();
      } else if (datos['estado'] == 23000) {
        alert('El area ya se encuentra registrada');
      } else {
        //alert('No guardado');
      }
    });
    }
    
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
    //alert(mensaje);
  }

  editarPregunta(id_preg:number, desc_preg:string) {
    this._respuService.getRespuestas(id_preg)
        .subscribe(res => {
          if (res['estado']==111) {
            this.respuestas = null;
            this.respuestas = res['datos'];
            this.descrip_pregunta = desc_preg;
            this.id_pregunta = id_preg;
          }
    });
  }

  mostrarPreguntas(): void {
    var parametro:string = "";
    if (this.area_select!="0" && this.tema_select=="0") {
      parametro = this.area_select;
    } else if (this.area_select!="0" && this.tema_select!="0") {
      parametro = this.tema_select;
    }
    this._preguntasService.getPreguntasAreaTema(parametro)
      .subscribe((res) => {
        this.preguntas = res['datos'];
        console.log('Area: '+this.area_select+' -- '+'Tema: '+this.tema_select+' -- '+'Parametro: '+parametro);
      },
      (err) => {
        this.error = err;
      }
    );
  }

}
