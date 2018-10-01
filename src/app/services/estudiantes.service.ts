import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Estudiantes } from '../modelos/Estudiantes';
import { Http } from '@angular/http';
//import { map, catchError } from 'rxjs/operators';
//import 'rxjs/Rx';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class EstudiantesService {

  private estudiante:Estudiantes = null;
  estudiantes:Estudiantes[];

  url = 'http://localhost/WEBSimulac/src/app/api/';

  constructor(private http:HttpClient) { }

  getEstudiantes(){
    return this.http.get(`${this.url}estudiantes`);
  }

  postEstudiantes(estudiante:Estudiantes){
    let headers = new HttpHeaders({'Content-Type':'application/json'});
    console.log(JSON.stringify(estudiante)+{headers});
    return this.http.post(`${this.url}estudiantes/registro`, JSON.stringify(estudiante))
                    .pipe(
                      map(res => {
                        if (!res) {
                          throw new Error('Value expected!');
                        }
                        return res;
                      })
                    );
                    
  }

  getPorId(id:string){
    return this.http.get(`${this.url}estudiantes/`+id);
  }

  /*private handleError(error:HttpErrorResponse){
    return throwError('ERROR! Something went wrong.');
  }*/
}

/*export interface Estudiantes{
  id:string;
  nombre:string;
  grupo:string;
  sexo:string;
}*/