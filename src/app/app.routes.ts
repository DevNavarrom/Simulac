import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { EstudiantesComponent } from './components/estudiantes/estudiantes.component';
import { HomeComponent } from './components/home/home.component';
import { AreasComponent } from './components/areas/areas.component';
import { TemasComponent } from './components/temas/temas.component';
import { ExamenesComponent } from './components/examenes/examenes.component';
import { PreguntasComponent } from './components/preguntas/preguntas.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { CrearexamenComponent } from './components/examenes/crearexamen/crearexamen.component';


const APP_ROUTES: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'inicio', component: NavbarComponent },
    { path: 'estudiantes', component: EstudiantesComponent },
    { path: 'areas', component: AreasComponent },
    { path: 'examenes', component: ExamenesComponent },
    { path: 'examen/:id', component: CrearexamenComponent },
    { path: 'preguntas', component: PreguntasComponent },
    { path: 'temas', component: TemasComponent },
    { path: '**', pathMatch: 'full', redirectTo: 'login' }

    //{ path: 'inicio/:id', component: NavbarComponent },

    //{ path: 'path/:routeParam', component: MyComponent },
    //{ path: 'staticPath', component: ... },
    //{ path: '**', component: ... },
    //{ path: 'oldPath', redirectTo: '/staticPath' },
    //{ path: ..., component: ..., data: { message: 'Custom' }
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);