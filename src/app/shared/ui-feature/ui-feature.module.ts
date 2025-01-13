import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NgSelectModule } from "@ng-select/ng-select";
import {MatDatepickerModule} from '@angular/material/datepicker';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NgSelectModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatRippleModule,
    MatNativeDateModule,
    MatDatepickerModule
  ],
  exports: [
    NgSelectModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatRippleModule,
    MatNativeDateModule,
    MatDatepickerModule
  ]
})
export class UiFeatureModule { }
