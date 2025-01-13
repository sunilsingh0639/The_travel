import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/core/services/commom/common.service';
import { ReportService } from 'src/app/core/services/reports/report.service';

@Component({
  selector: 'app-download-gstr9b',
  templateUrl: './download-gstr9b.component.html',
  styleUrls: ['./download-gstr9b.component.scss']
})
export class DownloadGstr9bComponent implements OnInit {
hideClient!:boolean
  gstr9bDataForm!: FormGroup
  allClientData: any
  allReconData: any
  selectedClientId: any


  constructor(private _common:CommonService,private fb: FormBuilder, private router: Router, private reportService: ReportService) { }

  ngOnInit(): void {
    if(this._common.subsType =='INDIVIDUAL_COMPANY'){
      this.hideClient =true
    } else{
      this.hideClient =false
    }
    this.getClientData();
    this.intializeForm();
  }

  intializeForm() {
    this.gstr9bDataForm = this.fb.group({
      client: ['', Validators.required],
      recon: ['', Validators.required]

    });
    this.gstr9bDataForm.controls['client'].valueChanges
    .subscribe(res =>{
      this.selectedClientId = res
      this.getReconData();
    })
  }

  getClientData() {
    this.reportService.getClientData()
      .subscribe((res: any) => {
        console.log(res)
        this.allClientData = res
      })
  }

  getReconData() {
    this.reportService.getReconDataByClientId(this.selectedClientId)
      .subscribe((res: any) => {
        console.log(res)
        this.allReconData = res
      })
  }

  saveData() {
    var data = {
      "active":true,
      "clientId": this.gstr9bDataForm.value.client,
      "reconId": this.gstr9bDataForm.value.recon,
      "gstr9Constants": "GSTR9"
    }
    this.reportService.gstr9Data(data)
      .subscribe((response: any) => {
        console.log(response);
      })
  }

  cancel(){
    location.reload(); 
}

}
