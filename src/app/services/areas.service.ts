import { Injectable } from '@angular/core';
import { Areas } from '../modelos/Areas';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AreasService {

  url = 'http://localhost/WEBSimulac/src/app/api/';
  constructor(private http: HttpClient) { }

  
  getAreas() {
    return this.http.get(`${this.url}areas`);
  }
  postArea(area: Areas) {


    return this.http.post(`${this.url}areas/registro`, JSON.stringify(area))
                    .pipe(
                      map(res => {
                        if (!res) {
                          throw new Error('Value expected!');
                        }
                        return res;
                      })
                    );

  }
  editarArea(area: Areas) {


    return this.http.post(`${this.url}areas/editar`, JSON.stringify(area))
                    .pipe(
                      map(res => {
                        if (!res) {
                          throw new Error('Value expected!');
                        }
                        return res;
                      })
                    );

  }

  eliminarArea(id: string) {
    return this.http.get(`${this.url}areas/eliminar/` + id);
  }

  getBuscarArea(dato: string) {
    return this.http.get(`${this.url}areas/` + dato);
  }

}
