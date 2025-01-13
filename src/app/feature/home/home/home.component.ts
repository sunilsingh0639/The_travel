import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { catchError, forkJoin } from 'rxjs';
import { CommonService } from 'src/app/core/services/commom/common.service';
import { HomeService } from 'src/app/core/services/home/home.service';
import { SpinnerService } from 'src/app/core/services/spinner/spinner.service';
import { ClientWiseMismatchHeader, PendingReconClientWiseHeader, PendingReconsHeader, ReconWiseMismatchsHeader } from 'src/app/modal/table-headers';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
    public chart: any;
    public chart2: any;
    public response: any;
    public countResponse: any;
    public clientStatus: any;
    clientWiseMismatchHeader: any[] = ClientWiseMismatchHeader;
    clientWiseMismat:any
    reconWiseMismatchsHeader: any[] = ReconWiseMismatchsHeader;
    reconWiseMismat:any
    pendingReconsHeader : any[] = PendingReconsHeader;
    pendingReconClientWiseHeader: any[] = PendingReconClientWiseHeader;
    pendingReconWise:any
    pendingReconClientWise:any
    constructor(private _service: HomeService, private _spinner: SpinnerService, private _common: CommonService){}
//    Invoices = [{
//     invoice_no: '25000351',
//     customer: 'Valentine Morin',
//     img: 'avatar-1.jpg',
//     email: "euismod.enim@outlook.net",
//     date: new Date(2021, 3,  23, 21, 58),
//     invoice_amount: 875,
//     status: 'Paid',
//     billing_address: {
//         full_name: 'Valentine Morin',
//         address: '5114 Adipiscing St. Puno United States 46782',
//         phone: '(926) 817-7835',
//         tax: '123456789'
//     },
//     shipping_address: {
//         full_name: 'Quamar Payne',
//         address: '534-1477 Non, Av. Bury St. Edmunds France 10846',
//         phone: '(926) 817-7835',
//         tax: '123456789'
//     },
   
//     payment_details: {
//         payment_method: 'VISA',
//         card_holder_name: 'Reese Jacobs',
//         card_number: '4024007179348742',
//         total_amount: 415.96
//     },
//     company_details: {
//         legal_registration_no: "987654",
//         email: 'velzon@themesbrand.com',
//         website: 'www.themesbrand.com',
//         contact_no: '0123456789',
//         address: 'California, United States',
//         zip_code: '90201'
//     },
//     order_summary: {
//         sub_total: 359.96,
//         estimated_tex: 44.99,
//         discount: 53.99,
//         shipping_charge: 65.00,
//         total_amount: 415.96,
//     },
//     notes: 'All accounts are to be paid within 7 days from receipt of invoice. To be paid by cheque or credit card or direct payment online. If account is not paid within 7 days the credits details supplied as confirmation of work undertaken will be charged the agreed quoted fee noted above.'
// }];
ngOnInit(): void {
  this.getDashboardData();
  if(this.isCompany){
    const i = this.reconWiseMismatchsHeader.findIndex(res => res.key=='clientName');
    if(i > -1){
      this.reconWiseMismatchsHeader.splice(i,1);
    }
    const j = this.pendingReconsHeader.findIndex(res => res.key=='clientName');
    if(j > -1){
      this.pendingReconsHeader.splice(j,1);
    }
  }
  }
createChart(d1: number, d2: number){
  
    this.chart = new Chart("MyChart", {
      type: 'pie', //this denotes tha type of chart

      data: {
        labels: [ 
          'Pending Client', 'Finished Client',  
             ],
        datasets: [{
          label: 'My First Dataset',
          data: [d1, d2],
          backgroundColor: [ 
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)'
          ],
          hoverOffset: 4
        }]
      }
    });
  }
  createChart2(finishedRecons: number, pendingRecons: number){
  
    this.chart2 = new Chart("MyChart2", {
      type: 'pie', //this denotes tha type of chart

      data: {
        labels: [
        
          'Pending Recon',  'Finished Recon',
        ],
        datasets: [{
          label: 'My First Dataset',
          data: [ pendingRecons,finishedRecons,],
          backgroundColor: [  
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)'
          ],
          hoverOffset: 4
        }]
      }
    });
  }
  // getDashboardData(){
  //   this._service.getDashboardData()
  //   .subscribe(res => {
  //     this.response = res;
  //     this.createChart(res);
  //     this.createChart2(res);
  //   })
  // }
  getDashboardData(){
    const observable1 = this._service.getDashboardData();
    const observable2 = this._service.totalCount();
    const observable3 = this._service.pendingRecon(1);
    const observable4 = this._service.clientStatus();
    const observable5 = this._service.pendingReconClientWise(1);
    const observable6 =this._service.commonDashboardMismatchRecon(1);
    const observable7 =this._service.commonDashboardMismatchClientWise(1)
    this._spinner.show();
    forkJoin([observable2,observable2,observable3,observable4,observable5,observable6,observable7])
      .pipe(
        catchError((error) => {
          console.error('An error occurred:', error);
              this._spinner.hide();

          return [];
        })
      )
      .subscribe(([data1, data2,data3,data4,data5,data6,data7]) => {
        console.log(data1,data2,data3,data4,data5)
        this.countResponse = data2;
        this.pendingReconWise =data3
        this.pendingReconClientWise =data5
        this.reconWiseMismat =data6
        this.clientWiseMismat =data7
        console.log(data3,data5)
        this._spinner.hide();
        this.createChart(data1.totalClientsRecords, data4[0]?.clientCount);
        this.createChart2(data1.totalFinishedReconsRecord ,data1.totalPendingReconsCount);
      });
  }
  
  public get isCompany() : boolean {
    return this._common.subsType == 'INDIVIDUAL_COMPANY';
  }
  
}
