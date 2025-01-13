import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DownloadGstr9bComponent } from './download-gstr9b/download-gstr9b.component';
import { ReportComponent } from './report/report.component';

const routes: Routes = [

  {
    path: 'reports',
    component: ReportComponent
  },
  {
    path: 'download-gstr9b',
    component: DownloadGstr9bComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
