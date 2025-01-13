
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { ApiEndpoints } from '../../api-endpoints';
@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http : HttpClient) { }
  
  getProfilePic(body: any): Observable<any> {     
    return this.http.put(ApiEndpoints.getProfile(), body)
  } 
  getProfilePriviligs(): Observable<any> {     
    return this.http.get(ApiEndpoints.getProfilePriviligs())
  } 
  getPasswordPolicy( ): Observable<any> {     
    return this.http.get(ApiEndpoints.passwordPolicy())
  }
  passwordPolicy(body: any): Observable<any> {     
    return this.http.post(ApiEndpoints.passwordPolicy(), body)
  }
  upDatePasswordPolicy(body: any): Observable<any> {     
    return this.http.put(ApiEndpoints.passwordPolicy(), body)
  }

  postValidationCreate(body: any): Observable<any> {     
    return this.http.post(ApiEndpoints.fileValidation(), body)
  }
   putValidationCreate(body: any): Observable<any> {     
    return this.http.put(ApiEndpoints.fileValidation(), body)
  }


  postValidationCheck(body: any): Observable<any> {                                          
    return this.http.post(ApiEndpoints.fileDataValidation(), body)
  }

  putValidationCheck(body: any): Observable<any> {                                          
    return this.http.put(ApiEndpoints.fileDataValidation(), body)
  }

  postDuplicateCheck(body: any): Observable<any> {
    return this.http.post(ApiEndpoints.fileDuplicateCheck(), body)
  }   
  putDuplicateCheck(body: any): Observable<any> {
    return this.http.put(ApiEndpoints.fileDuplicateCheck(), body)
  }  
  getValidationCreate( ): Observable<any> {     
    return this.http.get(ApiEndpoints.fileValidation())
  }

  getValidationCheck(): Observable<any> {                                          
    return this.http.get(ApiEndpoints.fileDataValidation())
  }

  getDuplicateCheck(): Observable<any> {
    return this.http.get(ApiEndpoints.fileDuplicateCheck())
  } 
  
  getRules(id:any): Observable<any> {
    return this.http.get(ApiEndpoints.recordMatching(id))
  }
  getRecordMatching(): Observable<any> {
    return this.http.get(ApiEndpoints.saveRecordingMatching())
  }
  getRecordMatchingGlobal(): Observable<any> {
    return this.http.get(ApiEndpoints.saveRecordingMatching()+`/global`)
  }
  getProfileData(): Observable<any> {
    return this.http.get(ApiEndpoints.profileData())
  }

  updateProfileData(body: any) {
    return this.http.put(ApiEndpoints.profileData(), body)
  }

  changePassword(body: any) {
    return this.http.post(ApiEndpoints.changeProfilePassword(), body)
  }

  getPrivilages(){
    return this.http.get(ApiEndpoints.getProfilePriviligs())
  }


  private subject = new BehaviorSubject(null);

  setData(data: any) {
    this.subject.next(data);
  }

  getData() {
    return this.subject.asObservable();

  }
  getAllRules(){
    return this.http.get(ApiEndpoints.getRules())
  }
  saveRecordingMatching(data: any){
    return this.http.post(ApiEndpoints.saveRecordingMatching(), data)
  }
  updateRecordingMatching(data: any){
    return this.http.put(ApiEndpoints.saveRecordingMatching(), data)
  }

}

