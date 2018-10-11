import { Injectable ,Output, EventEmitter} from '@angular/core';
import { Estudiantes } from '../modelos/Estudiantes'

@Injectable({
  providedIn: 'root'
})
export  class NavbarEstudiantesService {

  static estudiante: Estudiantes;

  @Output() change: EventEmitter<Estudiantes> = new EventEmitter();

  getEstudiante()
  {
   // this.change.emit(this.estudiante);
   return NavbarEstudiantesService.estudiante;
  }
  setEstudiante(estudiante: Estudiantes)
  {
    NavbarEstudiantesService.estudiante= estudiante;
   //console.log(NavbarEstudiantesService.estudiante);
  }

  constructor() { }
}
