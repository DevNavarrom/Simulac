import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  urlP = 'https://juanmar021-websimulac.herokuapp.com';
  urlD = 'http://localhost/WebSimulac/Api/v1/';

  urlAPI = this.urlD;
  constructor() { }

  
  getUrlAPI() {
    return this.urlAPI;
  }
  
}
