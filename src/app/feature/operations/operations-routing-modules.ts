import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UploadListComponent } from './upload-list/upload-list.component';
import { ReconComponent } from './recon/recon.component';
import { ReconExecutionsComponent } from './recon-executions/recon-executions.component';
import { AddReconComponent } from './add-recon/add-recon.component';
import { ManualMatchComponent } from './manual-match/manual-match.component';
import { AddReconExecutionComponent } from './add-recon-execution/add-recon-execution.component';
import { ReconDetailComponent } from './recon-detail/recon-detail.component';
import { UploadFileComponent } from './upload-file/upload-file.component';
import { RuleConfigrationsComponent } from './rule-configrations/rule-configrations.component';
import { RuleListComponent } from './rule-list/rule-list.component';
import { RuleDeatilsComponent } from './rule-deatils/rule-deatils.component';
const routes: Routes = [
  {
    path: 'file-upload',
    component: UploadListComponent
  },
  {
    path: 'recon',
    component: ReconComponent
  },
  {
    path: 'rule-configrations',
    component: RuleConfigrationsComponent
  },
  {
    path: 'rule-list',
    component: RuleListComponent
  },
  {
    path: 'rule-deatils',
    component: RuleDeatilsComponent
  }
  ,
  {
    path: 'recon-executions',
    component: ReconExecutionsComponent
  } ,
  {
    path: 'manual-match',
    component: ManualMatchComponent
  }
  ,
  {
    path: 'add/recon',
    component: AddReconComponent
  }
  ,
  {
    path: 'add/recon-execution',
    component: AddReconExecutionComponent
  },
  {
    path: 'detail',
    component: ReconDetailComponent
  },
  {
    path: 'upload/file',
    component: UploadFileComponent
  },
  {
    path: 'edit-File/:id',
    component:UploadFileComponent
  },
  {
    path: 'edit-recon/:id',
    component: AddReconComponent
  },
  {
    path: 'edit-rule/:id',
    component: RuleConfigrationsComponent
  },
  {
    path: 'Upload_File_List',
    component: UploadListComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OperationsRoutingModule { }
