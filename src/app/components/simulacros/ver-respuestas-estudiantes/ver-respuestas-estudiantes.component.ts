import { Component, OnInit } from '@angular/core';
import { Preguntas } from '../../../modelos/Preguntas';
import { Respuestas } from '../../../modelos/Respuestas';
import { PreguntasService } from '../../../services/preguntas.service';
import { NavbarEstudiantesService } from '../../../services/navbar-estudiantes.service';
import { SimulacrosService } from '../../../services/simulacros.service';
import { MatRadioChange, MatRadioButton } from '@angular/material/radio/';

@Component({
  selector: 'app-ver-respuestas-estudiantes',
  templateUrl: './ver-respuestas-estudiantes.component.html',
  styleUrls: ['./ver-respuestas-estudiantes.component.css']
})
export class VerRespuestasEstudiantesComponent implements OnInit {

  simulacro: any=[];
  preguntas: Preguntas[]=[];
  respuestas:Respuestas[]=[];
  estudiante_respuesta: any[]=[];

  data: any=[];
  constructor(private _preguntasService:PreguntasService,
    private _simulacroService: SimulacrosService,
    private _navBarEstudiantesService: NavbarEstudiantesService) { }

  ngOnInit() {

    this.data= this._navBarEstudiantesService.getData();
    // console.log("se o"+ this.estudiante.nombre);

    if(this.data.id_examen !=null){
      this.cargarRespuestasEstudiante(this.data.id_simulacro,this.data.id_estudiante);
    }
    else
    {
      alert("No se encontraron datos del simulacro");
    }
  
  
  }

  change(event: MatRadioChange, index: number)
  {
    //console.log("index="+index+ "- " +event.value +" - "+ this.estudiante_respuesta[index].id_respuesta);

    if(event.value != this.estudiante_respuesta[index].id_respuesta)
    {
      let mrButton: MatRadioButton = event.source;
      
      mrButton.checked=false;
      //event.source.radioGroup.selected=false;
    }
  }
  cargarPreguntas(id_examen: number): void {
    //console.log("mostrando...");
    this._preguntasService.getPreguntas(id_examen)
      .subscribe((res) => {
       this.procesarDatos(res['datos']);
      },
      (err) => {
        alert(err);
      }
    );
  }
  cargarRespuestasEstudiante(id_simulacro: string, id_estudiante: string)
  {
    this._simulacroService.getRespuestasEstudiante(id_simulacro,id_estudiante)
    .subscribe((res) => { 
     this.estudiante_respuesta=res['datos'];
     this.cargarPreguntas(this.data.id_examen); 
    },
    (err) => {
      alert(err);
    }
  );

  }

  procesarDatos(data)
  {

    let id_pregunta=-1;
    let preguntas: Preguntas[]= new Array(data[0].numero_preguntas);

    let i=0;
    let last_i_pregunta=0;
    let last_i_respuesta=0;
    let numero_respuestas=data[0].numero_respuestas;
    let respuestas: Respuestas[]=new Array(numero_respuestas);
    for(let item of  data)
    {
      if(id_pregunta!=item.id_pregunta){

        id_pregunta=item.id_pregunta;
        preguntas[last_i_pregunta]=new Preguntas(item.id_pregunta,item.desc_pregunta,item.id_tem,item.imagen,null);
        
        if(i != 0)
        {
          preguntas[last_i_pregunta-1].respuestas=respuestas;
          respuestas=new Array(item.numero_respuestas);
          last_i_respuesta=0;
        }
        last_i_pregunta++;
      }
      respuestas[last_i_respuesta]=
      new Respuestas(item.id_respuesta,item.desc_respuesta,item.correcta);
    
      last_i_respuesta++;  
      

      i++;
    }
    preguntas[last_i_pregunta-1].respuestas=respuestas;
    this.preguntas=preguntas;
    
  }

}
