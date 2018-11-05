import { Component, OnInit } from '@angular/core';
import { Estudiantes } from '../../../modelos/Estudiantes';
import { EstudiantesService } from '../../../services/estudiantes.service';
import { StorageServiceE } from 'src/app/services/storageE.service';

@Component({
  selector: 'app-estudiantes-datos',
  templateUrl: './estudiantes-datos.component.html',
  styleUrls: ['./estudiantes-datos.component.css']
})
export class EstudiantesDatosComponent implements OnInit {

  estudiante: Estudiantes;
  constructor(private storageService: StorageServiceE,
    private _estudiantesService: EstudiantesService) { }

  ngOnInit() {
    this.estudiante=new Estudiantes("","","","");
    this.estudiante= this.storageService.getCurrentUser();

    if(this.estudiante.id_estudiante == null){

      alert("No se encontro el estudiante");
    }
    else
    {
      console.log(this.estudiante);
    }


  }

  editarEstudiante()
  {
    this.estudiante.programa=  this.estudiante.programa.toUpperCase();
    this._estudiantesService.editarEstudiantes(this.estudiante).subscribe(datos => {
       if (datos['estado'] == 1) {
         alert("Cambios guardados correctamente");
         
       } else {
         alert('No guardado');
       }
 
     });
  }
  


}
