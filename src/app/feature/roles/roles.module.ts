import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoleComponent } from './role/role.component';

import { RolesRoutingModule } from './role-routing.module';
import { SharedModule } from 'src/app/shared/shared/shared.module';
import { DetailComponent } from './detail/detail.component';

@NgModule({
  declarations: [
    RoleComponent,
    DetailComponent
  ],
  imports: [
    CommonModule,
    RolesRoutingModule,
    SharedModule
  ]
})
export class RolesModule { }
