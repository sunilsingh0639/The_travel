import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportsRoutingModule } from './reports-routing.module';
import { ReportComponent } from './report/report.component';
import { DownloadGstr9bComponent } from './download-gstr9b/download-gstr9b.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ReportComponent,
    DownloadGstr9bComponent
  ],
  imports: [
    CommonModule,
    ReportsRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ]
})
export class ReportsModule { }
