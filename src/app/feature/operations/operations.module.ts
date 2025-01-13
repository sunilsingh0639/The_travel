import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadListComponent } from './upload-list/upload-list.component';
import { OperationsRoutingModule } from './operations-routing-modules';
import { SharedModule } from 'src/app/shared/shared/shared.module';
import { ReconComponent } from './recon/recon.component';
import { ReconExecutionsComponent } from './recon-executions/recon-executions.component';
import { AddReconComponent } from './add-recon/add-recon.component';
import { AddReconExecutionComponent } from './add-recon-execution/add-recon-execution.component';
import { ManualMatchComponent } from './manual-match/manual-match.component';
import { ReconDetailComponent } from './recon-detail/recon-detail.component';
import { UploadFileComponent } from './upload-file/upload-file.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RuleConfigrationsComponent } from './rule-configrations/rule-configrations.component';
import { RuleListComponent } from './rule-list/rule-list.component';
import { RuleDeatilsComponent } from './rule-deatils/rule-deatils.component';
import { MAT_DATE_LOCALE } from '@angular/material/core';





@NgModule({
  declarations: [
    UploadListComponent,
    ReconComponent,
    ReconExecutionsComponent,
    AddReconComponent,
    AddReconExecutionComponent,
    ManualMatchComponent,
    ReconDetailComponent,
    UploadFileComponent,
    RuleConfigrationsComponent,
    RuleListComponent,
    RuleDeatilsComponent
  ],
  imports: [
    CommonModule,
    OperationsRoutingModule,
    SharedModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }
  ]
})
export class OperationsModule { }
