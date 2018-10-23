import { Component, OnInit,Inject } from '@angular/core';
import {  MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { FormBuilder, FormGroup } from '@angular/forms';
import { SimulacrosService } from '../../../services/simulacros.service';
import { Router } from '@angular/router';
import { NavbarEstudiantesService } from '../../../services/navbar-estudiantes.service';


@Component({
  selector: 'app-ver-detalles-simulacro',
  templateUrl: './ver-detalles-simulacro.component.html',
  styleUrls: ['./ver-detalles-simulacro.component.css']
})
export class VerDetallesSimulacroComponent implements OnInit {

  resultados: any[]=[];
  simulacro: any;
  datoBuscar: string ="";
  constructor(public dialogRef: MatDialogRef<VerDetallesSimulacroComponent>,
    private _simulacrosService: SimulacrosService,
    private _navBarService: NavbarEstudiantesService,
    private _router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any) { 
      this.simulacro=data;

      this.datoBuscar="";

        this.cargarDetalles();
      
    }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  cargarDetalles()
  {
    this._simulacrosService.getSimulacroDetalles(this.simulacro.id_simulacro,this.datoBuscar).subscribe(datos => {
      if (datos['estado'] == 111) {
        this.resultados=datos['datos'];
      } else {
        alert('Error al cargar los datos');
      }

    });

  }
  verRespuestas(est: any)
  {
    let datos=
    {
      id_estudiante: est.id_estudiante,
      nombre: est.nombre,
      calificacion: est.calificacion,
      preguntas_correctas: est.preguntas_correctas,
      fecha_presentacion: est.fecha,
      preguntas_totales: est.preguntas_totales,
      id_simulacro: this.simulacro.id_simulacro,
      id_examen: this.simulacro.id_examen,
      desc_examen: this.simulacro.desc_examen  

    }
    this._navBarService.setData(datos);

    this._router.navigate(['/simulacros/respuestas',this.simulacro.id_simulacro,est.id_estudiante]);
    this.onNoClick();
  }
}
