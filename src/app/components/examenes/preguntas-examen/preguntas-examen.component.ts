import { Component, OnInit, Inject } from '@angular/core';
import {  MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Preguntas } from '../../../modelos/Preguntas';


@Component({
  selector: 'app-preguntas-examen',
  templateUrl: './preguntas-examen.component.html',
  styleUrls: ['./preguntas-examen.component.css']
})
export class PreguntasExamenComponent implements OnInit {

  formPreguntas:FormGroup;

  constructor(public fb: FormBuilder,
    public dialogRef: MatDialogRef<PreguntasExamenComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Preguntas) { }

  ngOnInit() {
  }

}
