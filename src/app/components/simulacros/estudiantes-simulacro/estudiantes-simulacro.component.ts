import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SimulacrosService } from '../../../services/simulacros.service';
import { Router } from '@angular/router';
import { Simulacros } from '../../../modelos/Simulacros';

@Component({
  selector: 'app-estudiantes-simulacro',
  templateUrl: './estudiantes-simulacro.component.html',
  styleUrls: ['./estudiantes-simulacro.component.css']
})
export class EstudiantesSimulacroComponent implements OnInit {
  
  @Output() emitEvent:EventEmitter<string> = new EventEmitter<string>();
  id_examen: string="";

  simulacros;
  error = '';
  success = '';

  constructor(private _simulacroService: SimulacrosService, private _router: Router) { }

  ngOnInit() {
    this.cargarSimulacros();
  }

  cargarSimulacros(): void {
    this._simulacroService.getSimulacrosActivos()
      .subscribe((res) => {
        this.simulacros = res['datos'];
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
    console.log("id examen= "+this.id_examen);
    this._router.navigate(['/estudiantes/simulacros/preguntas']);
  }

}
