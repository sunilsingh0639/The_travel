import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-deatil-view',
  templateUrl: './deatil-view.component.html',
  styleUrls: ['./deatil-view.component.scss']
})
export class DeatilViewComponent {
@Input() selected!: any;
selectedFilter: string = 'filters'
}
