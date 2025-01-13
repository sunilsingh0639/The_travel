import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiEndpoints } from '../../api-endpoints';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http: HttpClient) { }
  public selected!: boolean;
  /********************
   * this api use to get all client list 
   * ********************* */

  getClientList() {
    return this.http.get(ApiEndpoints.client())
  }
  /************************************
   *  this api use to post add new client
   **************************************/
  addClient(body: any) {
    return this.http.post(ApiEndpoints.client(), body)
  }

  updateClient(body: any) {
    return this.http.put(ApiEndpoints.client(), body)
  }
  deleteClient(id: string) {
    return this.http.delete(ApiEndpoints.client()+'/'+id)
  }
  getClientById(clientId:any) {
    return this.http.get(ApiEndpoints.client() +'/'+clientId)
  }

  getClient(){
    return this.http.get(ApiEndpoints.client());
  }

  getRecon(){
    return this.http.get(ApiEndpoints.executionRecon())
  }
  getReonsByClientId(clientId: string){
    return this.http.get(ApiEndpoints.getReonsByClientId(clientId))
  }
  getRuleListByReconId(reconId: string){
    return this.http.get(ApiEndpoints.getRuleListByReconId(reconId))
  }
  getManualMatchGSTR2BData(reconId: string){
    return this.http.get(ApiEndpoints.getManualMatchGSTR2BData(reconId))
  }
  getManualMatchITCData(reconId: number){
    return this.http.get(ApiEndpoints.getManualMatchITCData(reconId))
  }
  acceptManualMatchData(reqData: any){
    return this.http.put(ApiEndpoints.acceptManualMatchData(), reqData)
  }
  rejectManualMatchData(reqData: any){
    return this.http.delete(ApiEndpoints.rejectManualMatchData(), reqData)
  }
  saveManualMatch(reqData: any){
    return this.http.post(ApiEndpoints.manualMatch(), reqData)
  }
}

