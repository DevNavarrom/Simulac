import { Component, OnInit,Input } from '@angular/core';
import { Estudiantes } from '../../../modelos/Estudiantes';
import { NavbarEstudiantesService } from '../../../services/navbar-estudiantes.service';

@Component({
  selector: 'app-navbar-estudiantes',
  templateUrl: './navbar-estudiantes.component.html',
  styleUrls: ['./navbar-estudiantes.component.css']
})
export class NavbarEstudiantesComponent implements OnInit {

  @Input ('estudiante') estudiante: Estudiantes;
  constructor(private _navbarService: NavbarEstudiantesService) { }

  ngOnInit() {
    //console.log("id: "+this.estudiante.nombre);
    this._navbarService.setEstudiante(this.estudiante);
  }

}
