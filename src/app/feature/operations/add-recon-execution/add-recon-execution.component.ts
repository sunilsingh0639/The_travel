import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from 'src/app/core/services/commom/common.service';
import { OperationService } from 'src/app/core/services/operations/operation.service';


@Component({
  selector: 'app-add-recon-execution',
  templateUrl: './add-recon-execution.component.html',
  styleUrls: ['./add-recon-execution.component.scss']
})
export class AddReconExecutionComponent implements OnInit {
hideClient!:boolean
  executionForm!: FormGroup;
  allList: any;
  allClient: any;
  allRecons: any;
  changedFiles1: any;
  changedFiles2: any;
  fileUploadPath1: any;
  fileUploadPath2: any;

  constructor(private _common:CommonService,private _fb: FormBuilder, private _service: OperationService, 
    private _toast: ToastrService, private _router: Router) { }


  ngOnInit(): void {
    if(this._common.subsType =='INDIVIDUAL_COMPANY'){
      this.hideClient =true
    } else{
      this.hideClient =false
    }
    this.initlizationexecutionForm();
    this.clientsId();


  }

  initlizationexecutionForm() {

    this.executionForm = this._fb.group({

      client: ['', [Validators.required]],
      recon: ['', [Validators.required]],
      uplodeITCFilePath: [''],
      uploadGSTRFilePath: ['']

    });

    this.executionForm.controls['client'].valueChanges
      .subscribe((res: any) => {
        this.reconsId(res)
      });

  }


  clientsId() {

    this._service.getClients()
      .subscribe((res: any) => {

        console.log(res)
        this.allClient = res
      });
  }

  reconsId(id: string) {

    this._service.getReconsbyId(id)
      .subscribe((res: any) => {
        console.log(res)
        this.allRecons = res
      });
  }

  uploadDocument1() {

    let formData = new FormData();
    formData.append('file', this.changedFiles1);
    this._service.uploadDocument(formData)
      .subscribe((res: any) => {
        this._toast.success('File Uploaded Sucessfully','Sucess!');
        this.fileUploadPath1 = res.path
      });


  }

// first upload file //

  onFileChange1(event: any) {
    this.changedFiles1 = event.target.files[0]
  }

  fileUploads() {
    const body = {
      active: true,
      clientId: this.executionForm.value.client,
      reconId: this.executionForm.value.recon,
      fileType: this.executionForm.value.uplodeITCFilePath,
      fileUploadPath: this.fileUploadPath1,
    };
    this._service.fileUploads(body)
      .subscribe((res: any) => {
        this._toast.success('Recon added sucessfully','Sucess!');
      });

  }

  //second upload file //

  uploadDocument2() {

    let formData = new FormData();
    formData.append('file', this.changedFiles2);
    this._service.uploadDocument(formData)
      .subscribe((res: any) => {
        this._toast.success('File Uploaded Sucessfully','Sucess!');

        this.fileUploadPath2 = res.path
      });


  }

  onFileChange2(event: any) {
    this.changedFiles2 = event.target.files[0]
  }

executionRecon(){

 const data = {
    active: true,
    clientId: this.executionForm.value.client,
    reconId: this.executionForm.value.recon,
    uplodeITCFilePath: this.fileUploadPath1,
    uploadGSTRFilePath: this.fileUploadPath2,
    startedOn:"2022-12-03T10:05:59.5646+08:00",
    finishedOn:"2022-12-04T10:06:59.5646+08:00",
    status:"INPROCESS"
}

this._service.executionRecon(data)
.subscribe((res : any)=>{
  this._toast.success('Recon Added Sucessfully','Sucess!');
  this._router.navigate(['/app/operations/recon-executions'])
  console.log(res)
});


}



}
