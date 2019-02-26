import { Component, OnInit, Input } from '@angular/core';
import { Preguntas } from '../../../modelos/Preguntas';
import { Respuestas } from '../../../modelos/Respuestas';
import {FormControl} from '@angular/forms';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { ActivatedRoute} from '@angular/router'
import { PreguntasService } from '../../../services/preguntas.service';
import { SimulacrosService } from '../../../services/simulacros.service';
import { Router } from '@angular/router';
import { Estudiantes } from '../../../modelos/Estudiantes';
import { StorageServiceE } from 'src/app/services/storageE.service';
import { MatSnackBar } from '@angular/material';


@Component({
  selector: 'app-preguntas-simulacro',
  templateUrl: './preguntas-simulacro.component.html',
  styleUrls: ['./preguntas-simulacro.component.css']
})
export class PreguntasSimulacroComponent implements OnInit {

  simulacro: any={};
  selected = new FormControl(0);
  preguntas: Preguntas[];
  respuestas:Respuestas[];
  respuestas_selected: string[];
  num_preguntas: number =0;
  num_respuestas: number =0;
  index_tab:number=0;
  id_respuesta: string;//respuesta de una pregunta en expecifico
  btn_mensaje: string;
  error = '';
  success = '';
  estudiante: Estudiantes;
 
 
  
  constructor(private _preguntasService: PreguntasService,
    private _activatedRouter: ActivatedRoute,
    private _simulacroService: SimulacrosService,
    public snackBar: MatSnackBar,

    private _router: Router,
    private storageService: StorageServiceE   ) { 

      this._activatedRouter.params.subscribe(params =>
        {
          this.cargarSimulacro(params['id']);
        })
    }

    radioSelected(id: string,index: number){
      if(this.respuestas_selected[index]== " "){this.num_respuestas++;}
      this.respuestas_selected[index]=id;
      

    }
  cargarSimulacro(id: string)
  {
    this._simulacroService.getBuscarSimulacro(id)
    .subscribe((res) => {
      this.simulacro = res['datos'][0];
      this.cargarPreguntas(this.simulacro.id_examen);
    },
    (err) => {
      this.error = err;
      console.log("error:::"+this.error['message']);
    }
  );
  }
  openSnackBar(message: string) {
    this.snackBar.open(message, 'Aceptar', {
      duration: 2000,
    });
  }
  
  nextTab()
  {
      if(this.preguntas.length >= (this.index_tab+1)) {
    this.selected.setValue(this.index_tab+1);
    }

    if(this.btn_mensaje=="Finalizar")
    {

      if(this.validarRespuestas())
      {
        this.finalizarSimulacro();
      }
    }
  }

  validarRespuestas(): boolean // valida que se hayan respondido todas las preguntas
{
  let j=-1;
  for(let i=0; i<this.respuestas_selected.length;i++)
  {
    if(this.respuestas_selected[i]==" ")
    {
      j=i;
      break;
    }
  }

  if(j != -1){

  this.openSnackBar('Faltan preguntas por responder');
  
      this.selected.setValue(j);
      return false;
  }
  else{
    return true;
  }

}
  previousTab()
  {

      if(this.index_tab-1>=0) {
        this.selected.setValue(this.index_tab-1);
        }
 
  }
  ngOnInit() {
    this.estudiante= this.storageService.getCurrentUser();
    // console.log("se o"+ this.estudiante.nombre);

    if(this.estudiante.id_estudiante == null){

      this.openSnackBar('No se encontro el estudiante');
    }
    
    
  }

  tabChanged = (tabChangeEvent: MatTabChangeEvent): void => {
    this.index_tab=tabChangeEvent.index;    
    if((this.preguntas.length-1)==tabChangeEvent.index)
    {
      this.btn_mensaje="Finalizar";
    }
    else
    {
      this.btn_mensaje="Siguiente";
    }

    
  }
  toJSON(id_simulacro: string,id_estu: string,respuestas: string []): any
  {
    let id_estudiante:number= parseInt( id_estu);
    let datos: any []= new Array(respuestas.length);
    for(let i=0;i< respuestas.length;i++)
    {
      datos[i]=
      {
        id_simulacro,
        id_estudiante,
        "id_respuesta":respuestas[i]
      };

    }
    return datos;
  }

  finalizarSimulacro()
  {
    
   
    if(confirm('¿Esta seguro que desea finalizar simulacro?')){
 

      this._simulacroService.getBuscarSimulacro(this.simulacro.id_simulacro)
      .subscribe((data)=>{


        if(data['datos'][0].estado=='ACTIVO')
        {

          
            if(this.estudiante.id_estudiante != null){
            let data=this.toJSON(this.simulacro.id_simulacro,this.estudiante.id_estudiante,this.respuestas_selected);
        
  
            this._simulacroService.postSimulacroRespuestas(data)
            .subscribe((res) => {
            this.openSnackBar(res['mensaje']);
            this._router.navigate(['/estudiantes/simulacros']);
  
            
            },
            (err) => {
            this.error = err;
            }
            );
        
            }
            else
            {
this.openSnackBar('No se encontró el estudiante, por favor vuelva a ingresar')  ;
          }
        }
        else
        {
          if(data['datos'][0].estado== "FINALIZADO")
          {
            this.openSnackBar('Tiempo excedido, el simulacro ya finalizó');

          }
          else{
          this.openSnackBar('El simulacro ha sido '+data['datos'][0].estado);
          }
        }

      },
      (err) => {
        this.error = err;
        alert(err);
      });

      }
      

  }

  cargarPreguntas(id_examen: number): void {
    //console.log("mostrando...");
    this._preguntasService.getPreguntas(id_examen)
      .subscribe((res) => {
       // this.estudiantes = res['datos'];
       this.procesarDatos(res['datos']);
      },
      (err) => {
        this.error = err;
      }
    );
  }
  inicializarRespuestas(lenght: number)
  {
    this.respuestas_selected= new Array(lenght);

    for(let i=0; i<lenght;i++)
    {
       this.respuestas_selected[i]=" ";
    }
  }
  procesarDatos(data)
  {

    let id_pregunta=-1;
   
    this.num_preguntas=data[0].numero_preguntas;
    this.inicializarRespuestas(this.num_preguntas);
    let preguntas: Preguntas[]= new Array(this.num_preguntas);
    
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
    //console.log("carga exitosa");

  }


}
