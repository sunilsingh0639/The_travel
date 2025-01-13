import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { catchError, forkJoin } from 'rxjs';
import { ClientService } from 'src/app/core/services/clients/client.service';
import { CommonService } from 'src/app/core/services/commom/common.service';
import { DashboardService } from 'src/app/core/services/dashboard/dashboard.service';
import { OperationService } from 'src/app/core/services/operations/operation.service';
import { InvoiceAmountMismatch, InvoiceINGSTR2B } from 'src/app/modal/table-headers';

@Component({
  selector: 'app-recon-dashboard',
  templateUrl: './recon-dashboard.component.html',
  styleUrls: ['./recon-dashboard.component.scss']
})
export class ReconDashboardComponent {
  hideClient!: boolean 
  InvoiceAmountMismatch: any[] = InvoiceAmountMismatch;
  InvoiceINGSTR2B: any[] = InvoiceINGSTR2B
  totalCount!: any
  totalSuplierCount: any
  suplierAmountMis: any
  invoiceMis: any[]=[]
  totalInvoiceMiss!:any
  totalAmountMiss!:any
  invoiceNotInITC: any[]=[]
  invoiceInGSTR2B: any[]=[]
  invoiceAmountMis: any
  allRecons: any[]=[]
  allClient: any[]=[]
  searchForm!: FormGroup
  month!: any
  recon!: any
  filterRecon!:any
  client!:any
  clientId!:any
  months: any[] = [{ name: 'January', date: 1 }, { name: 'February', date: 2 }, { name: 'March', date: 3 }, { name: 'April', date: 4 }, { name: 'May', date: 5 }, { name: 'June', date: 6 }, { name: 'July', date: 7 }, { name: 'August', date: '8' }, { name: 'September', date: '9' }, { name: 'October', date: '10' }, { name: 'November', date: '11' }, { name: 'December', date: '12' },
]

  constructor(private reconService: OperationService, private _service: DashboardService, private _common: CommonService, private fb: FormBuilder) {

  }
  
  ngOnInit(): void {
    this.getRecons();
    
    this.intialization();
    if (this._common.subsType == 'INDIVIDUAL_COMPANY') {
      this.hideClient = true
    } else if(this._common.subsType !== 'INDIVIDUAL_COMPANY') {
      this.hideClient = false
      this.getClient();
    }

    this.month = this.searchForm.get('month');
    this.month?.valueChanges.subscribe((value: any) => {
      console.log(value)
    })

    this.recon = this.searchForm.get('recon');
    this.recon?.valueChanges.subscribe((value: any) => {
      console.log(value)
    })
    this.client = this.searchForm.get('client');
    this.client?.valueChanges.subscribe((value: any) => {
      this.clientId = value
      console.log(this.clientId)
    })
   
  }
  intialization() {
    this.searchForm = this.fb.group({
      client: [''],
      month: [''],
      recon: ['']
    })
  }
  getRecons() {
    this.reconService.getRecons().subscribe((res: any) => {
      
      this.allRecons = res?.data;
      this.filterRecon = this.allRecons
      console.log(this.allRecons);
      this.filterRecon = this.allRecons
      this.getDashboard(1,this.filterRecon[0].id);
    
    //   this.filterRecon = this.allRecons.filter((res:any)=> res.client.id ==16)
    // console.log(this.filterRecon)
    });
  }
  getClient() {
    if(this._common.subsType !== 'INDIVIDUAL_COMPANY'){
    this.reconService.getClients().subscribe((res: any) => {
      
      this.allClient = res?.data;
      console.log(this.allClient);
      this.filterRecon = this.allRecons.filter((res:any)=> res.client.id == this.allClient[0].id)
    console.log(this.filterRecon)
    this.getDashboard(1,this.filterRecon[0].id);
    });
  }}

  findrecon(){
    this.filterRecon = this.allRecons.filter((res:any)=> res.client.id == this.clientId)
    console.log(this.filterRecon)
  }
 
