import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionsListComponent } from './transactions-list/transactions-list.component';
import { SharedModule } from 'src/app/shared/shared/shared.module';
import { TransactionsRoutingModule } from './transactions-routing-modules';
import { MyDialogComponent } from './modal/my-dialog.component';
import { FilterPipe } from './filter.pipe';
import { MAT_DATE_LOCALE } from '@angular/material/core';



@NgModule({
  declarations: [
    TransactionsListComponent,
    MyDialogComponent,
    FilterPipe
  ],
  imports: [
    CommonModule,
    SharedModule,
    TransactionsRoutingModule
  ],
  providers: [FilterPipe,
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }
  ]
})
export class TransactionsModule { }
