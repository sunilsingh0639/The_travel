import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SupplierDashboardComponent } from './supplier-dashboard/supplier-dashboard.component';
import { ReconDashboardComponent } from './recon-dashboard/recon-dashboard.component';
import { YearlyReconDashboardComponent } from './yearly-recon-dashboard/yearly-recon-dashboard.component';
import { SharedModule } from 'src/app/shared/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { NumberToWordPipe } from 'src/app/shared/shared/directives/number-to-word.pipe';
import {MatSelectModule} from '@angular/material/select';

@NgModule({
  declarations: [
    DashboardComponent,
    SupplierDashboardComponent,
    NumberToWordPipe,
    ReconDashboardComponent,
    YearlyReconDashboardComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatInputModule,
    MatSelectModule
  ]
})
export class DashboardModule { }
