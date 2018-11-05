import { Component, OnInit,Input, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SimulacrosService } from '../../../services/simulacros.service';
import { Router } from '@angular/router';
import { Simulacros } from '../../../modelos/Simulacros';
import {Estudiantes} from '../../../modelos/Estudiantes';
import { StorageServiceE } from 'src/app/services/storageE.service';

@Component({
  selector: 'app-estudiantes-simulacro',
  templateUrl: './estudiantes-simulacro.component.html',
  styleUrls: ['./estudiantes-simulacro.component.css']
})
export class EstudiantesSimulacroComponent implements OnInit {
  
  @Output() emitEvent:EventEmitter<string> = new EventEmitter<string>();
  id_examen: string="";
  estudiante: Estudiantes;

  simulacros;
  error = '';
  success = '';

  constructor(private _simulacroService: SimulacrosService, 
    private _router: Router,private storageService: StorageServiceE
    ) { }

  ngOnInit() {
    //console.log("stu "+this.estudiante.nombre);
   this.estudiante= this.storageService.getCurrentUser();
     // console.log("se o"+ this.estudiante.nombre);
 
     if(this.estudiante.id_estudiante != null){
    this.cargarSimulacros();
     }
     else
     {
       alert("No se encontro el estudiante");
     }
  }

  cargarSimulacros(): void {
    this._simulacroService.getSimulacrosActivos(this.estudiante.id_estudiante)
      .subscribe((res) => {
        this.simulacros = res['datos'];
        //console.log(res['datos'][0]);
        if(res['datos'][0] == null)
        {
          alert("No tiene simulacros por realizar");
        }
      },
      (err) => {
        this.error = err;
        console.log("error:::"+this.error['message']);
      }
    );
  }

  realizarSimulacro(simulacro: Simulacros)
  {
    this.id_examen=simulacro.id_examen;
    this._router.navigate(['/estudiantes/simulacros',simulacro.id_simulacro]);
  }

}
