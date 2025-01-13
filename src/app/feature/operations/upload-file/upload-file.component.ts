import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { OperationService } from './../../../core/services/operations/operation.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from 'src/app/core/services/commom/common.service';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss'],
})
export class UploadFileComponent implements OnInit {
  fileUploadForm!: FormGroup;
  changedFiles!: any;
  allClients: any;
  fileUploadPath: any;
  allRecons: any;
  selectedId: any;
  editMode: boolean = false;
  fileUpload: boolean = false;
  disabledSave: boolean = false;
  fileName: any;

  constructor(
    private uploadService: OperationService,
    private _fb: FormBuilder,
    private _route: Router,
    private _router: ActivatedRoute,
    private _toast: ToastrService,
    private _common: CommonService
  ) { }

  ngOnInit(): void {
    this.initializeFileUploadForm();
    this.getClients();
    if (this._route.url.includes('edit-File')) {
      this.editMode = true;
      this.selectedId = this._router.snapshot.paramMap.get('id');
      this.updateData();
      this.getClients();
      this.getReconByClientId(this.fileById?.clientId)
    }
  }

  initializeFileUploadForm() {
    this.fileUploadForm = this._fb.group({
      clientId: ['', Validators.required],
      reconId: ['', Validators.required],
      type: ['', Validators.required],
      fileUpload: ['', Validators.required],
    });
    if(this.isCompany){
      this.fileUploadForm.patchValue({
        clientId: this._common.client.id
      })
      this.getReconByClientId(this._common.client.id)
    }
    this.fileUploadForm.controls['clientId'].valueChanges.subscribe((res) => {
      this.getReconByClientId(res);
    });
  }

  getClients() {
    this.uploadService.getClients().subscribe((res: any) => {
      this.allClients = res.data;
    });
  }

  getReconByClientId(id: string) {
    this.uploadService.getReconByClientId(id).subscribe((res: any) => {
      this.allRecons = res.data;
    });
  }

  uploaddocument() {
    if (this.fileUpload = true) {
      let formData = new FormData();
      formData.append('file', this.changedFiles);
      this.uploadService.uploadDocument(formData).subscribe((res: any) => {
        this.fileUploadPath = res.path;
        this.fileName = res.fileName
        this._toast.success('File Uploaded Sucessfully', 'Sucess!');
        this.disabledSave = true
      });
    } else {

    }
  }

  onFileChange(event: any) {
    this.changedFiles = event.target.files[0];
  }

  fileUploads() {
    if (this.editMode == true) {
      const editBody = {
        id: this.fileById.id,
        active: true,
        clientId: this.fileById.clientId,
        reconId: this.fileById.reconId,
        fileType: this.fileUploadForm.value.type,
        fileUploadPath: this.fileUploadPath,
        fileName: this.fileById.fileName,
      };
      this.uploadService.fileEidte(editBody).subscribe((res: any) => {
        console.log(res);
      });
      this.editMode = false;
    } else {
      const body = {
        active: true,
        clientId: this.fileUploadForm.value.clientId,
        reconId: this.fileUploadForm.value.reconId,
        fileType: this.fileUploadForm.value.type,
        fileUploadPath: this.fileUploadPath,
        fileName: this.fileName,
      };
      this.uploadService.fileUploads(body).subscribe((res: any) => {
        this._toast.success('File Uploaded Sucessfully', 'Sucess!');
      });
    }
    this._route.navigate(['/app/operations']);
  }

  allFilesList: any;

  fileById: any;
  updateData() {
    this.uploadService
      .getFileDataById(this.selectedId)
      .subscribe((res: any) => {
        this.fileById = res;
        this.fileUploadForm.patchValue({
          clientId: this.fileById?.clientId,
          reconId: this.fileById?.reconId,
          type: this.fileById?.fileType,
          // fileUpload: this.fileById?.fileUploadPath,
        });
      });
  }

  get uploadform() {
    return this.fileUploadForm.controls;
  }
  
  public get isCompany() : boolean {
    if(this._common.subsType =='INDIVIDUAL_COMPANY'){
      return true
    } 
    return false;
  }
  
}
