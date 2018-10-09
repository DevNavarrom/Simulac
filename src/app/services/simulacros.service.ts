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

  getSimulacrosActivos() {
    return this.http.get(this.url+'/activos/');
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
  editarSimulacro(simulacro: Simulacros) {
   

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
 }
