import { Component, Renderer2, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SubscriberService } from 'src/app/core/services/subscribers/subscriber.service';
import { SubscribersListHeader } from 'src/app/modal/table-headers';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})

export class ListComponent implements OnInit {
  headers: any[] = SubscribersListHeader
  subscriberList: any;
  allSubscriber: any;
  allSubscriberList: any;
  searchForm!: FormGroup;
  selectedId: any
  susbcriberId: any

  constructor(private _toast: ToastrService, private router: Router, private renderer: Renderer2, private el: ElementRef, private _listService: SubscriberService, private _fb: FormBuilder) { }
  ngOnInit(): void {
    this.gettingSubscriberList();
    this.initializeForm();
  }

  delete(res:any) {
    this._listService.deleteSubscriber(this.selectedId)
      .subscribe(res => {
        console.log(res)
        this.gettingSubscriberList()
      })
  }

  editSubscriber(i: any) { }

  initializeForm() {
    this.searchForm = this._fb.group({
      keyword: [''],
    });
  }

  viewSubscriber(id: any) {     this._listService.subscriberById(id)
    .subscribe((res) => {
      console.log(res)
      this.selectedId = res
    })
 
  }

  gettingSubscriberList() {
    this._listService.getSubscriberList()
      .subscribe((res: any) => {
        this.allSubscriber = res?.data
        this.subscriberList = res?.data
        console.log(this.subscriberList) 
        this.allSubscriberList = res
        this.getSubscriber()
      })

   
  }  getSubscriber(){
    this._listService.subscriberById(this.subscriberList[0].id).subscribe((res:any)=>{
      this.selectedId = res
      console.log(res)
    })
   }

  search(keyword: any) {
    if ( keyword && keyword!==null ) {
      this.subscriberList = keyword ? this.allSubscriber.filter((res: any) => {
        return  res.companyName.includes(keyword) || res.subscriberType.includes(keyword);
      }) :this.allSubscriber
    }
    else {
      this.subscriberList = this.allSubscriber;
    }
  }
}



