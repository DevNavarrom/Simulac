import { Injectable } from '@angular/core';
import { Preguntas, DialogDataPreguntas } from '../modelos/Preguntas';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http } from '@angular/http';
import { ConfigService } from './config.service';
// import{map,catchError}from'rxjs/operators';
// import 'rxjs/Rx';



@Injectable({
  providedIn: 'root'
})
export class PreguntasService {


  
  url = '' ;
  //url = 'http://localhost/WEBSimulacro/api/'+ this.tabla;
  constructor(private http: HttpClient,private cs:ConfigService) {  this.url=cs.getUrlAPI()+"preguntas";}


  getPreguntas(id_examen: number) {
    return this.http.get(`${this.url}/examen/` + id_examen);
  }

  getPreguntasExamen(id_examen: number) {
    return this.http.get(`${this.url}/idexamen/` + id_examen);
  }

  getPreguntasAreaTema(datos: any) {

    return this.http.post(`${this.url}/buscar`, JSON.stringify(datos))
    .pipe(
      map(res => {
        if (!res) {
          throw new Error('Value expected!');
        }
        return res;
      })
    );

  }


  postPreguntas(pregunta: DialogDataPreguntas) {

    console.log(`${this.url}/registro`);

    return this.http.post(`${this.url}/registro`, JSON.stringify(pregunta))
      .pipe(
        map(res => {
          if (!res) {
            throw new Error('Value expected!');
          }
          return res;
        })
      );

  }

  getPreguntasPorTema(id: string) {
    return this.http.get(`${this.url}/tema/` + id);
  }

  eliminarPregunta(id: number) {
    return this.http.get(`${this.url}/eliminar/` + id);
  }
}
