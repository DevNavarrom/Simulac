import { Component, OnInit } from '@angular/core';
import { EstudiantesService } from '../../services/estudiantes.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Estudiantes } from '../../modelos/Estudiantes';
import { NgForm } from '@angular/forms';
//import "rxjs/Rx";

//import "rxjs/add/operator/map";
//import { Observable } from 'rxjs';
//import { map } from 'rxjs/operators';

@Component({
  selector: 'app-estudiantes',
  templateUrl: './estudiantes.component.html',
  styles: []
})
export class EstudiantesComponent implements OnInit {

  estudiantes;
  estudiante:Estudiantes = null;
  error = '';
  success = '';

  constructor(private _estudiantesService:EstudiantesService, private _router:Router) { }

  ngOnInit() {
    this.mostrarTodos();
    this.estudiante = new Estudiantes("1010", "Juancha Maria","1D","F");
  }

  mostrarTodos():void{
    //this._estudiantesService.mostrarTodos().subscribe(res => this.estudiantes = res);
    this._estudiantesService.getEstudiantes()
      .subscribe((res) => {
        this.estudiantes = res['datos'];
      },
      (err) => {
        this.error = err;
      }
    );
    
  }

  registrar(formest:NgForm){
    this._estudiantesService.postEstudiantes(this.estudiante).subscribe(datos => {
      console.log(datos);
      if (datos['mensaje']=='null') {
        alert(datos['mensaje']);
      }else {
        alert('No guardado');
      }
    });
    //this._estudiantesService.postEstudiantes(this.estudiante).map();
  }

  guardar(formest:NgForm){
    console.log(formest.value);
    console.log(this.estudiante);
  }

  buscarPorId(id:string){
    this._estudiantesService.getPorId(id).subscribe(res => this.estudiante = res[0]);
  }

}
