import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { IExamen, IDetalleExamen } from '../modelos/Examen';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class ExamenesService {

  tabla: string = "examen";
  url = '' ;
  //url = 'http://localhost/WEBSimulacro/api/'+ this.tabla;

  constructor(private http:HttpClient,private cs:ConfigService) { 
    this.url=cs.getUrlAPI()+ this.tabla;
  }

  getExamenes() {
    return this.http.get(`${this.url}`);
  }
  buscarExamen(dato:String)
  {
    return this.http.get(`${this.url}`+'/buscar/'+dato);
  }

  getExamen (id:any) {
    return this.http.get(`${this.url}`+'/'+id);
  }

  postExamen(examen:IExamen) {
    return this.http.post(`${this.url}/registro`, JSON.stringify(examen))
      .pipe(
        map(res => {
          if (!res) {
            throw new Error('Value expected!');
          }
          return res;
        })
      );

  }

  postDetalleExamen(detalle:IDetalleExamen[]) {
    return this.http.post(`${this.url}/registroDetalle`, JSON.stringify(detalle))
      .pipe(
        map(res => {
          if (!res) {
            throw new Error('Value expected!');
          }
          return res;
        })
      );

  }
  postEditarDetalleExamen(detalle:IDetalleExamen[]) {
    return this.http.post(`${this.url}/editarDetalle`, JSON.stringify(detalle))
      .pipe(
        map(res => {
          if (!res) {
            throw new Error('Value expected!');
          }
          return res;
        })
      );

  }

  public postFileImagen(imagenParaSubir: File){

    
      const formData = new FormData(); 
      formData.append('imagenPropia', imagenParaSubir, imagenParaSubir.name);
      return this.http.post(`${this.url}/cargarImagen`, formData);
  

    
	
	}

  deleteExamen(id: any) {
    return this.http.get(`${this.url}/eliminar/` + id);
  }

}
