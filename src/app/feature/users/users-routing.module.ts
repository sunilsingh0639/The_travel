import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddNewComponent } from './add-new/add-new.component';
import { DeatilsComponent } from './deatils/deatils.component';
import { ListComponent } from './list/list.component';

const routes: Routes = [
  {
    path: '',
    component: ListComponent
  },
  {
    path: 'deatils/:id',
    component: DeatilsComponent
  },
  {
    path: 'add-new',
    component: AddNewComponent
  },
  {
    path: 'edit-user/:id',
    component: AddNewComponent
  },
  {
    path : 'delete-user/:id',
    component: ListComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
