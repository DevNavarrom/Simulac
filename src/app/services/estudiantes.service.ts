import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Estudiantes } from '../modelos/Estudiantes';
import { Http } from '@angular/http';
// import{map,catchError}from'rxjs/operators';
// import 'rxjs/Rx';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class EstudiantesService {

  private estudiante: Estudiantes = null;
  estudiantes: Estudiantes[];

  url = 'http://localhost/WEBSimulac/src/app/api/';
  //url = 'http://localhost/WEBSimulacro/api/';

  constructor(private http: HttpClient) { }

  getEstudiantes() {
    return this.http.get(`${this.url}estudiantes`);
  }

  getEstudiante(id: string) {
    return this.http.get(`${this.url}estudiantes/buscar/`+id);
  }

  postEstudiantes(estudiante: Estudiantes) {
    // let headers = new HttpHeaders({'Content-Type': 'application/json'});
    // console.log(JSON.stringify(estudiante)+{headers});

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
  editarEstudiantes(estudiante: Estudiantes) {
   

    return this.http.post(`${this.url}estudiantes/editar`, JSON.stringify(estudiante))
                    .pipe(
                      map(res => {
                        if (!res) {
                          throw new Error('Value expected!');
                        }
                        return res;
                      })
                    );

  }

  getBuscarEstudiantes(dato: string) {
    return this.http.get(`${this.url}estudiantes/` + dato);
  }

  eliminarEstudiante(id: string) {
    return this.http.get(`${this.url}estudiantes/eliminar/` + id);
  }
 }
