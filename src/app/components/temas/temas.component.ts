import { Component, OnInit } from '@angular/core';
import { Temas } from '../../modelos/Temas';
import { Areas } from '../../modelos/Areas';
import { Router } from '@angular/router';
import {MatDialog, MatDialogRef} from '@angular/material';
import { TemasService } from '../../services/temas.service';
import { AreasService } from '../../services/areas.service';
import { EditarTemasComponent } from './editartemas/editar-temas.component';

@Component({
  selector: 'app-temas',
  templateUrl: './temas.component.html',
  styleUrls: []
})
export class TemasComponent implements OnInit {

  areas;
  area:Areas;
  temas;
  area_select:string;
  tema: Temas;
  datoBuscar: string;
  error = '';
  success = '';
  constructor(private _temasService: TemasService,private _areasService: AreasService, private _router: Router,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.mostrarTodas();
    this.cargarAreas();
    this.area_select="0"; 

   
    this.tema = new Temas('' , '','','' );
    this.datoBuscar='';
  }

  cargarAreas(): void {
    this._areasService.getAreas()
      .subscribe((res) => {
        this.areas = res['datos'];
      },
      (err) => {
        this.error = err;
      }
    );
  }

  mostrarTodas(): void {
    this._temasService.getTemas()
      .subscribe((res) => {
        this.temas = res['datos'];
      },
      (err) => {
        this.error = err;
      }
    );
  }

  registrarTema(): void {

    this.tema.id_area = this.area_select;

    if (this.tema.id_tema != '' && this.tema.desc_tema != '') {

      if (this.area_select != "0") {

        this.tema.desc_tema = this.tema.desc_tema.toUpperCase();
        this.tema.id_tema = this.tema.id_tema.toUpperCase();
        this._temasService.postTema(this.tema).subscribe(datos => {
          if (datos['estado'] == 1) {
            alert(datos['mensaje']);
            this.mostrarTodas();
          } else if (datos['estado'] == 23000) {
            alert('El tema ya se encuentra registrado');
          } else {
            alert('No guardado');
          }

        });
      }
      else {
        alert('Seleccione un area');
      }
    } else {
      alert('Faltan datos por llenar');
    }

  }

  
  buscarTema(): void {
    this._temasService.getBuscarTema(this.datoBuscar)
      .subscribe((res) => {
        this.temas = res['datos'];
       
      },
      (err) => {
        this.error = err;
      }
    );
  }
  eliminarTema(tema: Temas): void {
    if(confirm('¿Desea eliminar este tema: '+tema.desc_tema+' ?')){
    this._temasService.eliminarTema(tema)
      .subscribe((res) => {
        alert(res['mensaje']);
        this.mostrarTodas();
      },
      (err) => {
        this.error = err;
        console.log("error:::"+this.error['message'])
      }
    );
    }
  }


  editarTema(tema: Temas)
  {
    
    const dialogRef = this.dialog.open(EditarTemasComponent, {
      panelClass: 'my-panel',
      width: '350px',
      data: tema
    });
      dialogRef.afterClosed().subscribe(result => {

      if ( !result ) {
       
        return;
      }
      let tem: Temas;
      tem= new Temas(tema.id_area,result.desc_area,result.id_tema,result.desc_tema);
           tem.desc_tema=tem.desc_tema.toUpperCase();

           console.log()

      this._temasService.editarTema(tem).subscribe(datos => {
        if (datos['estado'] == 1) {
          alert(datos['mensaje']);
          this.mostrarTodas();
        } else {
          alert('No editada');
        }
  
      });
      
      });
      
  }
}
