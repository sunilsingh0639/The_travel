import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { catchError, forkJoin } from 'rxjs';
import { DashboardService } from 'src/app/core/services/dashboard/dashboard.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss']
})
export class AdminHomeComponent implements OnInit{
  public chart: any;
  public chart2: any;
  public chart3: any;
  public chart4: any;
  taxProfessionalsCountByplan:any
  IndividualCompaniesCountByplan:any
  yearlyTaxProfessionalsCount:any
  yearlyIndividualCompaniesCount:any
  taxprofessionalsCount:any
  individualcompaniesCount:any
  reconsCount:any
  UserCount:any
 constructor(private _dashboard:DashboardService){}
 ngOnInit(): void {
  this.getDashboardData();
  
}

  getDashboardData(){
      this._dashboard.adminTaxprofessionalsCount().subscribe((res:any)=>{
                this.taxprofessionalsCount = res[0]
                    })
      this._dashboard. adminIndividualcompaniesCount().subscribe((res:any)=>{
        this.individualcompaniesCount = res[0]
                    })
     this._dashboard.adminReconsCount().subscribe((res:any)=>{
           this.reconsCount= res[0]
                  })
      this._dashboard.adminUserCount().subscribe((res:any)=>{
                    console.log(this.UserCount,res)
                  this.UserCount = res[0]
                  })
   const observable1 = this._dashboard.adminYearlyIndividualcompaniesCount();
   const observable2 = this._dashboard.adminTaxprofessionalsCountByplan();
   const observable3 = this._dashboard.adminIndividualcompaniesCountByplan();
   const observable4 = this._dashboard.adminYearlyTaxprofessionalsCount();
    
    forkJoin([observable1,observable2,observable3,observable4,])
      .pipe(
        catchError((error) => {
          console.error('An error occurred:', error);
            return [];
        })
      ).subscribe(([data1, data2,data3,data4]:any) => {
        this.yearlyIndividualCompaniesCount=data1
        this.taxProfessionalsCountByplan =data2
        this.IndividualCompaniesCountByplan =data3
        this.yearlyTaxProfessionalsCount =data4
        console.log(data1,data2,data3,data4)
        console.log(data2)
        console.log(data3)
        console.log(data4)


this.renderChart3(data4)
this.renderChart4(data1)
this.createChart(data2 )
this.createChart2(data3)
  
      });
    }



  createChart(data:any ){
    let labels = []; 
    let datasets = [];
    for(let i=0;i<data.length;i++){
       labels.push(data[i].planName)
datasets.push(data[i].count)
    }
    this.chart = new Chart("MyChart", {
      type: 'pie', //this denotes tha type of chart

      data: {
        labels: labels,
        datasets: [{
          label: 'My First Dataset',
          data: datasets,
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
  createChart2(data:any){
    let labels = []; 
    let datasets = [];
    for(let i=0;i<data.length;i++){
       labels.push(data[i].planName)
datasets.push(data[i].count)
    }
    this.chart2 = new Chart("MyChart2", {
      type: 'pie', //taxprofessionalsCountByplan

      data: {
        labels: labels,
        datasets: [{
          label: 'My First Dataset',
          data: datasets,
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
  renderChart3(data:any){
    let labels = []; 
    let datasets = [];
    for(let i=0;i<data.length;i++){
       labels.push(data[i].year)
datasets.push(data[i].totalRecords)
    }
    this.chart3 = new Chart("bar1", {
      type: 'bar',
      data: {
        labels: labels,

        datasets: [{
          label: '  Tax Professionals',
          data: datasets,
          backgroundColor:[  '#32BF84',
          '#32BF84',
        ],
          
          barPercentage:0.9,
          categoryPercentage:1,
        borderRadius: 5 ,
     },
        
      ]
      },
      options: {
        indexAxis: 'y',
      }
    });
 
  }
  renderChart4(data:any){
    let labels = []; 
    let datasets = [];
    for(let i=0;i<data.length;i++){
       labels.push(data[i].year)
datasets.push(data[i].totalRecords)
    }
    this.chart4 = new Chart("bar2", {
      type: 'bar',
      data: {
        labels:labels,

        datasets: [
        {
          label: 'Individual Companies',
          data: datasets,
          backgroundColor:[    '#FD4659',
          '#FD4659',
       
        ],
        
      borderRadius: 5 ,
        barPercentage:0.9,
        categoryPercentage:1,
          
      
        }
      ]
      },
      options: {
        indexAxis: 'y',
      }
    });
 
  }
}
