import { Component, OnInit } from '@angular/core';
import { StorageService } from './services/storage.service';
import { StorageServiceE } from './services/storageE.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  constructor(
    private storageService: StorageService,private storageServiceE: StorageServiceE) { 
  }
  public docIsLogin() {
    return this.storageService.isAuthenticated();
  }
  public estIsLogin() {
    return this.storageServiceE.isAuthenticated();
  }
}


