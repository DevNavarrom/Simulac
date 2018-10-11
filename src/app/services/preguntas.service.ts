import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Preguntas, DialogDataPreguntas } from '../modelos/Preguntas';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PreguntasService {

  tabla:string = 'preguntas';
  url = 'http://localhost/WEBSimulac/src/app/api/'+this.tabla;

  constructor(private http:HttpClient) { }

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
