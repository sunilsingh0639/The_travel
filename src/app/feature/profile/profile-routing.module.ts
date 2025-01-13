import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApprovalQueueComponent } from '../approval-queue/approval-queue.component';
import { DownloadNotificationComponent } from '../download-notification/download-notification.component';
import { NotificationComponent } from '../notification/notification.component';
import { AdminSettingsComponent } from './admin-settings/admin-settings.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { ProfileComponent } from './profile/profile.component';
import { SettingsComponent } from './settings/settings.component';

const routes: Routes = [
  {
    path: '',
    component: ProfileComponent
  },
  {
    path: 'edit',
    component: EditProfileComponent
  }
  ,
  {
    path: 'settings',
    component: SettingsComponent
  },
  {
    path: 'notification',
    component:NotificationComponent
  },
  {
    path: "download-notification",
    component : DownloadNotificationComponent
  },
  {
    path: 'adm-settings',
    component: AdminSettingsComponent
  },
  {
    path: 'approval-queue',
    component : ApprovalQueueComponent
  },
  {
    path: 'prpfileComponent',
    component: ProfileComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
