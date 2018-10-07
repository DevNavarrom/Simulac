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
<<<<<<< HEAD
import { LoginComponent } from './components/login/login.component';
import { EditarexamenComponent } from './components/examenes/editarexamen/editarexamen.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
=======
import { EditarEstudianteComponent } from './components/estudiantes/editarestudiante/editar-estudiante.component';


//SERVICES
import { EstudiantesService } from './services/estudiantes.service';
>>>>>>> b20d8519439f4de3d88bdd6912baad4ab257a7f2

import { MaterialModule } from './material.module';
import { EditarAreaComponent } from './components/areas/editararea/editar-area.component';



@NgModule({
  entryComponents: [
    EditarEstudianteComponent,
    EditarAreaComponent
  ],
  declarations: [
    AppComponent,
    NavbarComponent,
    EstudiantesComponent,
    HomeComponent,
    AreasComponent,
    ExamenesComponent,
<<<<<<< HEAD
    EditarexamenComponent,
    PreguntasComponent,
    LoginComponent
=======
    PreguntasComponent,
    EditarEstudianteComponent,
    EditarAreaComponent   
>>>>>>> b20d8519439f4de3d88bdd6912baad4ab257a7f2
  ],
  imports: [
    BrowserModule,
    APP_ROUTING,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
<<<<<<< HEAD
    BrowserAnimationsModule
=======
    BrowserAnimationsModule,
    MaterialModule
>>>>>>> b20d8519439f4de3d88bdd6912baad4ab257a7f2
  ],
  providers: [EstudiantesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
