import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiEndpoints } from '../../api-endpoints';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private _http: HttpClient) { }

  getDashboardData(){
    return this._http.get(ApiEndpoints.getDashboardData())
  }
  commonDashboard(): Observable<any> {
    return this._http.get(ApiEndpoints.getDashboardData());
  }
  totalCount(): Observable<any> {
    return this._http.get(ApiEndpoints.totalCount());
  }
  commonDashboardMismatchRecon(page:number): Observable<any> {
    return this._http.get(ApiEndpoints.commonDashboardMismatchRecon(page));
  }
  commonDashboardMismatchClientWise(page:number): Observable<any> {
    return this._http.get(ApiEndpoints.commonDashboardMismatchClientWise(page));
  }
  pendingRecon(page: number): Observable<any>{
    return  this._http.get(ApiEndpoints.pendingRecon(page))
  }
  clientStatus(): Observable<any> {
    return this._http.get(ApiEndpoints.clientStatus());
  }
  pendingReconClientWise(page: number): Observable<any> {
    return this._http.get(ApiEndpoints.pendingReconClientWise(page));
  }
  
}
