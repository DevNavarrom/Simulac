import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Preguntas } from '../modelos/Preguntas';

@Injectable({
  providedIn: 'root'
})
export class PreguntasService {

  tabla:string = 'preguntas';
  url = 'http://localhost/WEBSimulac/src/app/api/'+this.tabla;

  constructor(private http:HttpClient) { }

  getPreguntasPorTema(id: string) {
    return this.http.get(`${this.url}/tema/`+id);
  }
}
