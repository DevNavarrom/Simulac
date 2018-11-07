import { Component, OnInit } from '@angular/core';
import { Areas } from '../../modelos/Areas';
import { AreasService } from '../../services/areas.service';
import { Router } from '@angular/router';
import {MatDialog, MatDialogRef,MatSnackBar} from '@angular/material';
import { EditarAreaComponent } from './editararea/editar-area.component';

@Component({
  selector: 'app-areas',
  templateUrl: './areas.component.html',
  styles: []
})
export class AreasComponent implements OnInit {

  areas;
  area: Areas;
  datoBuscar: string;
  error = '';
  success = '';
  constructor(private _areasService: AreasService, private _router: Router,
    public dialog: MatDialog,public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.mostrarTodas();
    this.area = new Areas( '' ,  '' );
    this.datoBuscar='';
  }

  
  mostrarTodas(): void {
    this._areasService.getAreas()
      .subscribe((res) => {
        this.areas = res['datos'];
      },
      (err) => {
        this.error = err;
      }
    );
  }
  editarArea(area: Areas)
  {
    const dialogRef = this.dialog.open(EditarAreaComponent, {
      panelClass: 'my-panel',
      width: '350px',
      data: area
    });
      dialogRef.afterClosed().subscribe(result => {

      if ( !result ) {
       
        return;
      }
      let ar: Areas;
      ar= new Areas(result.id_area,result.desc_area);
           ar.desc_area=ar.desc_area.toUpperCase();

      this._areasService.editarArea(ar).subscribe(datos => {
        if (datos['estado'] == 1) {
          this.openSnackBar(datos['mensaje'],'Aceptar')

          this.mostrarTodas();
        } else {
          this.openSnackBar('No editada','')
        }
  
      });
      
      });
  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
  registrar() {


    if (this.area.id_area != '' && this.area.desc_area != '' ) {

       this.area.desc_area = this.area.desc_area.toUpperCase();
       this.area.id_area=this.area.id_area.toUpperCase();
      this._areasService.postArea(this.area).subscribe(datos => {
      if (datos['estado'] == 1) {
        this.openSnackBar(datos['mensaje'],'Aceptar')

        this.mostrarTodas();
      } else if (datos['estado'] == 23000) {
        this.openSnackBar('El area ya se encuentra registrada','Aceptar')

      }       else {
        this.openSnackBar('No guardado','Aceptar')

        
      }

    });
  
  } else {
    this.openSnackBar('Faltan datos por llenar','Aceptar')

  }

  }
  eliminarArea(area: Areas): void {
    if(confirm('¿Desea eliminar esta area: '+area.desc_area+' ?')){
    this._areasService.eliminarArea(area.id_area)
      .subscribe((res) => {
        this.openSnackBar(res['mensaje'],'Aceptar')

        
        this.mostrarTodas();
      },
      (err) => {
        this.error = err;
        console.log("error:::"+this.error['message'])
      }
    );
    }
  }

  buscarArea() {
    this._areasService.getBuscarArea(this.datoBuscar).subscribe((res)=> {
      this.areas = res['datos'];
    },
    (err) => {
      this.error = err;
    }
    );
  }
  
}
