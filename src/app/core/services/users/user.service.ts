import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiEndpoints } from '../../api-endpoints';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor( private http: HttpClient) { }


  getUserById(id : any){
    return this.http.get(ApiEndpoints.getUserId()+id)
  }

  addNewUser(body:any){
    return this.http.post(ApiEndpoints.userList(),body)
  }

  getUserList(){
    return this.http.get(ApiEndpoints.userList())
  }

  updateUser(editbody: any) {
    return this.http.put(ApiEndpoints.userList(), editbody)
  }

  deleteUserById(id : any){
    return this.http.delete(ApiEndpoints.deleteUserId(id))
  }

  getRoleList(){
    return this.http.get(ApiEndpoints.roles() )
  }
  getPreviligs(){
    return this.http.get(ApiEndpoints.getPreviligs() )
  }
  getPreviligsByRole(roleId: string){
    return this.http.get(ApiEndpoints.getPreviligsByRole(roleId) )
  }
  updatePrivilege(reqData: any){
    return this.http.post(ApiEndpoints.updatePrivilege(), reqData )
  }

}


