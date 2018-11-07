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

   public  ruta: String="";

   nombres:String="";
  constructor(private storageService: StorageServiceE,
    private _router:Router) { }

  ngOnInit() {
    //console.log("id: "+this.estudiante.nombre);
    this.nombres=this.storageService.getCurrentUser().nombre;
    this._router.navigate(['/estudiantes/simulacros']);
 this.ruta="Estudiantes > Simulacros";

  }
 
  public isLoggedIn() {
    return this.storageService.isAuthenticated();
  }
  mostrarDatosEstudiante()
  {
    this._router.navigate(['/estudiantes/datos']);
this.cambiarNombreToolbar("> Datos")

  }

  public cambiarNombreToolbar(dato: String )
  {
    this.ruta="Estudiantes "+dato;
  }

  public logout(): void{
   this.storageService.logout();
  // this.ngOnInit();
  window.location.reload();
    
  }

}
