import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


// Angular Material

import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  imports: [
    CommonModule, 
    MatDialogModule,
    MatInputModule
  ],
  exports: [
    MatDialogModule,
    MatInputModule
  ],
  declarations: []
})
export class MaterialModule { }
