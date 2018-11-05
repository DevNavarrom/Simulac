import { Injectable } from '@angular/core';
import { Preguntas, DialogDataPreguntas } from '../modelos/Preguntas';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http } from '@angular/http';
// import{map,catchError}from'rxjs/operators';
// import 'rxjs/Rx';



@Injectable({
  providedIn: 'root'
})
export class PreguntasService {


  tabla: string = "preguntas";
  url = 'http://localhost/WEBSimulac/src/app/api/' + this.tabla
  constructor(private http: HttpClient) { }


  getPreguntas(id_examen: number) {
    return this.http.get(`${this.url}/examen/` + id_examen);
  }

  getPreguntasExamen(id_examen: number) {
    return this.http.get(`${this.url}/idexamen/` + id_examen);
  }

  getPreguntasAreaTema(area_tema: string) {
    return this.http.get(`${this.url}/areatema/` + area_tema);
  }


  postPreguntas(pregunta: DialogDataPreguntas) {


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
}
