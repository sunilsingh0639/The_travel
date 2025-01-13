import { Injectable } from '@angular/core';
import { LoginRequest } from 'src/app/modal/login';
import { ApiEndpoints } from '../../api-endpoints';
import { BehaviorSubject, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _http: HttpClient) { }

  /*****************************
 * @Name : login
 * @Purpose : this is used to verify login
 * @param : User Deatils username, password
 ***************************/
  //  login(loginRequest: ILoginRequest){
  //  return this._http.post(ApiEnpoints.login(), loginRequest)
  //  }
  
  login(body: any) {
    const headers = new HttpHeaders({
      'userName': body.userName
    });  
    return this._http.post(ApiEndpoints.login(), body,{headers});
  }
  resetPassword(body: any) {
    const headers = new HttpHeaders({
      'userName': body.userName
    });  
    return this._http.post(ApiEndpoints.resetPassword(), body, {headers});
  }
  forgotPassword(body: any) {
    return this._http.post(ApiEndpoints.forgotPassword(), body);
  }

  
}
