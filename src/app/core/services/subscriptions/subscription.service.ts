import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiEndpoints } from '../../api-endpoints';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {

  constructor(private _http: HttpClient) { }

  signUp(id: any) {
    return this._http.post(ApiEndpoints.subscription(id), {});
  }
  signUpSave(reqData: any) {
    const headers = new HttpHeaders({
      'tenantId': reqData.signUpStage3.firstName
    });  
    return this._http.post(ApiEndpoints.subscriptionSave(),reqData, {headers});
  }

  plans() {
    return this._http.get(ApiEndpoints.plan());
  }

  signUpStage1(body: any) {
    return this._http.post(ApiEndpoints.signUpStage1(), body);
  }
  signUpStage2(body: any) {
    return this._http.post(ApiEndpoints.signUpStage2(), body);
  }
  signUpStage3(body: any) {
    return this._http.post(ApiEndpoints.signUpStage3(), body);
  }
  
}
