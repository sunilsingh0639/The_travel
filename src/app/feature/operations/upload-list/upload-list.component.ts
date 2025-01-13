
import { FormGroup, FormBuilder } from '@angular/forms';
import { OperationService } from './../../../core/services/operations/operation.service';
import { Component, Renderer2, ElementRef, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import {   FileListHeaders } from 'src/app/modal/table-headers';

@Component({
  selector: 'app-upload-list',
  templateUrl: './upload-list.component.html',
  styleUrls: ['./upload-list.component.scss'],
})
export class UploadListComponent implements OnInit {
  allFilesList:any[] = [];
  selectedClient: any;
  selectedClientByRecon:any
  clients:any;
  searchForm!: FormGroup;
  filteredFilesList: any[] = [];
  filteredClient!: any[];

  constructor(
    private router: Router,
    private renderer: Renderer2,
    private el: ElementRef,
    private uploadListService: OperationService,
    private _fb: FormBuilder
  ) { }
  @Output() addNewEvent = new EventEmitter<string>();
  tableTitle: string = 'File Uploads';
  showAddNew: boolean = true;
  headers: any[] =FileListHeaders;
  ngOnInit(): void {
    
    this.getUploadList();
    this.initializeForm();
    this.getClient();
   
    
    
  }
  viewUser() {
    this.router.navigate(['app/users/deatils']);
  }

  public viewClientData: any
  viewClient(i: any) {
    this.selectedClient = this.filteredFilesList.find(res => res.id == i);
    this.selectedClientByRecon = this.clients.find( (item:any) => item.id == this.selectedClient?.clientId );
  }

  // viewClient(i: number) {

  
  //     this.uploadListService.getClientById(this.allFilesList[i]?.clientId )
  //     .subscribe((res) => {
  //       console.log(res);
  //       this.selectedClient = res;
  //     });

    
  //   }
 
  

  //   var codeBlock = `<div class="card-body text-center">                            
  //                             <h5 class="mt-4 mb-1">${this.selectedClient?.clientName}</h5>
  //                             <p class="text-muted"></p>
  //                             <p class="text-muted mb-4"></p>
  
  //                             <ul class="list-inline mb-0">
  //                                 <li class="list-inline-item avatar-xs">
  //                                     <a href="javascript:void(0);" class="avatar-title bg-soft-success text-success fs-15 rounded">
  //                                         <i class="ri-phone-line"></i>
  //                                     </a>
  //                                 </li>
  //                                 <li class="list-inline-item avatar-xs">
  //                                     <a href="javascript:void(0);" class="avatar-title bg-soft-danger text-danger fs-15 rounded">
  //                                         <i class="ri-mail-line"></i>
  //                                     </a>
  //                                 </li>
  //                                 <li class="list-inline-item avatar-xs">
  //                                     <a href="javascript:void(0);" class="avatar-title bg-soft-warning text-warning fs-15 rounded">
  //                                         <i class="ri-question-answer-line"></i>
  //                                     </a>
  //                                 </li>
  //                             </ul>
  //                         </div>
  //                         <div class="card-body">
  //                             <h6 class="text-muted text-uppercase fw-semibold mb-3">Detail</h6>                            
  //                             <div class="table-responsive table-card">
  //                                 <table class="table table-borderless mb-0">
  //                                     <tbody>
                                                                                   
  //                                     <tr>
  //                                     <td class="fw-medium" scope="row">ID</td>
  //                                     <td>${this.allFilesList[i].id} </td>
  //                                 </tr>
  //                                 <tr>
  //                                   <td class="fw-medium" scope="row">UPLOADED ON</td>
  //                                   <td>${this.allFilesList[i].uploadedOn}</td>
  //                               </tr>
  //                               <tr>
  //                                   <td class="fw-medium" scope="row">FILE</td>
  //                                   <td>${this.allFilesList[i].fileName}</td>
  //                               </tr>
  //                                         <tr>
  //                                             <td class="fw-medium" scope="row">Last Status</td>
  //                                             <td class="badge-soft-success text-uppercase">
  //                                             ${this.allFilesList[i].status}</td>
  //                                         </tr>                                                                                
  //                                     </tbody>
  //                                 </table>
  //                             </div>
  //                         </div>`;
  //   const div = this.el.nativeElement.querySelector('#contact-view-detail');
  //   this.renderer.setProperty(div, 'innerHTML', codeBlock);
  // }



  initializeForm() {
    this.searchForm = this._fb.group({
      keyword: [''],
    });
  }
  clientFilterById:any
  getUploadList() {
    this.uploadListService.fileUploadList().subscribe((res: any) => {
      console.log(res);
      this.allFilesList = res;
      this.filteredFilesList = res;
      this.clientFilterById = res[0]?.clientId
      this.selectedClient = res[0];
      console.log(this.clientFilterById)
      console.log(this.selectedClient?.clientId)
    });
  }

  getClient(){
    this.uploadListService.getClients( ).subscribe((res:any) => {
      console.log(res);
      this.clients = res?.data;
      console.log(this.clients);
      this.selectedClientByRecon = this.clients.find( (item:any) => item.id == this.selectedClient?.clientId );
      console.log(this.selectedClientByRecon)
  
    });

  }

 

 
  editUplodeFile(i: string) {
    this.router.navigateByUrl('/app/operations/edit-File/' + i);
  }

  deleteUplodeFile(id: any) {
    this.uploadListService.deleteFileUplode(id).subscribe((res: any) => {
      console.log(res)
      this.getUploadList();
    })
   

  }


  search(keyword: any) {
    if (keyword && keyword !== null) {
      this.filteredFilesList = keyword ? this.allFilesList.filter((res: any) => {
        return res.fileName.includes(keyword) ;
      }) : this.allFilesList
      console.log(this.filteredClient)
    }
    else {
      this.filteredFilesList = this.allFilesList;
    }
  }
}


