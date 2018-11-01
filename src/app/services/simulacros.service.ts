import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Simulacros } from '../modelos/Simulacros';
import { Http } from '@angular/http';
// import{map,catchError}from'rxjs/operators';
// import 'rxjs/Rx';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class SimulacrosService {


  recurso="simulacros";
  url = 'http://localhost/WEBSimulac/src/app/api/'+this.recurso;

  constructor(private http: HttpClient) { }

  getSimulacros() {
    return this.http.get(`${this.url}`);
  }
  getSimulacroDetalles(id_simulacro: string, dato: string) {
    return this.http.get(this.url+'/detalles/'+id_simulacro+'/'+dato);
  }

  getSimulacrosActivos(id_estudiante: string) {
    return this.http.get(this.url+'/activos/'+id_estudiante);
  }

  postSimulacro(simulacro: Simulacros) {
    // let headers = new HttpHeaders({'Content-Type': 'application/json'});
    // console.log(JSON.stringify(estudiante)+{headers});

    return this.http.post(`${this.url}/registro`, JSON.stringify(simulacro))
                    .pipe(
                      map(res => {
                        if (!res) {
                          throw new Error('Value expected!');
                        }
                        return res;
                      })
                    );

  }

  buscarSimulacros(datos: any) {
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
  postSimulacroRespuestas(respuestas) {
    // let headers = new HttpHeaders({'Content-Type': 'application/json'});
    // console.log(JSON.stringify(estudiante)+{headers});

    return this.http.post(`${this.url}/respuestas`, JSON.stringify(respuestas))
                    .pipe(
                      map(res => {
                        if (!res) {
                          throw new Error('Value expected!');
                        }
                        return res;
                      })
                    );

  }
  editarSimulacro(simulacro: any) {
   

    return this.http.post(`${this.url}/editar`, JSON.stringify(simulacro))
                    .pipe(
                      map(res => {
                        if (!res) {
                          throw new Error('Value expected!');
                        }
                        return res;
                      })
                    );

  }

  getBuscarSimulacro(dato: string) {
    return this.http.get(`${this.url}/` + dato);
  }

  eliminarSimulacro(id: string) {
    return this.http.get(`${this.url}/eliminar/` + id);
  }
  getRespuestasEstudiante(id_simulacro: string, id_estudiante: string) {
    return this.http.get(`${this.url}/respuestas/` + id_simulacro+ '/'+id_estudiante);
  }
 }
