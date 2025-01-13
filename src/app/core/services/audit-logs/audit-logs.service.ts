import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiEndpoints } from '../../api-endpoints';

@Injectable({
  providedIn: 'root'
})
export class AuditLogsService {

  constructor(private http: HttpClient) { }

  /***********
 * @Name : auditL ogsData
 * @Purpose : this is used to ------
 * @param : -----------------
 *********/
   
  getAuditLogData(page: number, key: string) : Observable<any>{
    return this.http.get(ApiEndpoints.auditLogs(page, key))
  }
}
