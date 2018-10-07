import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: []
})
export class NavbarComponent implements OnInit {

  idUsuario:string;

  constructor(private _activatedRoute:ActivatedRoute) { 
    /*this._activatedRoute.params.subscribe( params => {
      console.log(params['id']);
      this.idUsuario = params['id'];
    });*/
  }

  ngOnInit() {
  }

}
