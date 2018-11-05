import { Component, OnInit,Input } from '@angular/core';
import { Estudiantes } from '../../../../modelos/Estudiantes';
import { Router } from '@angular/router';
import { StorageServiceE } from 'src/app/services/storageE.service';

@Component({
  selector: 'app-navbar-estudiantes',
  templateUrl: './navbar-estudiantes.component.html',
  styleUrls: ['./navbar-estudiantes.component.css']
})
export class NavbarEstudiantesComponent implements OnInit {

  ruta: string="Estudiantes";

   nombres:String="";
  constructor(private storageService: StorageServiceE,
    private _router:Router) { }

  ngOnInit() {
    //console.log("id: "+this.estudiante.nombre);
    this.nombres=this.storageService.getCurrentUser().nombre;
    this._router.navigate(['/estudiantes/simulacros']);

  }
  public isLoggedIn() {
    return this.storageService.isAuthenticated();
  }
  mostrarDatosEstudiante()
  {
    this._router.navigate(['/estudiantes/datos']);
  }
  cambiarNombreToolbar(ruta: string)
  {
this.ruta="Estudiantes"+ruta;
  }
  public logout(): void{
    console.log("logout");
   this.storageService.logout();
  // this.ngOnInit();
    
  }

}
