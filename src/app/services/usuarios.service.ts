import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Usuarios, ILogin } from './../modelos/Usuarios';
import { map } from 'rxjs/operators';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  url ='' ;
  //url = 'http://localhost/WEBSimulacro/api/';

  usuarios:Usuarios[];
  constructor(private http:HttpClient,private cs:ConfigService) {

    this.url=cs.getUrlAPI();
   }

  login(uLogin:Usuarios) {
    return this.http.post(`${this.url}usuarios/login`, JSON.stringify(uLogin))
                    .pipe(
                      map(res => {
                        if (!res) {
                          throw new Error('Value expected!');
                        }
                        return res;
                      })
                    );
  }

  postDocente(docente) {
    // let headers = new HttpHeaders({'Content-Type': 'application/json'});
    // console.log(JSON.stringify(estudiante)+{headers});

    return this.http.post(`${this.url}usuarios/registro`, JSON.stringify(docente))
                    .pipe(
                      map(res => {
                        if (!res) {
                          throw new Error('Value expected!');
                        }
                        return res;
                      })
                    );

  }
}
