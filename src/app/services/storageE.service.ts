import {Injectable} from "@angular/core";
import { Router } from '@angular/router';
import {SessionE} from "../../app/modelos/SessionE";
import { Estudiantes } from '../modelos/Estudiantes';

@Injectable()
export class StorageServiceE {

  private localStorageService;
  private currentSession : SessionE = null;

  constructor(private router: Router) {
    this.localStorageService = localStorage;
    this.currentSession = this.loadSessionData();
  }

  setCurrentSession(session: SessionE): void {
    this.currentSession = session;
    this.localStorageService.setItem('currentUserE', JSON.stringify(session));
  }

  loadSessionData(): SessionE{
    var sessionStr = this.localStorageService.getItem('currentUserE');
    return (sessionStr) ? <SessionE> JSON.parse(sessionStr) : null;
  }

  getCurrentSession(): SessionE {
    return this.currentSession;
  }

  removeCurrentSession(): void {
    
    this.localStorageService.removeItem('currentUserE');
    this.currentSession = null;
  }

  getCurrentUser(): Estudiantes {
    var session: SessionE = this.getCurrentSession();
    return (session && session.user) ? session.user : null;
  };

  isAuthenticated(): boolean {
    return (this.getCurrentToken() != null) ? true : false;
  };

  getCurrentToken(): string {
    var session = this.getCurrentSession();
    return (session && session.token) ? session.token : null;
  };

  logout(): void{
    this.removeCurrentSession();
    //this.router.navigate(['/login']);
   
  }

}