  modo() {

    const observable1 = this._service.suplierDashboardInvoiceMismatch(this.searchForm.value.month,this.searchForm.value.recon);
    const observable2 = this._service.suplierDashboardTotalCount(this.searchForm.value.month,this.searchForm.value.recon);
    const observable3 = this._service.suplierDashboardTotalSuplierCount(this.searchForm.value.month,this.searchForm.value.recon);
    const observable4 = this._service.suplierDashboardSupplierAmountMismatch(this.searchForm.value.month,this.searchForm.value.recon);
    const observable5 = this._service.suplierDashboardInvoiceNotInITC(this.searchForm.value.month,this.searchForm.value.recon);
    const observable6 = this._service.suplierDashboardInvoiceNotInGSTR2B(this.searchForm.value.month,this.searchForm.value.recon);
    const observable7 = this._service.suplierDashboardInvoiceAmountMismatch(this.searchForm.value.month,this.searchForm.value.recon);
    
    forkJoin([observable1,observable2,observable3,observable4,observable5,observable6,observable7])
      .pipe(
        catchError((error) => {
          console.error('An error occurred:', error);
          // this._spinner.show();

          return [];
        })
      )
      .subscribe(([data1,data2,data3,data4,data5,data6,data7]) => {
        this.totalInvoiceMiss =0;
        for(let i=0;i<data1.length;i++){
          this.totalInvoiceMiss += parseInt(data1[i]?.totalMismatchCount) 
          console.log(data1[i].totalMismatchCount)
          console.log(this.totalInvoiceMiss)
        }
        this.totalAmountMiss =0;
        for(let i=0;i<data4.length;i++){
          this.totalAmountMiss += parseInt(data4[i]?.invoice_count) 
    
        }
       
        this.invoiceMis = data1;


        this.totalCount = data2;
        this.totalSuplierCount = data3;
        this.suplierAmountMis = data4;
        this.invoiceNotInITC = data5;
        this.invoiceInGSTR2B = data6;
        this.invoiceAmountMis = data7

      })

  }



  getDashboard(month:any,recon:any) {
  console.log(month,recon)

  const observable1 = this._service.suplierDashboardInvoiceMismatch(month,recon);
  const observable2 = this._service.suplierDashboardTotalCount(month,recon);
  const observable3 = this._service.suplierDashboardTotalSuplierCount(month,recon);
  const observable4 = this._service.suplierDashboardSupplierAmountMismatch(month,recon);
  const observable5 = this._service.suplierDashboardInvoiceNotInITC(month,recon);
  const observable6 = this._service.suplierDashboardInvoiceNotInGSTR2B(month,recon);
  const observable7 = this._service.suplierDashboardInvoiceAmountMismatch(month,recon);
  
  forkJoin([observable1,observable2,observable3,observable4,observable5,observable6,observable7])
    .pipe(
      catchError((error) => {
        console.error('An error occurred:', error);
        // this._spinner.show();

        return [];
      })
    )
    .subscribe(([data1,data2,data3,data4,data5,data6,data7]) => {
      this.totalInvoiceMiss =0;
      for(let i=0;i<data1.length;i++){
        this.totalInvoiceMiss += parseInt(data1[i]?.totalMismatchCount) 
        console.log(data1[i].totalMismatchCount)
        console.log(this.totalInvoiceMiss)
      }

      this.totalAmountMiss =0;
      for(let i=0;i<data4.length;i++){
        this.totalAmountMiss += parseInt(data4[i]?.invoice_count) 
   
      }
      this.invoiceMis = data1;
      this.totalCount = data2;
      this.totalSuplierCount = data3;
      this.suplierAmountMis = data4;
      this.invoiceNotInITC = data5;
      this.invoiceInGSTR2B = data6;
      this.invoiceAmountMis = data7

    })
  }
}