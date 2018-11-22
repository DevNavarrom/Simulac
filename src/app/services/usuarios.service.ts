import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Usuarios, ILogin } from './../modelos/Usuarios';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  url = 'http://localhost/WEBSimulac/src/app/api/';
  //url = 'http://localhost/WEBSimulacro/api/';

  usuarios:Usuarios[];
  constructor(private http:HttpClient) { }

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
}
