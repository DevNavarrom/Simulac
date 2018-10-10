import { Component, OnInit, Input } from '@angular/core';
import { Preguntas } from '../../../modelos/Preguntas';
import { Respuestas } from '../../../modelos/Respuestas';
import {FormControl} from '@angular/forms';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { PreguntasService } from '../../../services/preguntas.service';

@Component({
  selector: 'app-preguntas-simulacro',
  templateUrl: './preguntas-simulacro.component.html',
  styleUrls: ['./preguntas-simulacro.component.css']
})
export class PreguntasSimulacroComponent implements OnInit {

  @Input() dataShared:string;
  
  selected = new FormControl(0);
  preguntas: Preguntas[];
  respuestas:Respuestas[];
  num_preguntas:number;
  index_tab:number=0;
  id_respuesta: string;//respuesta de una pregunta en expecifico
  btn_mensaje: string;
  error = '';
  success = '';
 
 /* addTab() {
    this.num_preguntas++;
    this.tabs.push('New');
   
      this.selected.setValue(this.tabs.length - 1);
    
  }
  */
  
  constructor(private _preguntasService: PreguntasService) { }

  nextTab()
  {
      if(this.preguntas.length >= (this.index_tab+1)) {
    this.selected.setValue(this.index_tab+1);
    }
  }
  previousTab()
  {
      if(this.index_tab-1>=0) {
    this.selected.setValue(this.index_tab-1);
    }
  }
  ngOnInit() {

    console.log("data shared: "+this.dataShared);
    this.mostrarPreguntas();
    /*
    this.btn_mensaje="Siguiente";
    this.num_preguntas=0;
    let re1 =new Respuestas("R12","21",false);
    let re2 =new Respuestas("R13","4",true);
    let re3 =new Respuestas("R14","0",false);
    let re4 =new Respuestas("R15","5",false);
    let res= [re1,re2,re3,re4];  
    let pre= new Preguntas(23,"¿Cual es el valor de este array en la posición [3]?","2313","vector.png",res);


    let a =new Respuestas("0","Si",false);
    let b =new Respuestas("2","No",true);
  
    let res2= [a,b];
    let pre2= new Preguntas(23,"Un array es dimamico?","2313","",res2);
    this.preguntas=[pre,pre2,pre2];
   this.num_preguntas=this.preguntas.length;
   */
    
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

  mostrarPreguntas(): void {
    //console.log("mostrando...");
    this._preguntasService.getPreguntas(1)
      .subscribe((res) => {
       // this.estudiantes = res['datos'];
       this.procesarDatos(res['datos']);
      },
      (err) => {
        this.error = err;
      }
    );
  }
  procesarDatos(data)
  {

    let id_pregunta=-1;
   
    this.num_preguntas=data[0].numero_preguntas;
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
