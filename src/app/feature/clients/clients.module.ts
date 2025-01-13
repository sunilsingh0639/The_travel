import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientsRoutingModule } from './clients-routing.module';
import { ListComponent } from './list/list.component';
import { ViewComponent } from './view/view.component';
import { AddNewComponent } from './add-new/add-new.component';
import { SharedModule } from 'src/app/shared/shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ListComponent,
    ViewComponent,
    AddNewComponent
  ],
  imports: [
    CommonModule,
    ClientsRoutingModule,
    SharedModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  exports : [
    SharedModule,
  ]
})
export class ClientsModule { }
