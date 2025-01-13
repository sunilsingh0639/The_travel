import { Component } from '@angular/core';
import{Chart,registerables  } from 'node_modules/chart.js'
import { CommonService } from 'src/app/core/services/commom/common.service';
import { DashboardService } from 'src/app/core/services/dashboard/dashboard.service';
import { ItcPendingReconsHeader } from 'src/app/modal/table-headers';
Chart.register(...registerables);

@Component({
  selector: 'app-supplier-dashboard',
  templateUrl: './supplier-dashboard.component.html',
  styleUrls: ['./supplier-dashboard.component.scss']
})
export class SupplierDashboardComponent {
  hideClient!:boolean
  response: any;
  itcPendingReconsHeader: any[] = ItcPendingReconsHeader;
  constructor(private _service: DashboardService,private _common:CommonService){
  }

  ngOnInit(): void {
    this.getSupplierDashboard();
    if(this._common.subsType =='INDIVIDUAL_COMPANY'){
      this.hideClient =true
    } else{
      this.hideClient =false
    }
  }

  renderChart2(){
    new Chart("doughnut2", {
      type: 'bar',
      data: {
        labels: ['Jan','February', 'march', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],

        datasets: [{
          label: ' Reconciled',
          data: [2, 19, 15, 5, 2, 13,30,50,10,9,8,20],
          backgroundColor:[   '#32BF84',
          '#32BF84',
       ],
       barPercentage:0.9,
       categoryPercentage:1,
     borderRadius: 4 ,
      
        },
        {
          label: 'Unreconciled',
          data: [2, 19, 15, 5, 2, 13,30,50,10,9,8,30],
          backgroundColor:[  '#FD4659',
          '#FD4659',
       
          ],
          barPercentage:0.9,
          categoryPercentage:1,
        borderRadius: 4 ,
      
        }
      ]
      },
      options: {
        scales:{ x:{ stacked : true,
          grid:{
            
            display: false
          }},
      
        y:{ stacked:true,
           beginAtZero: true,
           grid:{
            
            display: false
          }} },
          indexAxis: 'y',
      }
    });
  
  
    
    
  
  }



  renderChart(){
    new Chart("doughnut", {
      type: 'bar',
      data: {
        labels: ['Jan','February', 'march', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],

        datasets: [{
          label: ' Reconciled',
          data: [2, 19, 15, 5, 2, 13,30,50,10,9,8,20],
          backgroundColor:[   '#32BF84',
          '#32BF84',
       ],
       barPercentage:0.9,
       categoryPercentage:1,
     borderRadius: 4 ,
      
        },
        {
          label: 'Unreconciled',
          data: [2, 19, 15, 5, 2, 13,30,50,10,9,8,30],
          backgroundColor:[  '#FD4659',
          '#FD4659',
       
          ],
          barPercentage:0.9,
          categoryPercentage:1,
        borderRadius: 4 ,
          
      
        }
      ]
      },
      options: {
        scales:{ x:{ stacked : true,
          grid:{
            
            display: false
          }},
      
        y:{ stacked:true,
           beginAtZero: true,
           grid:{
            
            display: false
          }} },
          indexAxis: 'y',
      }
    });
  
  
    
    
  
  }



  tableData: any[]=[

    { File:"ITC",Count:56565,Amount:57685,Tax:67545,UMCount:56765,UMAmount:576775,UMTax:6745,TCount:56665,TAmount:57675,TTax:6764, },
    { File:"GSTR2B",Count:565,Amount:557685,Tax:67745,UMCount:5665,UMAmount:5785,UMTax:676745,TCount:5765,TAmount:56885,TTax:657645, },
    { File:"ITC",Count:567865,Amount:578685,Tax:6778645,UMCount:56765,UMAmount:5785,UMTax:677645,TCount:57765,TAmount:57685,TTax:677845, },
    
  ]
dataForITC: any[]=[
  {Invoice:"BS2223A2304211",Gstin:"29AABCF0520E1Z7",SuppName:"EBIX TRAVELS PRIVATE LIMITED",Amount:5544,Tax:6755,},
  {Invoice:"BS2223A2304211",Gstin:"29AABCF0520E1Z7",SuppName:"EBIX TRAVELS PRIVATE LIMITED",Amount:56544,Tax:565,},
  {Invoice:"BS2223A2304211",Gstin:"29AABCF0520E1Z7",SuppName:"EBIX TRAVELS PRIVATE LIMITED",Amount:5544,Tax:5667,},
]
dataForGSTR2B: any[]=[
  {Invoice:"BS2223A2304211",Gstin:"29AABCF0520E1Z7",SuppName:"EBIX TRAVELS PRIVATE LIMITED",Amount:6544,Tax:5655,},
  {Invoice:"BS2223A2304211",Gstin:"29AABCF0520E1Z7",SuppName:"EBIX TRAVELS PRIVATE LIMITED",Amount:5644,Tax:56567,},
  {Invoice:"BS2223A2304211",Gstin:"29AABCF0520E1Z7",SuppName:"EBIX TRAVELS PRIVATE LIMITED",Amount:5644,Tax:56567,},
]

getSupplierDashboard(){
  this._service.getSupplierDashboard()
  .subscribe(res => {
    this.response = res;
    this.renderChart();
    this.renderChart2();
  })
}
}
