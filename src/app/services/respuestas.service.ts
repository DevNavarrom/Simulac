import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { IRespuestas } from '../modelos/Respuestas';
import { map } from 'rxjs/operators';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class RespuestasService {

  url = '' ;
  //url = 'http://localhost/WEBSimulacro/api/'+ this.tabla;
  constructor( private http:HttpClient ,private cs:ConfigService) {
    this.url=cs.getUrlAPI()+"respuestas";
   }

  postRespuestas( respuesta:IRespuestas[] ){
    return this.http.post(`${this.url}/registro`, JSON.stringify(respuesta))
      .pipe(
        map(res => {
          if (!res) {
            throw  new Error('Valor esperado');
          }
          return res;
        }
        )
      );
  }

  editarRespuestas( respuesta:IRespuestas[] ){
    return this.http.post(`${this.url}/editar`, JSON.stringify(respuesta))
      .pipe(
        map(res => {
          if (!res) {
            throw  new Error('Valor esperado');
          }
          return res;
        }
        )
      );
  }

  getRespuestas( id_pregunta:number ) {
    return this.http.get(`${this.url}/` + id_pregunta);
  }
  
}
