import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ListComponent } from './list/list.component';
import { PlanComponent } from './plan/plan.component';
import { SubscriptionsRoutingModule } from './subscriptions-routing.module';


@NgModule({
  declarations: [
    ListComponent,
    PlanComponent,
  ],
  imports: [
    CommonModule,
    SubscriptionsRoutingModule
  ]
})
export class SubscriptionsModule { }
