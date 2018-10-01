import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { EstudiantesComponent } from './components/estudiantes/estudiantes.component';
import { HomeComponent } from './components/home/home.component';
import { AreasComponent } from './components/areas/areas.component';
import { ExamenesComponent } from './components/examenes/examenes.component';
import { PreguntasComponent } from './components/preguntas/preguntas.component';


const APP_ROUTES: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'estudiantes', component: EstudiantesComponent },
    { path: 'areas', component: AreasComponent },
    { path: 'examenes', component: ExamenesComponent },
    { path: 'preguntas', component: PreguntasComponent },
    { path: '**', pathMatch: 'full', redirectTo: 'home' }

    //{ path: 'path/:routeParam', component: MyComponent },
    //{ path: 'staticPath', component: ... },
    //{ path: '**', component: ... },
    //{ path: 'oldPath', redirectTo: '/staticPath' },
    //{ path: ..., component: ..., data: { message: 'Custom' }
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);