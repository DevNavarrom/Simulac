import { Injectable } from '@angular/core';
import { Areas } from '../modelos/Areas';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
//import * as data  from './../../../configHostServer.json';


@Injectable({
  providedIn: 'root'
})
export class AreasService {

  //url = '';
  url = 'http://localhost/WEBSimulac/src/app/api/';
  //url = 'http://localhost/WEBSimulacro/api/';
  host:String = "";
  private _host = './WEBSimulac/src/assets/configHostServer.json';   

    getHost() {
            return this.http.get(this._host).pipe(
              map(response => {
                return response;
              })
            ).subscribe((res) => {
              this.host = res['host'];
            }

            );
    }

  constructor(private http: HttpClient) {
    /*this.getHost();
    this.url = 'http://'+this.host+'/WEBSimulac/src/app/api/';*/
  }

  
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
