import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



// Angular Material

import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import {MatTabsModule} from '@angular/material/tabs';
import {MatCardModule} from '@angular/material/card';
import {MatRadioModule} from '@angular/material/radio';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSnackBarModule} from '@angular/material/snack-bar';




@NgModule({
  imports: [
    CommonModule, 
    MatDialogModule,
    MatInputModule,
    MatTabsModule,
    MatCardModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatExpansionModule,
    MatCheckboxModule,
    MatSnackBarModule
  ],
  providers: [MatDatepickerModule],
  exports: [
    MatDialogModule,
    MatInputModule,
    MatTabsModule,
    MatCardModule,
    MatRadioModule,
    MatDatepickerModule,
    MatExpansionModule,
    MatCheckboxModule,
    MatSnackBarModule
  ],
  declarations: []
})
export class MaterialModule { }
