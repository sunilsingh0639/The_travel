import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/core/services/users/user.service';
import { UserListHeaders } from 'src/app/modal/table-headers';

@Component({
  selector: 'app-deatils',
  templateUrl: './deatils.component.html',
  styleUrls: ['./deatils.component.scss'],
})
export class DeatilsComponent implements OnInit {
  userList: any;
  id: any;
  allUser: any;
  headers: any[] = [];
  selectedUser: any;
  selectedId : any

  constructor(
    private detailService: UserService,
    private _active: ActivatedRoute,
    private _router : Router
  ) {
    //  this._route.paramMap.subscribe((params)=>{
    //   this.id =params.get('id');
    //  })
    this.headers = UserListHeaders;
  }

  ngOnInit() {
    this.selectedId =
     this._active.snapshot.paramMap.get('id');
    this.detailService.getUserById(this.selectedId)
    .subscribe((res) => {
      this.selectedUser = res;
      // console.log(this.selectedUser)
    });

  }



}
