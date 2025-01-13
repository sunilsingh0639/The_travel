import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { SubscriptionsModule } from './subscriptions.module';
import { PlanComponent } from './plan/plan.component';

const routes: Routes = [
  {
    path: '',
    component: ListComponent
  },
  {
    path: 'add-new',
    component: PlanComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubscriptionsRoutingModule { }
