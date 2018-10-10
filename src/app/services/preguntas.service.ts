import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Preguntas } from '../modelos/Preguntas';
import { Http } from '@angular/http';
// import{map,catchError}from'rxjs/operators';
// import 'rxjs/Rx';
import { map } from 'rxjs/operators';


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

 }
