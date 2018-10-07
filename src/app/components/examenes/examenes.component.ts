import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-examenes',
  templateUrl: './examenes.component.html',
  styles: []
})
export class ExamenesComponent implements OnInit {

  constructor( private _router:Router ) { }

  ngOnInit() {
  }

  editarExamen(){
    //TODO pedir por parametro el id del examen seleccionado en la tabla para el caso de edicion, si es nuevo 0
    this._router.navigate(['/examen', 0]);
  }

}
