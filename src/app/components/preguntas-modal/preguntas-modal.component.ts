import { Component, OnInit, Inject } from '@angular/core';
import {  MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Preguntas, DialogDataPreguntas } from '../../modelos/Preguntas';
import { IRespuestas } from 'src/app/modelos/Respuestas';
import { AreasService } from 'src/app/services/areas.service';
import { TemasService } from 'src/app/services/temas.service';
import { PreguntasService } from 'src/app/services/preguntas.service';
import { RespuestasService } from 'src/app/services/respuestas.service';
import { ExamenesService } from 'src/app/services/examenes.service';

@Component({
  selector: 'app-preguntas-modal',
  templateUrl: './preguntas-modal.component.html',
  styleUrls: ['./preguntas-modal.component.css']
})
export class PreguntasModalComponent implements OnInit {

  areas;
  temas;
  error = '';
  area_select:string = "0";
  tema_select:string = "0";
  descrip_pregunta:string;
  private preguntas:DialogDataPreguntas[] = [];
  respuestas:IRespuestas[] = [];
  public respuestaImagenEnviada:any;
  public resultadoCarga = 0;
  public nombreImagen:string = "No hay imagen selecionada";
  public rutaImagen:string = "../../../assets/recursos/logo_simulac.png";
  fileToUpload: File = null;
  pregunta:DialogDataPreguntas = null;
  id_pregunta:number = 0;
  respuesta:IRespuestas;
  id_tema:string;
  id_area:string;

  constructor( private _areasService: AreasService, private _temasService:TemasService, 
    private _preguntasService:PreguntasService, private _examenServie:ExamenesService,
    private _respuService:RespuestasService,
    public dialogRef: MatDialogRef<PreguntasModalComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: DialogDataPreguntas ) {

      this.id_area = data.id_area;
      this.id_tema = data.id_tema;
      this.rutaImagen = "../../../assets/recursos/"+data.imagen;
      this.nombreImagen = data.imagen;
      this.editarPregunta(data.id_pregunta, data.desc_pregunta);

     }

  ngOnInit() {
    this.cargarAreas();
    this.cargarTemas();
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
  agregarItemRespuesta(i:number){
    console.log('Caracteres Respu->'+this.respuestas[i].desc_respuesta.length);
    if (this.respuestas[i].desc_respuesta.length >= 1) {
      let respuest:IRespuestas={
        id_pregunta : 0,
        id_respuesta : "",
        desc_respuesta: "",
        correcta: 0
      };
      this.respuestas.push(respuest);
      console.log(this.respuestas);
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
    this.fileToUpload = files.item(0);
    this.nombreImagen = this.fileToUpload.name;
    //this._examenServie.postFileImagen(files[0]).subscribe(
    this.rutaImagen = "../../assets/recursos/"+this.nombreImagen;
  }

  onSelectFile(event, files: FileList) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        this.rutaImagen = reader.result.toString();
        this.nombreImagen = files.item(0).name;
        this.fileToUpload = files.item(0);
      }
    }
  }

  guardarImagen(){
    this._examenServie.postFileImagen(this.fileToUpload).subscribe(
    
			response => {

        this.respuestaImagenEnviada = response; 
        if(response['code'] == 200 && response['status'] == "success"){
          this.rutaImagen = "../../assets/recursos/"+this.nombreImagen;
          console.log(this.rutaImagen+"---"+response);
          this.resultadoCarga = 1;
          
        }else{
          this.resultadoCarga = 2;
        }
				/*if(this.respuestaImagenEnviada <= 1){
					console.log("Error en el servidor"); 
				}else{
        }*/
        console.log(this.resultadoCarga);
			},
			error => {
				console.log("ERROR Carga de Imagen--> "+<any>error);
			}

		);//FIN DE METODO SUBSCRIBE
  }

  registrarPregunta() {
    if (this.id_pregunta != 0) {//Fue ediada, entonces la borro de la tabla
      this.quitarPregunta(this.pregunta);
    }
    if (this.respuestas.length > 0 && this.descrip_pregunta.length > 0) {
      this.pregunta = null;
      this.pregunta = {
        id_pregunta: this.id_pregunta,
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
          imagen: this.nombreImagen
        }
        this.preguntas.push(this.pregunta);
        alert('Pregunta registrada satisfactoriamente.');
        //TODO invocar metodo para guardar respuestas
        this.guardarRespuestas();
        this.guardarImagen();
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
      console.log(this.id_pregunta+"R"+(i+1));
    }
      console.log('guardarRespuestas():');
      console.log(this.respuestas);
      this._respuService.postRespuestas(this.respuestas).subscribe(res => {
        if (res['estado'] == 1) {
          mensaje = res['mensaje'];
          alert(mensaje);
          this.dialogRef.close(this.pregunta);
        }
      });
    
    //console.log(this.respuestas);
    
  }

  editarPregunta(id_preg:number, desc_preg:string) {
    this.area_select = this.id_area;
    this.tema_select = this.id_tema;
    if (id_preg > 0) {
      this._respuService.getRespuestas(id_preg)
        .subscribe(res => {
          if (res['estado']==111) {
            
            this.respuestas = null;
            this.respuestas = res['datos'];
            this.descrip_pregunta = desc_preg;
            this.id_pregunta = id_preg;
          }
    });
    console.log('editarPregunta(): '+this.respuestas);
    }
    
  }

  limpiar() {
    this.respuestas.splice(0, this.respuestas.length);
    this.descrip_pregunta = "";
  }

  quitarPregunta(pre:DialogDataPreguntas){
    var index = this.preguntas.indexOf(pre);
    this.preguntas.splice(index, 1);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
