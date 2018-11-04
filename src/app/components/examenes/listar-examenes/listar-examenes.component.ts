import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { IExamenes } from 'src/app/modelos/Examen';
import { ExamenesService } from 'src/app/services/examenes.service';

@Component({
  selector: 'app-listar-examenes',
  templateUrl: './listar-examenes.component.html',
  styleUrls: ['./listar-examenes.component.css']
})
export class ListarExamenesComponent implements OnInit {
  examenes:IExamenes[] = [];
  constructor(public dialogRef: MatDialogRef<ListarExamenesComponent>,
    private _examenesService:ExamenesService
    ) { }

  ngOnInit() {
    this.mostrarExamenes();
  }
  mostrarExamenes() {
    this._examenesService.getExamenes().subscribe(res => {
      this.examenes = res['datos'];
    });
  }

  seleccionar(id_examen: string)
  {

    this.dialogRef.close(id_examen);

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
