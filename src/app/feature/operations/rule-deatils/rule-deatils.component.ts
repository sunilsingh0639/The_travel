import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { OperationService } from 'src/app/core/services/operations/operation.service';

@Component({
  selector: 'app-rule-deatils',
  templateUrl: './rule-deatils.component.html',
  styleUrls: ['./rule-deatils.component.scss']
})
export class RuleDeatilsComponent implements OnInit{
  rule: any;
  selected: string = 'fileValidation';
  constructor(
    private router: Router,
    private reconService: OperationService,
    private _fb: FormBuilder
  ) {}
  ngOnInit(): void {
  this.getRules();
  }

  getRules() {
    this.reconService.getRulesById(this.reconService.getRuleData()).subscribe((res: any) => {
      this.rule = res;
    });
  }

}
