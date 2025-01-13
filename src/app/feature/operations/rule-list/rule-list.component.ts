import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { OperationService } from 'src/app/core/services/operations/operation.service';
import { ruleListHeader } from 'src/app/modal/table-headers';

@Component({
  selector: 'app-rule-list',
  templateUrl: './rule-list.component.html',
  styleUrls: ['./rule-list.component.scss']
})
export class RuleListComponent {
  @Output() addNewEvent = new EventEmitter<string>();
  
headers:any[] =ruleListHeader
searchForm!: FormGroup;
allRules: any[]=[];
filteredRules: any[]=[] 
filterKey: any;

  constructor(
    private router: Router,
    private reconService: OperationService,
    private _fb: FormBuilder ,
    private _toastr : ToastrService
  ) {}

  tableTitle: string = 'Recon';
  showAddNew: boolean = true;

  viewRule(i: any) {
    this.reconService.setRuleData(i);
    this.router.navigate(['/app/operations/rule-deatils']);
  }

  editRule(id: any) {
    this.router.navigate(['/app/operations/edit-rule/' + id]);
  }

  ngOnInit(): void {
    this.initializeForm();
    this.getRules();
  }

  initializeForm() {
    this.searchForm = this._fb.group({
      keyword: [''],
    });
    this.searchForm.controls['keyword'].valueChanges
    .subscribe(res => {
      this.filterKey = res
    })
  }

  getRules() {
    this.reconService.getRules().subscribe((res: any) => {
      console.log(res);
      this.allRules = res?.data;
      this.filteredRules = res?.data;
    });
  }


  filter(){
    this.filteredRules = this.filterKey ? this.allRules.filter((res: any) => {
      {return   res.ruleType.includes(this.filterKey) || res.name.includes(this.filterKey)}}) : this.allRules ;
  }
}
