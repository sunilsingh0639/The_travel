import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SupplierDashboardComponent } from './supplier-dashboard/supplier-dashboard.component';
import { ReconDashboardComponent } from './recon-dashboard/recon-dashboard.component';
import { YearlyReconDashboardComponent } from './yearly-recon-dashboard/yearly-recon-dashboard.component';
import { SharedModule } from 'src/app/shared/shared/shared.module';



@NgModule({
  declarations: [
    DashboardComponent,
    SupplierDashboardComponent,
    
    ReconDashboardComponent,
          YearlyReconDashboardComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule
  ]
})
export class DashboardModule { }
