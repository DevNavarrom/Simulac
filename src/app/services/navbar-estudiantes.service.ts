import { Injectable ,Output, EventEmitter} from '@angular/core';
import { Estudiantes } from '../modelos/Estudiantes'

@Injectable({
  providedIn: 'root'
})
export  class NavbarEstudiantesService {

  static estudiante: Estudiantes;
  static datosSimulacroEstudiante: any;

  @Output() change: EventEmitter<Estudiantes> = new EventEmitter();
  

  getData()
  {
    //console.log(NavbarEstudiantesService.datosSimulacroEstudiante);
    return NavbarEstudiantesService.datosSimulacroEstudiante;
  }
  getEstudiante()
  {
   // this.change.emit(this.estudiante);
   return NavbarEstudiantesService.estudiante;
  }
  setEstudiante(estudiante: Estudiantes)
  {
    NavbarEstudiantesService.estudiante= estudiante;
  }
  setData(data: any)
  {
    //console.log(data);
    NavbarEstudiantesService.datosSimulacroEstudiante=data;
  }

  constructor() { }
}
