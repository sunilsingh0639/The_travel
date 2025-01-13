import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Chart, registerables } from 'node_modules/chart.js'
import { CommonService } from 'src/app/core/services/commom/common.service';
import { DashboardService } from 'src/app/core/services/dashboard/dashboard.service';
import { OperationService } from 'src/app/core/services/operations/operation.service';

@Component({
  selector: 'app-yearly-recon-dashboard',
  templateUrl: './yearly-recon-dashboard.component.html',
  styleUrls: ['./yearly-recon-dashboard.component.scss']
})
export class YearlyReconDashboardComponent implements OnInit {
  response: any;
  hideClient!: boolean
  chart: any;
  allRecons: any
  allClient: any
  totalCount:any
  yearITCCount: any
  yeargstcCount:any;
  yearMonCountITC:any;
  yearMonCountGSTR:any;
  searchForm!: FormGroup
  month!: any
  recon!: any
  client!: any
  clientId!: any
  filterRecon: any
  months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
    

  constructor(private _service: DashboardService, private reconService: OperationService, private _common: CommonService, private fb: FormBuilder) {

  }

  ngOnInit(): void {
    // this.getDashboard('3');
    this.getRecons();
    this.getClient();
    this.intialization();
    if (this._common.subsType == 'INDIVIDUAL_COMPANY') {
      this.hideClient = true
    } else {
      this.hideClient = false
    }

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
      recon: ['']
    })
  }


  getRecons() {
    this.reconService.getRecons().subscribe((res: any) => {
      console.log(res);
      this.allRecons = res?.data;
      this.filterRecon = this.allRecons
      this.getDashboard(this.filterRecon[0].id)
      // this.getDashboard(this.allRecons[0].id);
    });
  }
  getClient() {
    if (this._common.subsType !== 'INDIVIDUAL_COMPANY') {
      this.reconService.getClients().subscribe((res: any) => {

        this.allClient = res?.data;
        console.log(this.allClient);
        this.filterRecon = this.allRecons.filter((res: any) => res.client.id == this.allClient[0].id)
        console.log(this.filterRecon)
        // this.getDashboard(this.filterRecon[0].id)
        // this.getDashboard(this.filterRecon[0].id);
      });
    }
  }
  findrecon() {
    console.log(this.searchForm.value.recon)
    this.filterRecon = this.allRecons.filter((res: any) => res.client.id == this.clientId)
    console.log(this.filterRecon)
  }
  getDashboard(recon: any) {
    console.log(recon)
    this._service.yearlyreconDashboardITCCount(recon).subscribe((res: any) => {
      console.log(res)
      this.yearITCCount = res?.listOfYearlyCountAndAmountItc
      this.yeargstcCount = res?.listOfYearlyCountAndAmountGstr
      this.yearMonCountITC = res?.listOfYearlyMonthWiseCountForITC
      
      this.renderChart(this.yearMonCountITC);
      this.renderChart2(this.yearMonCountGSTR);
    })
  }


  modo() {
    this._service.yearlyreconDashboardITCCount(this.searchForm.value.recon).subscribe((res: any) => {
      console.log(res);
      this.yearITCCount = res?.listOfYearlyCountAndAmountItc
      console.log(this.yearITCCount)
      this.yeargstcCount = res?.listOfYearlyCountAndAmountGstr
      this.yearMonCountITC = res?.listOfYearlyMonthWiseCountForITC
      this.yearMonCountGSTR = res?.listOfYearlyMonthWiseCountForGSTR

      this.renderChart(this.yearMonCountITC);
      this.renderChart2(this.yearMonCountGSTR);

    })

  }
  renderChart2(data:any) {
    let labels:any[] = []; 
    let Reconciled: any[]=[]
    let UnReconciled: any[]=[]
    let gst = data ? data : [];
    let ungst=data ? data : [];
    let reconciled = gst.filter((res:any)=> res.status=='RECONCILED')
    let unReconciled = ungst.filter((res:any)=> res.status=='UNRECONCILED')
for(let i=0; i<reconciled.length;i++){
  Reconciled.push(reconciled[i].count)
  UnReconciled.push(unReconciled[i].count)
  labels.push(unReconciled[i].month)
  console.log(UnReconciled,Reconciled)
}
if(labels.length == 0)
  labels = this.months
    new Chart("doughnut2", {
      type: 'bar',
      data: {
        labels: labels,

        datasets: [{
          label: ' Reconciled',
          data: reconciled,
          backgroundColor: ['#32BF84',
            '#32BF84',
          ],
          barPercentage: 0.9,
          categoryPercentage: 1,
          borderRadius: 4,



        },
        {
          label: 'Unreconciled',
          data: UnReconciled,
          backgroundColor: ['#FD4659',
            '#FD4659',

          ],
          borderRadius: 4,
          barPercentage: 0.9,
          categoryPercentage: 1,



        }
        ]
      },
      options: {
        scales: {
          x: {
            stacked: true,
            grid: {

              display: false
            }
          },

          y: {
            stacked: true,
            beginAtZero: true,
            grid: {

              display: false
            }
          }
        },
        indexAxis: 'y',
      }
    });





  }
  

  renderChart(data:any ) {
    let labels:any[] = []; 
    let Reconciled: any[]=[]
    let UnReconciled: any[]=[]
    let gst = data
    let ungst=data
    let reconciled = gst.filter((res:any)=> res.status=='RECONCILED')
    let unReconciled = ungst.filter((res:any)=> res.status=='UNRECONCILED')
for(let i=0; i<reconciled.length;i++){
  Reconciled.push(reconciled[i].count)
  UnReconciled.push(unReconciled[i].count)
  labels.push(unReconciled[i].month)
  console.log(UnReconciled,Reconciled)
}
if(labels.length == 0)
  labels = this.months
    new Chart("doughnut", {
      type: 'bar',
      data: {
        labels: labels,

        datasets: [{
          label: ' Reconciled',
          data: Reconciled,
          backgroundColor: ['#32BF84',
            '#32BF84',
          ],
          barPercentage: 0.9,
          categoryPercentage: 1,
          borderRadius: 4,



        },
        {
          label: 'Unreconciled',
          data: unReconciled,
          backgroundColor: ['#FD4659',
            '#FD4659',

          ],
          barPercentage: 0.9,
          categoryPercentage: 1,
          borderRadius: 4,


        }
        ]
      },
      options: {
        scales: {
          x: {
            stacked: true,
            grid: {

              display: false
            }
          },

          y: {
            stacked: true,
            beginAtZero: true,
            grid: {

              display: false
            }
          }
        },
        indexAxis: 'y',
      }
    });


  }
}

