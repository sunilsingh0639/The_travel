import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiEndpoints } from '../../api-endpoints';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  role: string = '';
  
  constructor(private _http:HttpClient) { }

  
  public  setToken(v : string) {
    localStorage.setItem('token', v)
  }
  public  setTenantId(v : string) {
    localStorage.setItem('tenantId', v)
  }
public setProfilePic(v:string){
  localStorage.setItem('profilePictureLink',v)

}
public  setRole(v : string) {
    localStorage.setItem('role', v)
  }

  public setSubscriberType(v : string) {
    localStorage.setItem('subsType', v)
  }

  public setClient(v : string) {
    sessionStorage.setItem('client', JSON.stringify(v))
  }
  public get subsType() : string {
    return localStorage.getItem('subsType') || '';
  }
  
  
  public setLoginUserId(v : string) {
    sessionStorage.setItem('id', v);
  }
  
  
  public get loginId() : string {
    const id  = sessionStorage.getItem('id') || '';
    return id;
  }
  
  public get proFileImage():string{
    const profoleLink = localStorage.getItem('profilePictureLink')||''
    return  profoleLink;
  }
  
  public get client() : any {
    const id  = JSON.parse(localStorage.getItem('client') || '');
    return id;
  }
  
  
  public get token() : string {
    return localStorage.getItem('token') || ''
  }
  public get tenantId() : string {
    return localStorage.getItem('tenantId') ||'gst-portal'
  }

  
  public get loginType() : string {
    this.role = localStorage.getItem('role') || ''
    return this.role;
  }




  uploadFile(body : any){

   return this._http.post(ApiEndpoints.fileUploads(),body)

    
    }
  
  executionRecon(body : any){

    return this._http.post(ApiEndpoints.executionRecon(),body);

  }
  getUserProfile(){
    return  this._http.get(ApiEndpoints.getUserProfile(this.loginId))
  }
  getReconsbyId(id: string){

    return this._http.get(ApiEndpoints.reconbyId(id));
  }
  clientId(){

    return this._http.get(ApiEndpoints.client());
  }
  

}
