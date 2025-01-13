import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SupplierDashboardComponent } from './supplier-dashboard/supplier-dashboard.component';
import { YearlyReconDashboardComponent } from './yearly-recon-dashboard/yearly-recon-dashboard.component';
import { ReconDashboardComponent } from './recon-dashboard/recon-dashboard.component';

const routes: Routes = [

  {
    path: '',
    component: DashboardComponent
  },
  {
    path: 'Monthly-Recon-Dashboard',
    component: DashboardComponent
  },
  // {
  //   path: 'Supp-dashboard',
  //   component: ReconDashboardComponent
  // }

  {
    path: 'Supplier-Recon-Dashboard',
    component: ReconDashboardComponent
  }, {
    path: 'Yearly-Recon-Dashboard',
    component: YearlyReconDashboardComponent
  },
  //  {
  //   path: 'suppiler-dashboard',
  //   component: ReconDashboardComponent
  // }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
