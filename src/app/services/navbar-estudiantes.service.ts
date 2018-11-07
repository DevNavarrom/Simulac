import { Injectable ,Output, EventEmitter} from '@angular/core';
import { Estudiantes } from '../modelos/Estudiantes'

@Injectable({
  providedIn: 'root'
})
export  class NavbarEstudiantesService {

  static datosSimulacroEstudiante: any;
  public static ruta:String="";

  @Output() change: EventEmitter<Estudiantes> = new EventEmitter();
  

  getRuta()
  {
    return NavbarEstudiantesService.ruta;
  }
  setRuta(ruta: String)
  {
    NavbarEstudiantesService.ruta=ruta;
  }
  getData()
  {
    //console.log(NavbarEstudiantesService.datosSimulacroEstudiante);
    return NavbarEstudiantesService.datosSimulacroEstudiante;
  }
  
  setData(data: any)
  {
    //console.log(data);
    NavbarEstudiantesService.datosSimulacroEstudiante=data;
  }

  constructor() { }
}
