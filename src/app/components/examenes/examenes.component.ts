import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExamenesService } from '../../services/examenes.service';
import { IExamenes, IExamen } from '../../modelos/Examen';

@Component({
  selector: 'app-examenes',
  templateUrl: './examenes.component.html',
  styles: []
})
export class ExamenesComponent implements OnInit {

  examenes:IExamenes[] = [];

  constructor( private _router:Router, private _examenesService:ExamenesService ) { }

  ngOnInit() {
    this.mostrarExamenes();
  }

  editarExamen(id:any){
    //TODO pedir por parametro el id del examen seleccionado en la tabla para el caso de edicion, si es nuevo 0
    this._router.navigate(['/examen', id]);
  }

  mostrarExamenes() {
    this._examenesService.getExamenes().subscribe(res => {
      this.examenes = res['datos'];
    });
  }

  eliminarExamen(exam: IExamen): void {
    if(confirm('¿Desea eliminar este examen: '+exam.id_examen+' ?')){
    this._examenesService.deleteExamen(exam.id_examen)
      .subscribe((res) => {
        alert(res['mensaje']);
        this.mostrarExamenes();
      }
    );
    }
  }

}
