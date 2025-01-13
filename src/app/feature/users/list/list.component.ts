import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SpinnerService } from 'src/app/core/services/spinner/spinner.service';
import { UserService } from 'src/app/core/services/users/user.service';
import { UserListHeaders } from 'src/app/modal/table-headers';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  // animations: [
    // trigger('detailExpand', [
      // state('collapsed', style({height: '0px', minHeight: '0'})),
      // state('expanded', style({height: '*'})),
  //     transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
  //   ]),
  // ],
})
export class ListComponent {
  showAddNew: boolean = true;
  searchForm!: FormGroup;
  headers: any[] = [];
  data: any[] = [];
  userList:any;
  selectedId: any
  selectedUser: any
  responseData: any
  @Output() addNewEvent = new EventEmitter<string>();
  constructor(private router: Router,private listService: UserService,private _spinner:SpinnerService,private _fb:FormBuilder){
    this.headers = UserListHeaders;

    // this.data = USERLIST;
  }
  initializeForm() {
    this.searchForm = this._fb.group({
      keyword: [''],
    });
  }

  viewUser(id:string){
    this.selectedUser = this.responseData.find((res: any) => res.id == id) 
    //this.responseData.find((res:any) =>{ res?.id == id});
   console.log(this.selectedUser)
  }
  addNew( ){
    this.router.navigate(['app/users/add-new'])
  }
  editUser(id : string){
    this.router.navigate(['app/users/edit-user/'+id])
  }

  deleteUser(id:string){
    this.listService.deleteUserById(id)
    .subscribe((res) =>{
      this.getUserList();
    })
    // this.router.navigate(['/app/users'])
  
  }

  ngOnInit(): void {
    this.initializeForm()
    this.getUserList();
  }

  getUserList(){
    this._spinner.show();
    this.listService.getUserList()
    .subscribe((res:any) =>{
      console.log(res)
      this.userList=res?.data;
      this.selectedUser=res.data[0];
        this.responseData = res?.data;
        

    })

  }
  // filter(keyword: any) {
  //   this.responseData = keyword ? this.userList.filter( (res:any) => { return (res.name.includes(keyword) ||res.mobile.includes(keyword) || res.email.includes(keyword)|| res.role.includes(keyword))}) : this.userList;
  // }
  search(keyword: any) {
    if (keyword && keyword !== null) {
      this.responseData = keyword?this.userList.filter((res: any) => {
        return res.name.toLowerCase().includes(keyword.toLowerCase()) || res.mobile.includes(keyword);
      }) : this.userList
    }
    else {
      this.responseData = this.userList;
    }
  }
}
