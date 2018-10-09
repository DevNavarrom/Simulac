import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


//SERVICES
import { EstudiantesService } from './services/estudiantes.service';


//RUTAS
import { APP_ROUTING } from './app.routes';

//COMPONENTES
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
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
import { NavbarEstudiantesComponent } from './components/shared/navbar-estudiantes/navbar-estudiantes.component';
import { CrearexamenComponent } from './components/examenes/crearexamen/crearexamen.component';
import { PreguntasExamenComponent } from './components/examenes/preguntas-examen/preguntas-examen.component';
import { PreguntasSimulacroComponent } from './components/simulacros/preguntas-simulacro/preguntas-simulacro.component';




@NgModule({
  entryComponents: [
    EditarEstudianteComponent,
    EditarAreaComponent,
    EditarTemasComponent,
    RegistroComponent
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
    PreguntasSimulacroComponent   
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
  providers: [EstudiantesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
