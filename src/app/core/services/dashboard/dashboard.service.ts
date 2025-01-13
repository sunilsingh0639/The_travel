import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiEndpoints } from '../../api-endpoints';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  
  constructor(private _http: HttpClient) { }

 adminTaxprofessionalsCount(){
    return this._http.get(ApiEndpoints.getAdminDashboardData()+`taxprofessionals-count`)
  }
  adminIndividualcompaniesCount(){
    return this._http.get(ApiEndpoints.getAdminDashboardData()+`individualcompanies-count`)
  }
  adminReconsCount(){
    return this._http.get(ApiEndpoints.getAdminDashboardData()+`recons-count`)
  }
  adminUserCount(){
    return this._http.get(ApiEndpoints.getAdminDashboardData()+`users-count`)
  }
  adminYearlyIndividualcompaniesCount() :Observable<any>{
    return this._http.get(ApiEndpoints.getAdminDashboardData()+`yearly-individualcompanies-count`)
  }
  adminYearlyTaxprofessionalsCount() :Observable<any>{
    return this._http.get(ApiEndpoints.getAdminDashboardData()+`yearly-taxprofessionals-count`)
  }
  adminIndividualcompaniesCountByplan():Observable<any>{
    return this._http.get(ApiEndpoints.getAdminDashboardData()+`individualcompanies-count-byplan`)
  }
  adminTaxprofessionalsCountByplan():Observable<any>{
    return this._http.get(ApiEndpoints.getAdminDashboardData()+`taxprofessionals-count-byplan`)
  }

  getDashboardData(){
    return this._http.get(ApiEndpoints.getDashboardData())
  }

  getSupplierDashboard(){
    return this._http.post(ApiEndpoints.getSupplierDashboard(),{})
  }
  supplierrecondashboard(){
    return this._http.post(ApiEndpoints.supplierrecondashboard(),{})
  }

  yearlyreconDashboardITCCount(reconId:any){
    return this._http.get(ApiEndpoints.yearlyrecondashboard() +`${reconId}?columns[0][data]=year&columns[0][search][value]=2023&columns[1][data]=reconId&columns[1][search][value]=${reconId}`)
  }
////////////////////monthlydashboard api////////////////////////////////////////////////////////////
///////////////////monthlydashboard api/////////////////////////////////////////////////////////////

monthlySataus(month:any,recon:any):Observable<any>{
  return this._http.get(ApiEndpoints.monthlyrecondashboard()+`status-count?columns[0][data]=month&columns[0][search][value]=${month}&columns[1][data]=year&columns[1][search][value]=2023&columns[2][data]=reconId&columns[2][search][value]=${recon}`)
}
monthlyCount(month:any,recon:any):Observable<any>{
  return this._http.get(ApiEndpoints.monthlyrecondashboard()+`count-amount?columns[0][data]=month&columns[0][search][value]=${month}&columns[1][data]=year&columns[1][search][value]=2023&columns[2][data]=reconId&columns[2][search][value]=${recon}`)
}
monthlyUnreconciled(month:any,recon:any):Observable<any>{
  return this._http.get(ApiEndpoints.monthlyrecondashboard()+ `unreconciled?columns[0][data]=month&columns[0][search][value]=${month}&columns[1][data]=year&columns[1][search][value]=2023&columns[2][data]=reconId&columns[2][search][value]=${recon}`)
}
monthlyPreviousUnreconciled(month:any,recon:any):Observable<any>{
  return this._http.get(ApiEndpoints.monthlyrecondashboard()+ `previous/unreconciled?columns[0][data]=month&columns[0][search][value]=${month}&columns[1][data]=year&columns[1][search][value]=2023&columns[2][data]=reconId&columns[2][search][value]=3&columns[3][data]=pmonth&columns[3][search][value]=${recon}`)
}



////////////////////suplierdashboard api////////////////////////////////////////////////////////////
///////////////////suplierdashboard api/////////////////////////////////////////////////////////////
  suplierDashboardTotalCount(month:any,recon:any):Observable<any>{
    return this._http.get(ApiEndpoints.suplierDashboard() + `/totalsuppliers-count?columns[0][data]=month&columns[0][search][value]=${month}&columns[1][data]=reconId&columns[1][search][value]=${recon}`)
  }
  suplierDashboardTotalSuplierCount(month:any,recon:any):Observable<any>{
    return this._http.get(ApiEndpoints.suplierDashboard() + `/totalsupplierstype-count?columns[0][data]=month&columns[0][search][value]=${month}&columns[1][data]=reconId&columns[1][search][value]=${recon}`)
  }
  suplierDashboardSupplierAmountMismatch(month:any,recon:any):Observable<any>{
    return this._http.get(ApiEndpoints.suplierDashboard()+`/suppliersamount-mismatch?columns[0][data]=month&columns[0][search][value]=${month}&columns[1][data]=reconId&columns[1][search][value]=${recon}`)
  }
  suplierDashboardInvoiceMismatch(month:any,recon:any):Observable<any>{
    return this._http.get(ApiEndpoints.suplierDashboard()+`/suppliersinvoice-mismatch?columns[0][data]=month&columns[0][search][value]=${month}&columns[1][data]=reconId&columns[1][search][value]=${recon}`)
  }
  suplierDashboardInvoiceNotInGSTR2B(month:any,recon:any):Observable<any>{
    return this._http.get(ApiEndpoints.suplierDashboard()+`/invoicenotin-gstr2b?columns[0][data]=month&columns[0][search][value]=${month}&columns[1][data]=reconId&columns[1][search][value]=${recon}`)
  }
  suplierDashboardInvoiceNotInITC(month:any,recon:any):Observable<any>{
    return this._http.get(ApiEndpoints.suplierDashboard()+`/invoicenotin-itc?columns[0][data]=month&columns[0][search][value]=${month}&columns[1][data]=reconId&columns[1][search][value]=${recon}`)
  }
  suplierDashboardInvoiceAmountMismatch(month:any,recon:any):Observable<any>{
    return this._http.get(ApiEndpoints.suplierDashboard()+`/invoiceamount-mismatch?columns[0][data]=month&columns[0][search][value]=${month}&columns[1][data]=reconId&columns[1][search][value]=${recon}`)
  }
}
