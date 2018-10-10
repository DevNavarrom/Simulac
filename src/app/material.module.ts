import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


// Angular Material

import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import {MatTabsModule} from '@angular/material/tabs';
import {MatCardModule} from '@angular/material/card';
import {MatRadioModule} from '@angular/material/radio';

@NgModule({
  imports: [
    CommonModule, 
    MatDialogModule,
    MatInputModule,
    MatTabsModule,
    MatCardModule,
    MatRadioModule
  ],
  exports: [
    MatDialogModule,
    MatInputModule,
    MatTabsModule,
    MatCardModule,
    MatRadioModule
  ],
  declarations: []
})
export class MaterialModule { }
