import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { IExamen, IDetalleExamen } from '../modelos/Examen';

@Injectable({
  providedIn: 'root'
})
export class ExamenesService {

  tabla: string = "examen";
  url = 'http://localhost/WEBSimulac/src/app/api/' + this.tabla

  constructor(private http:HttpClient) { }

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

  postDetalleExamen(detalle:IDetalleExamen) {
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

  public postFileImagen(imagenParaSubir: File){

		const formData = new FormData(); 
		formData.append('imagenPropia', imagenParaSubir, imagenParaSubir.name);
		return this.http.post(`${this.url}/cargarImagen`, formData);

	}

  deleteExamen(id: number) {
    return this.http.get(`${this.url}/eliminar/` + id);
  }

}
