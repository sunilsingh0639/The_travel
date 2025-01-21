import { Component, OnInit } from '@angular/core';
import { NumberOfNightList } from 'src/app/modal/menu';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  numberOfNightList : any[] = NumberOfNightList;
  cities = [{ name: '', night: '' }];

  ngOnInit(): void {

  }


  // Add a new city row
  addCity() {
    if(this.cities.length <= 15) {
      this.cities.push({ name: '', night: '' });
    }    
  }

  // Remove a city row
  removeCity(index: number) {
    if(this.cities.length !== 1) {
      this.cities.splice(index, 1);
    }
  }
}