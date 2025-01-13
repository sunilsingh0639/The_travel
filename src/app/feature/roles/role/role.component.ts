import { Component, OnInit } from '@angular/core';
import { SpinnerService } from 'src/app/core/services/spinner/spinner.service';
import { UserService } from 'src/app/core/services/users/user.service';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})
export class RoleComponent implements OnInit {
  rolesList: any[] = [];
  editButton!:boolean;
  allPrivileges: any[] = [];
  constructor(private _service: UserService, private _spinner: SpinnerService){}
  ngOnInit(): void {
    this.getPreviligs();
   this.editButton=false
  }
  getRole() {
    this._spinner.show();
    this._service.getRoleList()
    .subscribe((res:any) => {
      res.data.forEach((element: any) => {
        element.display = this.capitalizeString(element.name)
      });
        this.rolesList = res.data;
        this.rolesList.forEach((element, index) => {
          element.listOfPrivilege.forEach((val: any) => {
            val.active = true;
          });
          this.allPrivileges.forEach(privilege => {
           const i = element.listOfPrivilege.findIndex((res: any) => res.name.toLowerCase() == privilege.name.toLowerCase());
           if(i == -1){ 
            privilege.active = false;
            element.listOfPrivilege.push(privilege)
          }
          }) ;
            // element.listOfPrivilege = [...this.allPrivileges];
            // element.listOfPrivilege.forEach((subElement : any) => {
            //   if(res.data && res.data[index].listOfPrivilege.length > 0){
            //     const isAvilable = res.data[index].listOfPrivilege.findIndex((res: any) => res.name.toLowerCase() == subElement.name.toLowerCase());
            //     subElement.active = isAvilable > -1 ? true : false;
            //   } else{
            //     subElement.active = false;
            //   }
            // });
        });
      });
  }

  numberActivePrevilege(listOfPrivilege: any){
    const i = listOfPrivilege.filter((res: any) => res.active)
    return i.length;
  }

  capitalizeString(str: string) {
    const words = str.split('_');
    const capitalizedWords = words.map(word => {
      word = word.toLowerCase();
      return word.charAt(0).toUpperCase() + word.slice(1);
    });
    const capitalizedStr = capitalizedWords.join(' ');
  
    return capitalizedStr;
  }
  getPreviligs() {
    this._spinner.show();
    this._service.getPreviligs()
    .subscribe((res:any) => {
      this.allPrivileges = res.data;
      this.getRole();
   
      });
  }
  getPreviligsByRole(id: string) {
    this._spinner.show();
    this._service.getPreviligsByRole(id)
    .subscribe((res:any) => {
      this.rolesList.forEach(element => {
        if(element.id == id){
          element.listOfPrivilege = this.allPrivileges;
          element.listOfPrivilege.forEach((subElement : any) => {
            if(res.data && res.data.length > 0){
              const isAvilable = res.data.findIndex((res: any) => res.id == subElement.id);
              subElement.active = isAvilable > -1 ? true : false;
            } else{
              subElement.active = false;
            }
          });
        }
      });
      });
  }
  editUser(){
    this.editButton=true
  }
  editfalse(){
    this.editButton=false;
    this.getPreviligs();
  }
  updatePriviligs(data: any){
    data.listOfPrivilege.forEach((element : any) => {
      element.roleId = data.id;
      if(element.active){
        element.toBeDeleted = false; 
      } else{
        element.toBeDeleted = true;
      }
    
    });
    const reqData = {
      "roleId": data.id,
      "privilegeVos": data.listOfPrivilege
     }
     this._spinner.show();
    this._service.updatePrivilege(reqData)
    .subscribe(res => {
      this._spinner.hide();
    })
  }
}
