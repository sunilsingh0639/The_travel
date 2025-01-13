import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiEndpoints } from 'src/app/core/api-endpoints';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(private _http : HttpClient) { }


gstrTransaction(){

return this._http.get(ApiEndpoints.gstrTransaction());

}
submitReview(reqData: any){
  return this._http.post(ApiEndpoints.submitReview(), reqData);
  }

itcTransaction(){

  return this._http.get(ApiEndpoints.itcTransaction());
}
itcFilterTransaction(query: any){
  return this._http.get(ApiEndpoints.itcFilterTransaction(query));
}
itcExportTransaction(reqData: any){

  return this._http.post(ApiEndpoints.itcExportTransaction(), reqData);
}
gstrExportTransaction(reqData: any){

  return this._http.post(ApiEndpoints.gstrExportTransaction(), reqData);
}
gstrFilterTransaction(query: string){
  return this._http.get(ApiEndpoints.gstrFilterTransaction(query));
}
getInvalidGstrTrans(query: string){
  return this._http.get(ApiEndpoints.getInvalidGstrTrans(query));
}
getItcInvalidTrans(query: string){
  return this._http.get(ApiEndpoints.getItcInvalidTrans(query));
}
getClients() {
  return this._http.get(ApiEndpoints.client());
}

getReconsbyClientId(id: string) {
  return this._http.get(ApiEndpoints.getReconsByClientId(id));
}
transistionUnMatch(fileType: string){
  return this._http.get(ApiEndpoints.transistionUnMatch(fileType))
}
reconMatching(reqData: any){
  return this._http.post(ApiEndpoints.reconmatching(), reqData);
}
updateItcData(reqData: any){
  return this._http.put(ApiEndpoints.updateItcData(), reqData);
}
updateIncorrectItcData(reqData: any){
  return this._http.put(ApiEndpoints.updateIncorrectITCData(), reqData);
}
updateGSTR2BData(reqData: any){
  return this._http.put(ApiEndpoints.updateGSTRData(), reqData);
}
updateIncorrectGSTRData(reqData: any){
  return this._http.put(ApiEndpoints.updateIncorrectGSTRData(), reqData);
}
discardInvalidGSTR(reqData: any){
  return this._http.put(ApiEndpoints.discardInvalidGstr()+`/discard`, reqData);
}
discardInvalidITC(reqData: any){
  return this._http.put(ApiEndpoints.discardInvalidItc()+`/discard`, reqData);
}
discardITC(reqData: any){
  return this._http.put(ApiEndpoints.updateItcData()+`/discard`, reqData);
}
discardGSTR(reqData: any){
  return this._http.put(ApiEndpoints.updateGSTRData()+`/discard`, reqData);
}
}
