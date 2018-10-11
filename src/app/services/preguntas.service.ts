import { Injectable } from '@angular/core';
<<<<<<< HEAD
import { HttpClient } from '@angular/common/http';
import { Preguntas, DialogDataPreguntas } from '../modelos/Preguntas';
import { map } from 'rxjs/operators';
=======
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Preguntas } from '../modelos/Preguntas';
import { Http } from '@angular/http';
// import{map,catchError}from'rxjs/operators';
// import 'rxjs/Rx';
import { map } from 'rxjs/operators';


>>>>>>> d51c35aa317df4678bfd5c4c665eab5c7dfd1e1b

@Injectable({
  providedIn: 'root'
})
export class PreguntasService {


    tabla: string="preguntas";
  url = 'http://localhost/WEBSimulac/src/app/api/'+this.tabla
  constructor(private http: HttpClient) { }

  
  getPreguntas(id_examen: number) {
    return this.http.get(`${this.url}/examen/`+id_examen);
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
    return this.http.get(`${this.url}/tema/`+id);
  }
}