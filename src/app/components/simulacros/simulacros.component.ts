import { Component, OnInit } from '@angular/core';
import { MatDatepickerInputEvent} from '@angular/material/datepicker';
import { SimulacrosService } from '../../services/simulacros.service';
import { MatDialog, MatCheckboxChange } from '@angular/material';
import { VerDetallesSimulacroComponent } from './ver-detalles-simulacro/ver-detalles-simulacro.component';
import { Simulacros } from 'src/app/modelos/Simulacros';
import { EditarSimulacroComponent } from './editar-simulacro/editar-simulacro.component';
import { FormControl } from '@angular/forms';
import { formatDate } from '@angular/common';
import { CrearSimulacroComponent } from './crear-simulacro/crear-simulacro.component';


@Component({
  selector: 'app-simulacros',
  templateUrl: './simulacros.component.html',
  styleUrls: []
})
export class SimulacrosComponent implements OnInit {

  
  simulacros: any[]=[];
  data: string="";
  //today: number = Date.now();
  idExamen:string="";
  fecha =new FormControl(new Date());
  estado:string="";
  checked: boolean=true;

 
  constructor(private _simulacrosServices: SimulacrosService,
    public dialog: MatDialog) { }

  ngOnInit() {
   
    this.buscarSimulacro();
  }

  crearNuevo()
  {

    const dialogRef = this.dialog.open(CrearSimulacroComponent, {
      panelClass: 'my-panel',
      width: '450px',
      data: null
    });
      dialogRef.afterClosed().subscribe(result => {

      if ( !result ) {
       
        return;
      }
  
     this.buscarSimulacro();          
       
      });

  }

  change(event: MatCheckboxChange)
  {

    //this.checked=!this.checked;
   // console.log("i: "+this.checked);
   
     this.buscarSimulacro();          
  }
  eliminarSimulacro(id: string)
  {
     
    if(confirm('¿Desea eliminar este simulacro: '+id+'?,\n Si lo hace tambien se borraran sus resultados.')){
    this._simulacrosServices.eliminarSimulacro(id)
      .subscribe((res) => {
        alert(res['mensaje']);

        this.buscarSimulacro();
       
      },
      (err) => {
       alert(err);
      }
    );
    
  }

  }
  changeDate(event: MatDatepickerInputEvent<this>)
  {

     this.checked=false;


      this.buscarSimulacro();
    
  }
  editarSimulacro(simulacro: any)
  {
    const dialogRef = this.dialog.open(EditarSimulacroComponent, {
      panelClass: 'my-panel',
      width: '350px',
      data: simulacro
    });
      dialogRef.afterClosed().subscribe(result => {

      if ( !result ) {
       
        return;
      }
  
   
      this._simulacrosServices.editarSimulacro(result).subscribe(datos => {
        if (datos['estado'] == 1) {
          alert(datos['mensaje']);
          this.buscarSimulacro();
        } else {
          alert('No guardado');
        }
  
      });
      
      });
  }
  

  verResultados(simulacro:any)
  {
    const dialogRef = this.dialog.open(VerDetallesSimulacroComponent, {
      panelClass: 'my-panel',
      data: simulacro
    });
      dialogRef.afterClosed().subscribe(result => {

      if ( !result ) {
       
      }
     
      });
  }

 
  buscarSimulacro()
  {
    let date="";
    if(!this.checked){
      date=formatDate(this.fecha.value,'yyyy-MM-dd','en-US');
    }
    let data=this.data;
    let estado=this.estado;
    let fecha= date;
    let idExamen= this.idExamen;
    let datos: any={
      data,
      estado,
      fecha,
      idExamen
    };
   // console.log(datos);
    this._simulacrosServices.buscarSimulacros(datos).subscribe(datos => {
      if (datos['estado'] == 111) {
        this.simulacros=datos['datos'];
      } else {
        alert('Error al cargar los datos');
      }

    });
    
  }
}
