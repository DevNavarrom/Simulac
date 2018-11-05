import { BrowserModule } from '@angular/platform-browser';
import { NgModule ,LOCALE_ID} from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


//SERVICES
import { EstudiantesService } from './services/estudiantes.service';
import { PreguntasService } from './services/preguntas.service';


//RUTAS
import { APP_ROUTING } from './app.routes';

//COMPONENTES
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/login/shared/navbar/navbar.component';
import { EstudiantesComponent } from './components/estudiantes/estudiantes.component';
import { HomeComponent } from './components/home/home.component';
import { AreasComponent } from './components/areas/areas.component';
import { ExamenesComponent } from './components/examenes/examenes.component';
import { PreguntasComponent } from './components/preguntas/preguntas.component';
import { LoginComponent } from './components/login/login.component';

import { MaterialModule } from './material.module';
import { EditarEstudianteComponent } from './components/estudiantes/editarestudiante/editar-estudiante.component';
import { EditarAreaComponent } from './components/areas/editararea/editar-area.component';
import { TemasComponent } from './components/temas/temas.component';
import { EditarTemasComponent } from './components/temas/editartemas/editar-temas.component';
import { RegistroComponent } from './components/login/registro/registro.component';
import { EstudiantesSimulacroComponent } from './components/simulacros/estudiantes-simulacro/estudiantes-simulacro.component';
import { NavbarEstudiantesComponent } from './components/login/shared/navbar-estudiantes/navbar-estudiantes.component';
import { CrearexamenComponent } from './components/examenes/crearexamen/crearexamen.component';
import { PreguntasExamenComponent } from './components/examenes/preguntas-examen/preguntas-examen.component';
import { PreguntasSimulacroComponent } from './components/simulacros/preguntas-simulacro/preguntas-simulacro.component';
import { EstudiantesDatosComponent } from './components/estudiantes/estudiantes-datos/estudiantes-datos.component';
import { ModalDialogComponent } from './components/modaldialog/modal-dialog.component';
import { SimulacrosComponent } from './components/simulacros/simulacros.component';
import { EditarSimulacroComponent } from './components/simulacros/editar-simulacro/editar-simulacro.component';
import { VerDetallesSimulacroComponent } from './components/simulacros/ver-detalles-simulacro/ver-detalles-simulacro.component';
import { VerRespuestasEstudiantesComponent } from './components/simulacros/ver-respuestas-estudiantes/ver-respuestas-estudiantes.component';
import { CrearSimulacroComponent } from './components/simulacros/crear-simulacro/crear-simulacro.component';
import { ListarExamenesComponent } from './components/examenes/listar-examenes/listar-examenes.component';
import { StorageService } from './services/storage.service';
import { AuthorizatedGuard } from './components/guards/authorizathed.guard';
import { InicioDocComponent } from './components/inicio/inicio-doc/inicio-doc.component';
import { InicioEstComponent } from './components/inicio/inicio-est/inicio-est.component';
import { StorageServiceE } from './services/storageE.service';
import { AuthorizatedGuardE } from './components/guards/authorizathedE.guard';





@NgModule({
  entryComponents: [
    EditarEstudianteComponent,
    EditarAreaComponent,
    EditarTemasComponent,
    RegistroComponent,
    PreguntasExamenComponent,
    ModalDialogComponent,
    VerDetallesSimulacroComponent,
    EditarSimulacroComponent,
    CrearSimulacroComponent,
    ListarExamenesComponent

  ],
  declarations: [
    AppComponent,
    NavbarComponent,
    EstudiantesComponent,
    HomeComponent,
    AreasComponent,
    ExamenesComponent,
    PreguntasComponent,
    LoginComponent,
    EditarEstudianteComponent,
    EditarAreaComponent,
    TemasComponent,
    EditarTemasComponent,   
    RegistroComponent, 
    EstudiantesSimulacroComponent, 
    NavbarEstudiantesComponent   
    ,CrearexamenComponent, 
    PreguntasExamenComponent,
    PreguntasSimulacroComponent,
    EstudiantesDatosComponent,
    ModalDialogComponent,
    SimulacrosComponent,
    EditarSimulacroComponent,
    VerDetallesSimulacroComponent,
    VerRespuestasEstudiantesComponent,
    CrearSimulacroComponent,
    ListarExamenesComponent,
    InicioDocComponent,
    InicioEstComponent   
  ],
  imports: [
    BrowserModule,
    APP_ROUTING,
    HttpClientModule,
   FormsModule,
   ReactiveFormsModule,
   BrowserAnimationsModule,
     MaterialModule
  ],
  providers: [  AuthorizatedGuard,AuthorizatedGuardE,StorageService,StorageServiceE,EstudiantesService, PreguntasService,  { provide: LOCALE_ID, useValue: "es" }],

  bootstrap: [AppComponent]
})
export class AppModule { }
