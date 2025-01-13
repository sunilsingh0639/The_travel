import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiEndpoints } from '../../api-endpoints';

@Injectable({
  providedIn: 'root'
})
export class SubscriberService {

  constructor( private http : HttpClient) { }

  getSubscriberList(){
    return this.http.get(ApiEndpoints.subscriber())
  }

  deleteSubscriber(id :string){
    return this.http.delete(ApiEndpoints.subscriber() +`/${id}`)
  }

  subscriberById(id :string){
    return this.http.get(ApiEndpoints.subscriber() + `/${id}` )
  }
}
