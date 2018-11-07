import { Component, OnInit } from '@angular/core';
import { EstudiantesService } from '../../services/estudiantes.service';
import { Router } from '@angular/router';
import { Estudiantes } from '../../modelos/Estudiantes';
import { NgForm } from '@angular/forms';
import {MatDialog, MatDialogRef, MatSnackBar} from '@angular/material';
import { EditarEstudianteComponent } from './editarestudiante/editar-estudiante.component';


@Component({
  selector: 'app-estudiantes',
  templateUrl: './estudiantes.component.html',
  styles: []
})
export class EstudiantesComponent implements OnInit {

  estudiantes;
  estudiante: Estudiantes = null;
  datoBuscar: string;
  
  error = '';
  success = '';

  constructor(private _estudiantesService: EstudiantesService, private _router: Router,
    public snackBar: MatSnackBar,
              public dialog: MatDialog) { }

  ngOnInit() {
    this.mostrarTodos();
    this.estudiante = new Estudiantes( '' ,  '' , '' , 'Sexo' );
    this.datoBuscar='';
  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
 
  mostrarTodos(): void {
    this._estudiantesService.getEstudiantes()
      .subscribe((res) => {
        this.estudiantes = res['datos'];
      },
      (err) => {
        this.error = err;
      }
    );
  }

  registrar() {


    if (this.estudiante.id_estudiante != '' && this.estudiante.nombre != '' && this.estudiante.programa !='') {
    if (this.estudiante.sexo !== 'Sexo') {

      this.estudiante.programa = this.estudiante.programa.toUpperCase();
    this._estudiantesService.postEstudiantes(this.estudiante).subscribe(datos => {
      if (datos['estado'] == 1) {
        this.openSnackBar(datos['mensaje'],'Aceptar');
        this.mostrarTodos();
      } else if (datos['estado'] == 23000) {
        this.openSnackBar('El estudiante ya se encuentra registrado','Aceptar');

      }       else {
        this.openSnackBar('No guardado','Aceptar');

      }

    });
  }  else {
    this.openSnackBar('Seleccione el sexo','Aceptar');

    
  }
  } else {
    this.openSnackBar('Faltan datos por llenar','Aceptar');
  }
  }

  
  eliminarEstudiante(estudiante: Estudiantes): void {
    if(confirm('¿Desea eliminar este estudiante: '+estudiante.nombre+' ?')){
    this._estudiantesService.eliminarEstudiante(estudiante.id_estudiante)
      .subscribe((res) => {
    this.openSnackBar(res['mensaje'],'Aceptar');

        this.mostrarTodos();
      },
      (err) => {
        this.error = err;
      }
    );
    }
  }

  
  editarEstudiante(estudiante: Estudiantes)
  {
    const dialogRef = this.dialog.open(EditarEstudianteComponent, {
      panelClass: 'my-panel',
      width: '350px',
      data: estudiante
    });
      dialogRef.afterClosed().subscribe(result => {

      if ( !result ) {
       
        return;
      }
      let est: Estudiantes;
      est= new Estudiantes(result.id_estudiante,result.nombres,result.programa,result.sexo);
     est.programa= est.programa.toUpperCase();

      this._estudiantesService.editarEstudiantes(est).subscribe(datos => {
        if (datos['estado'] == 1) {
          this.openSnackBar(datos['mensaje'],'Aceptar');
          this.mostrarTodos();
        } else {
          this.openSnackBar('No guardado','Aceptar');

        }
  
      });
      
      });
  }
  

  buscarEstudiante() {
    this._estudiantesService.getBuscarEstudiantes(this.datoBuscar).subscribe((res)=> {
      this.estudiantes = res['datos'];
    },
    (err) => {
      this.error = err;
    
    }
    );
  }

}
