import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


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
import { EditarexamenComponent } from './components/examenes/editarexamen/editarexamen.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    EstudiantesComponent,
    HomeComponent,
    AreasComponent,
    ExamenesComponent,
    EditarexamenComponent,
    PreguntasComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    APP_ROUTING,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  providers: [EstudiantesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
