import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ApiEndpoints } from '../../api-endpoints';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private http: HttpClient) { }

  /***********
 * @Name : clientData
 * @Purpose : this is used to choose Client
 * @param : Client Deatils name, id,
 *********/

  getClientData(): Observable<any> {
    return this.http.get(ApiEndpoints.client())
  }

  getReconDataByClientId(id: any): Observable<any> {
    return this.http.get(ApiEndpoints.getReconsByClientId(id))
  }

  gstr9Data(body: any): Observable<any> {
    return this.http.post(ApiEndpoints.gstr9(), body)
  }

}


