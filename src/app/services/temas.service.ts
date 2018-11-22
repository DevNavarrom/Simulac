import { Injectable } from '@angular/core';
import { Temas } from '../modelos/Temas';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TemasService {


  tabla='temas';
  url = 'http://localhost/WEBSimulac/src/app/api/'+this.tabla;
  //url = 'http://localhost/WEBSimulacro/api/'+ this.tabla;
  constructor(private http: HttpClient) { }

  
  getTemas() {
    return this.http.get(`${this.url}`);
  }
  postTema(tema: Temas) {


    return this.http.post(`${this.url}/registro`, JSON.stringify(tema))
                    .pipe(
                      map(res => {
                        if (!res) {
                          throw new Error('Value expected!');
                        }
                        return res;
                      })
                    );

  }
  editarTema(tema: Temas) {


    return this.http.post(`${this.url}/editar`, JSON.stringify(tema))
                    .pipe(
                      map(res => {
                        if (!res) {
                          throw new Error('Value expected!');
                        }
                        return res;
                      })
                    );

  }

  eliminarTema(tema: Temas) {

    
    return this.http.post(`${this.url}/eliminar`, JSON.stringify(tema))
                    .pipe(
                      map(res => {
                        if (!res) {
                          throw new Error('Value expected!');
                        }
                        return res;
                      })
                    );
  }

  getBuscarTema(dato: string) {
    return this.http.get(`${this.url}/` + dato);
  }

}
