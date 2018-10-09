import { Component, OnInit } from '@angular/core';
import { AreasService } from '../../../services/areas.service';
import { TemasService } from '../../../services/temas.service';
import { MatDialog } from '@angular/material';
import { PreguntasExamenComponent } from '../preguntas-examen/preguntas-examen.component';
import { Preguntas } from '../../../modelos/Preguntas';

@Component({
  selector: 'app-crearexamen',
  templateUrl: './crearexamen.component.html',
  styleUrls: ['./crearexamen.component.css']
})
export class CrearexamenComponent implements OnInit {

  areas;
  temas;
  error = '';
  area_select:string;
  tema_select:string;
  id_area:string;
  constructor(private _areasService: AreasService, private _temasService:TemasService, public dialog: MatDialog) { }

  ngOnInit() {
    this.cargarAreas();
    this.area_select="0";
    this.cargarTemas();
    this.tema_select="0";
  }

  selectPregunta(){
    let pregunta:Preguntas = new Preguntas(0,this.area_select,"",this.tema_select,"");
    const dialogRef = this.dialog.open(PreguntasExamenComponent, {
      panelClass: 'my-panel',
      width: '750px',
      data: pregunta
    });
      dialogRef.afterClosed().subscribe(result => {

      if ( !result ) {
       
        return;
      }
      /*let ar: Areas;
      ar= new Areas(result.id_area,result.desc_area);
           ar.desc_area=ar.desc_area.toUpperCase();

      this._areasService.editarArea(ar).subscribe(datos => {
        if (datos['estado'] == 1) {
          alert(datos['mensaje']);
          this.mostrarTodas();
        } else {
          alert('No editada');
        }
  
      });*/
      
      });
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

  cargarTemas(): void {
    this._temasService.getBuscarTema(this.area_select)
      .subscribe((res) => {
        this.temas = res['datos'];
      },
      (err) => {
        this.error = err;
      }
    );
  }

}
