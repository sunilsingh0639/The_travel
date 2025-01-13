import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared/shared.module';
import { AuditLogsRoutingModule } from './audit-logs-routing-module';
import { AuditLogsComponent } from './audit-logs.component';


@NgModule({
  declarations: [
    AuditLogsComponent
  ],
  imports: [
    CommonModule,
    SharedModule, 
    AuditLogsRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ]
})

export class AuditLogsModule { }