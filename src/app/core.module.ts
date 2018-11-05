import {NgModule, Optional, SkipSelf} from '@angular/core';
import {MockBackend} from "@angular/http/testing";
import {BaseRequestOptions} from "@angular/http";
import {StorageService} from "./services/storage.service";
import {AuthorizatedGuard} from "./components/guards/authorizathed.guard";
import { AuthorizatedGuardE } from './components/guards/authorizathedE.guard';
import { StorageServiceE } from './services/storageE.service';

@NgModule({
  declarations: [  ],
  imports: [],
  providers: [
    StorageService,
    StorageServiceE,
    AuthorizatedGuard,
    AuthorizatedGuardE,
    MockBackend,
    BaseRequestOptions
  ],
  bootstrap: []
})
export class CoreModule {
  constructor (@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only');
    }
  }
}