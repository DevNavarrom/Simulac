import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SimulacrosService } from '../../services/simulacros.service';
import { Router } from '@angular/router';
import { Simulacros } from '../../modelos/Simulacros';

@Component({
  selector: 'app-estudiantes-simulacro',
  templateUrl: './estudiantes-simulacro.component.html',
  styleUrls: ['./estudiantes-simulacro.component.css']
})
export class EstudiantesSimulacroComponent implements OnInit {
  
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

}
