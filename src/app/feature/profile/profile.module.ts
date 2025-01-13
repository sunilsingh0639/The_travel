import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { SettingsComponent } from './settings/settings.component';
import { SharedModule } from 'src/app/shared/shared/shared.module';
import { AdminSettingsComponent } from './admin-settings/admin-settings.component';
import { ApprovalQueueComponent } from '../approval-queue/approval-queue.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ViewRuleComponent } from './settings/view-rule/view-rule.component';

@NgModule({
  declarations: [
    ProfileComponent,
    EditProfileComponent,
    SettingsComponent,
    AdminSettingsComponent,
    ApprovalQueueComponent,
    ViewRuleComponent
  ],
  imports: [
    HttpClientModule,
    CommonModule,
    SharedModule,
    ProfileRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class ProfileModule { }
