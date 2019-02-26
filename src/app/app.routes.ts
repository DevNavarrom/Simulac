import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { EstudiantesComponent } from './components/estudiantes/estudiantes.component';
import { HomeComponent } from './components/home/home.component';
import { AreasComponent } from './components/areas/areas.component';
import { TemasComponent } from './components/temas/temas.component';
import { ExamenesComponent } from './components/examenes/examenes.component';
import { PreguntasComponent } from './components/preguntas/preguntas.component';
import { NavbarComponent } from './components/login/shared/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { EstudiantesSimulacroComponent } from './components/simulacros/estudiantes-simulacro/estudiantes-simulacro.component';
import { CrearexamenComponent } from './components/examenes/crearexamen/crearexamen.component';
import { PreguntasSimulacroComponent } from './components/simulacros/preguntas-simulacro/preguntas-simulacro.component';
import { EstudiantesDatosComponent } from './components/estudiantes/estudiantes-datos/estudiantes-datos.component';
import { SimulacrosComponent } from './components/simulacros/simulacros.component';
import { VerRespuestasEstudiantesComponent } from './components/simulacros/ver-respuestas-estudiantes/ver-respuestas-estudiantes.component';
import { AuthorizatedGuard } from './components/guards/authorizathed.guard';
import { AppComponent } from './app.component';
import { AuthorizatedGuardE } from './components/guards/authorizathedE.guard';


const APP_ROUTES: Routes = [
    { path: 'home', component: HomeComponent, canActivate: [ AuthorizatedGuard ]  },
   { path: '', redirectTo: '/home', pathMatch: 'full' },
   { path: 'app-root', component: AppComponent },
  
    { path: 'login', component: LoginComponent },
    { path: 'inicio', component: NavbarComponent,canActivate: [ AuthorizatedGuard ]  },
    { path: 'estudiantes', component: EstudiantesComponent , canActivate: [ AuthorizatedGuard ] },
    { path: 'areas', component: AreasComponent , canActivate: [ AuthorizatedGuard ] },
    { path: 'examenes', component: ExamenesComponent, canActivate: [ AuthorizatedGuard ]  },
    { path: 'examen/:id', component: CrearexamenComponent , canActivate: [ AuthorizatedGuard ] },
    { path: 'preguntas', component: PreguntasComponent , canActivate: [ AuthorizatedGuard ] },
    { path: 'temas', component: TemasComponent , canActivate: [ AuthorizatedGuard ] },
    { path: 'estudiantes/simulacros', component: EstudiantesSimulacroComponent,canActivate: [ AuthorizatedGuardE ] },
    { path: 'estudiantes/simulacros/:id', component: PreguntasSimulacroComponent,canActivate: [ AuthorizatedGuardE ] }, 
    { path: 'estudiantes/datos', component: EstudiantesDatosComponent,canActivate: [ AuthorizatedGuardE ] },
    { path: 'simulacros', component: SimulacrosComponent , canActivate: [ AuthorizatedGuard ] },
    { path: 'simulacros/respuestas/:id_simulacro/:id_estudiante', component: VerRespuestasEstudiantesComponent },    
    { path: '**', redirectTo: '/home'}

    //{ path: 'inicio/:id', component: NavbarComponent },

    //{ path: 'path/:routeParam', component: MyComponent },
    //{ path: 'staticPath', component: ... },
    //{ path: '**', component: ... },
    //{ path: 'oldPath', redirectTo: '/staticPath' },
    //{ path: ..., component: ..., data: { message: 'Custom' }
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES,{ useHash: true });