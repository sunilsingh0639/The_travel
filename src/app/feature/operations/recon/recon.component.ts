import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder } from '@angular/forms';
import { OperationService } from './../../../core/services/operations/operation.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/core/services/commom/common.service';
@Component({
  selector: 'app-recon',
  templateUrl: './recon.component.html',
  styleUrls: ['./recon.component.scss'],
})
export class ReconComponent implements OnInit {
hideClient!:boolean
  pageNumber: number = 1;
  numberOfPages: number[] = [];
  searchForm!: FormGroup;
  allRecons: any[]=[];
  filteredRecons: any[]=[];
  filterKey: any;

  constructor(private _common:CommonService,
    private router: Router,
    private reconService: OperationService,
    private _fb: FormBuilder ,
    private _toastr : ToastrService
  ) {
  }

  tableTitle: string = 'Recon';
  showAddNew: boolean = true;

  viewRecon(i: number) {
    this.reconService.setData(i);
    this.router.navigate(['/app/operations/detail']);
  }

  editRecon(id: any) {
    this.router.navigate(['/app/operations/edit-recon/' + id]);
  }

  ngOnInit(): void {
    if(this._common.subsType =='INDIVIDUAL_COMPANY'){
      this.hideClient =true
    } else{
      this.hideClient =false
    }
    this.getRecons();
    this.initializeForm();
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

  getRecons() {
    this.reconService.getRecons().subscribe((res: any) => {
      console.log(res);
      this.allRecons = res?.data;
      this.filteredRecons = res?.data;
    });
  }

  deleteRecon(id : any){
    this.reconService.deleteReconById(id)
    .subscribe(res=>{
      this.getRecons();
      this._toastr.success('Recon Deleted SuccesFully' , 'Success')
    })
  }

  public get pages(): number[] {
    let pages = [];
    if (this.allRecons && this.allRecons.length > 0) {
      for (let index = 0; index < this.allRecons.length / 10; index++) {
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

  filter(){
    this.filteredRecons = this.filterKey ? this.allRecons.filter((res: any) => {
      {return (res.gstin.toLowerCase()).includes(this.filterKey) || res.name.includes(this.filterKey) || res.description.includes(this.filterKey) || res.client.name.includes(this.filterKey)}}) : this.allRecons ;
  }

}
