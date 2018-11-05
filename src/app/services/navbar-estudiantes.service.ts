import { Injectable ,Output, EventEmitter} from '@angular/core';
import { Estudiantes } from '../modelos/Estudiantes'

@Injectable({
  providedIn: 'root'
})
export  class NavbarEstudiantesService {

  static datosSimulacroEstudiante: any;

  @Output() change: EventEmitter<Estudiantes> = new EventEmitter();
  

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
