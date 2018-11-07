import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: []
})
export class NavbarComponent implements OnInit {

  idUsuario:string;
  ruta:String="";

  constructor(private _activatedRoute:ActivatedRoute,
    private storageService: StorageService,private _router:Router,title: Title) { 
    /*this._activatedRoute.params.subscribe( params => {
      console.log(params['id']);
      this.idUsuario = params['id'];
    });*/

    title.setTitle('Web Simulac');

  }

  public isLoggedIn() {
    return this.storageService.isAuthenticated();
  }
  public logout(): void{
   this.storageService.logout();
  // this.ngOnInit();
    window.location.reload();
  }
  cambiarRuta(dato:String)
  {
this.ruta="Docentes > "+dato;
  }
  public estudiantes()
  {
    this._router.navigate(['/estudiantes']);
  }
  ngOnInit() {
  }

}
