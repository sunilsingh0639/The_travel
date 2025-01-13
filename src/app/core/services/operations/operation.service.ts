import { BehaviorSubject } from 'rxjs';
import { ApiEndpoints } from './../../api-endpoints';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class OperationService {
  constructor(private http: HttpClient) {}

  uploadDocument(body: any) {
    return this.http.post(ApiEndpoints.uploadDocument(), body);
  }

  fileUploads(body: any) {
    return this.http.post(ApiEndpoints.fileUploads(), body);
  }

  fileEidte(body: any) {
    return this.http.put(ApiEndpoints.fileUploads(), body);
  }

  getClients() {
    return this.http.get(ApiEndpoints.client());
  }

  getReconsbyId(id: string) {
    return this.http.get(ApiEndpoints.reconbyId(id));
  }

  addRecons(body: any) {
    return this.http.post(ApiEndpoints.reconAdd(), body);
  }

  editRecons(body: any) {
    return this.http.put(ApiEndpoints.reconAdd(), body);
  }

  getRecons() {
    return this.http.get(ApiEndpoints.reconAdd());
  }

  deleteReconById(id: string) {
    return this.http.delete(ApiEndpoints.reconAdd() + `/${id}`);
  }

  fileUploadList() {
    return this.http.get(ApiEndpoints.fileUploads());
  }

  
  getClientById(id: any) {
    return this.http.get(ApiEndpoints.client() + `/${id}`);
  }
  
  getFileDataById(id: any) {
    return this.http.get(ApiEndpoints.fileUploads() + `/${id}`);
  }
  
  /////////// for file validations
  getReconsWithFileValidations(id: any) {
    return this.http.get(ApiEndpoints.fileValidation() + `/client/${id}`);
  }
  
  getFileValidationByReconId(id: any) {
    return this.http.get(ApiEndpoints.fileValidation() + `/recon/${id}`);
  } 
  
  addFileValidationByReconId(body :any){
    return this.http.post(ApiEndpoints.fileValidation() + `/by-recon` , body) ;
  }
  putFileValidationByReconId(body :any){
    return this.http.put(ApiEndpoints.fileValidation() + `/by-recon` , body) ;
  }

  /////////// for file data validations
  getReconsWithFileDataValidations(id: any) {
    return this.http.get(ApiEndpoints.fileDataValidation() + `/client/${id}`);
  }

  getFileDataValidationByReconId(id: any) {
    return this.http.get(ApiEndpoints.fileDataValidation() + `/${id}`);
  }
  dataDuplicateCheckByReconId(id: any) {
    return this.http.get(ApiEndpoints.dataDuplicateCheckByReconId(id));
  }

  getRecordMatchings(id: any) {
    return this.http.get(ApiEndpoints.recordMatching(id));
  }
  postRecordMatchings(id: any,data:any) {
    return this.http.post(ApiEndpoints.recordMatching(id),data);
  }
  fileDataValidationByReconId(id: any) {
    return this.http.get(ApiEndpoints.fileDataValidationByReconId(id));
  }
  getAllColums() {
    return this.http.get(ApiEndpoints.getAllColums());
  }
  getAllOperators() {
    return this.http.get(ApiEndpoints.getAllOperator());
  }
  addFileDataValidationByReconId(body :any){
    return this.http.post(ApiEndpoints.fileDataValidation() + `/by-recon/` , body) ;
  }
  putFileDataValidationByReconId(body :any){
    return this.http.put(ApiEndpoints.fileDataValidation() + `/by-recon/` , body) ;
  }

  /////////// for file duplicate check
  getReconsWithFileDuplicateCheck(id: any) {
    return this.http.get(ApiEndpoints.fileDuplicateCheck() + `/client/${id}`);
  }

  getFileDuplicateCheckByReconId(id: any) {
    return this.http.get(ApiEndpoints.fileDuplicateCheck() +`/recon`+ `/${id}`);
  }

  addFileDuplicateCheckByReconId(body :any){
    return this.http.post(ApiEndpoints.fileDuplicateCheck() + `/by-recon` , body) ;
  }
  putFileDuplicateCheckByReconId(body :any){
    return this.http.post(ApiEndpoints.fileDuplicateCheck() + `/by-recon` , body) ;
  }



  ///////////////////////////////  subject //////////////////////////

  private subject = new BehaviorSubject(null);

  setData(body: any) {
    sessionStorage.setItem('recon', body);
    // this.subject.next(body);
  }
  setRuleData(body: any) {
    sessionStorage.setItem('rule', body);
    // this.subject.next(body);
  }
  getReconId() {
    return sessionStorage.getItem('recon')  || '';
  }
  getRuleData() {
    const data = sessionStorage.getItem('rule')  || '';
    return data;
  }
  executionRecon(body: any) {
    return this.http.post(ApiEndpoints.executionRecon(), body);
  }

  getExecution(){

    return this.http.get(ApiEndpoints.executionRecon());
  }
  getexecutionById(id: any){
    return this.http.get(ApiEndpoints.executionRecon()+`/${id}`);
  }
  getReconOperationByExecutionId(id: any){
    return this.http.get(ApiEndpoints.getReconOperationByExecutionId()+`/${id}`);
  }
  getGSTRDataByReconId(id: any){
    return this.http.get(ApiEndpoints.getGSTRDataByReconId()+`/${id}`);
  }
  getITCDataByReconId(id: any){
    return this.http.get(ApiEndpoints.getITCDataByReconId()+`/${id}`);
  }
  deleteFileUplode(id : any){
    return this.http.delete(ApiEndpoints.fileUploads()  + `/${id}`);

  }
  executionreconCount(){
    return this.http.get(ApiEndpoints.executionreconCount(3));
  }

  addRule(body:any){
    return this.http.post(ApiEndpoints.addRules(), body);
  }
  getRules(){
    return this.http.get(ApiEndpoints.getRules())
  }
  getRulesById(id: any){
    return this.http.get(ApiEndpoints.getRules()+`/${id}`)
  }
  getReconById(id: any){
    return this.http.get(ApiEndpoints.reconAdd()+`/${id}`)
  }

  getReconByClientId(id: any){
    return this.http.get(ApiEndpoints.getReconsByClientId(id))
  }
}
