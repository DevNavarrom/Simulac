import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import {StorageServiceE} from "../../services/storageE.service";

@Injectable()
export class AuthorizatedGuardE implements CanActivate {

  constructor(private router: Router,
              private storageService: StorageServiceE) { }

  canActivate() {
    console.log(this.storageService.isAuthenticated());
    if (this.storageService.isAuthenticated()) {
      // logged in so return true
      return true;
    }

    // not logged in so redirect to login page
    this.router.navigate(['/login']);
    return false;
  }
}