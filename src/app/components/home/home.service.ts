import {  ApexChartInterFace } from '../../main/sample/modules/apex-chart';
import { StoreReport } from '../../main/sample/modules/store-report';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private _http:HttpClient) { }

  GetAllStoreReport(){
    return this. _http.get<StoreReport>(`${environment.apiUrl}admin/count-all-report`);
  }


  GetAllData(){
    return this._http.get<any>(`${environment.apiUrl}admin/count-data`);}
  
    GetUserApex(){
    return this._http.get<ApexChartInterFace>(`${environment.apiUrl}admin/user-apex-chart`);
  }
  GetOrderApex(){
    return this._http.get(`${environment.apiUrl}admin/order-apex-chart`);
  }

  getAllOrders(){
    return this._http.get(`${environment.apiUrl}admin/all-orders`);
  }

  getAllRoles(){
    return this._http.get(`${environment.apiUrl}admin/roles`);
  }

  getAllRestrictions(){
    return this._http.get(`${environment.apiUrl}admin/all-restrictions`);
  }
  Register(Data){
    return this._http.post(`${environment.apiUrl}admin/register` , Data);
  }
  
}
