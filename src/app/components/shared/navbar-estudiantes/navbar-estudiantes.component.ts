import { Component, OnInit,Input } from '@angular/core';
import { Estudiantes } from '../../../modelos/Estudiantes';
import { NavbarEstudiantesService } from '../../../services/navbar-estudiantes.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar-estudiantes',
  templateUrl: './navbar-estudiantes.component.html',
  styleUrls: ['./navbar-estudiantes.component.css']
})
export class NavbarEstudiantesComponent implements OnInit {

  ruta: string="Estudiantes";
  @Input ('estudiante') estudiante: Estudiantes;
  constructor(private _navbarService: NavbarEstudiantesService,
    private _router:Router) { }

  ngOnInit() {
    //console.log("id: "+this.estudiante.nombre);
    this._navbarService.setEstudiante(this.estudiante);
  }

  mostrarDatosEstudiante()
  {
    this._router.navigate(['/estudiantes/datos']);
  }
  cambiarNombreToolbar(ruta: string)
  {
this.ruta="Estudiantes"+ruta;
  }


}
