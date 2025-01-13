import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-client-home',
  templateUrl: './client-home.component.html',
  styleUrls: ['./client-home.component.scss']
})
export class ClientHomeComponent implements OnInit {
  public chart2: any;
  public chart: any;
  constructor( ){}
ngOnInit(): void {
  this.createChart();
  this.createChart2();
}
createChart(){

  this.chart = new Chart("MyChart", {
    type: 'pie', //this denotes tha type of chart

    data: {
      labels: [
        'Reconslied',
        'Unreconslied'        ],
      datasets: [{
        label: 'My First Dataset',
        data: [300, 50],
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
createChart2(){

  this.chart2 = new Chart("MyChart2", {
    type: 'pie', //this denotes tha type of chart

    data: {
      labels: [
        'Reconslied',
        'Unreconslied' 
      ],
      datasets: [{
        label: 'My First Dataset',
        data: [30, 50],
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
}
