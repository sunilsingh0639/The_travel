import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  cities = [{ name: '', night: '' }];

  ngOnInit(): void {

  }


  // Add a new city row
  addCity() {
    this.cities.push({ name: '', night: '' });
  }

  // Remove a city row
  removeCity(index: number) {
    this.cities.splice(index, 1);
  }
}