import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiEndpoints } from '../core/api-endpoints';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private http: HttpClient) { }
  public selected!: boolean;


  notificationList(i:number){
    return this.http.get(ApiEndpoints.notification()+`maxResults=${i}&seen=true`);
  }

  downloadRecons(i:number){
    return this.http.get(ApiEndpoints.downloadRecons()+`?maxResults=${i}`)
  }
  downloadFileExportes(){
    return this.http.get(ApiEndpoints.downloadFileExportes())
  }
}
