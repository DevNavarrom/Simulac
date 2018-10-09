import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-crearexamen',
  templateUrl: './crearexamen.component.html',
  styleUrls: ['./crearexamen.component.css']
})
export class CrearexamenComponent implements OnInit {

  opc:boolean = true;

  constructor() { }

  ngOnInit() {
  }

  selectOpcionAgg(){
    this.opc = true;
  }

  selectOpcionSel(){
    this.opc = false;
  }

}
