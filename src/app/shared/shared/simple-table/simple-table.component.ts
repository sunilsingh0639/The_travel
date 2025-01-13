import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-simple-table',
  templateUrl: './simple-table.component.html',
  styleUrls: ['./simple-table.component.scss']
})
export class SimpleTableComponent {
@Input()
title: string = ''
@Input()
headers: any[] = [];
@Input()
dataList: any[] = [];
@Input()
sortBy: boolean = false;
@Input()
reportBy: boolean = false;
pageNumber: number = 1;
numberOfPages: number[] = [];
public get pages(): number[] {
  let pages = [];
  if (this.dataList && this.dataList.length > 0) {
    for (let index = 0; index < this.dataList.length / 10; index++) {
      pages.push(index + 1);
    }
    return pages;
  }
  return [];
}
public get startFrom(): number {
  if (this.pageNumber > 1) {
    return this.pageNumber + 5 > this.pages[this.pages.length - 1]
      ? this.pages.length - 5
      : this.pageNumber - 1;
  }
  return 0;
}
public get end(): number {
  if (this.pageNumber > 1) {
    return this.pageNumber + 5 > this.pages[this.pages.length - 1]
      ? this.pages[this.pages.length - 1]
      : this.pageNumber + 5;
  }
  return 5;
}
}
