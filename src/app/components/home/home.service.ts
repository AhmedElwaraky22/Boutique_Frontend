import {  ApexChartInterFace } from '../../main/sample/modules/apex-chart';
import { StoreReport } from '../../main/sample/modules/store-report';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private HttpC:HttpClient) { }

  GetAllStoreReport(){
    return this.HttpC.get<StoreReport>(`${environment.apiUrl}admin/count-all-report`);
  }


  GetAllData(){
    return this.HttpC.get<any>(`${environment.apiUrl}admin/count-data`);}
  
    GetUserApex(){
    return this.HttpC.get<ApexChartInterFace>(`${environment.apiUrl}admin/user-apex-chart`);
  }
  GetOrderApex(){
    return this.HttpC.get(`${environment.apiUrl}admin/order-apex-chart`);
  }

  getAllOrders(){
    return this.HttpC.get(`${environment.apiUrl}admin/all-orders`);
  }

  
}
