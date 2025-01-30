import { Product } from './../../main/sample/modules/store-profile';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { environment } from 'environments/environment';

import { BehaviorSubject, Observable } from 'rxjs';
import { User } from 'app/auth/models';

@Injectable()
export class OrderservService implements Resolve<any> {
  public rows: any;
  public onUserListChanged: BehaviorSubject<any>;

  /**
   * Constructor
   *
   * @param {HttpClient} _httpClient
   */
  constructor(private _httpClient: HttpClient) {
    // Set the defaults
    this.onUserListChanged = new BehaviorSubject({});
  }

  /**
   * Resolver
   *
   * @param {ActivatedRouteSnapshot} route
   * @param {RouterStateSnapshot} state
   * @returns {Observable<any> | Promise<any> | any}
   */
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    return new Promise<void>((resolve, reject) => {
      Promise.all([this.getAllOrders()]).then(() => {
        resolve();
      }, reject);
    });
  }

  /**
   * Get rows
   */
  /////////////////// Orders ////////////////////////////
  getAllOrders(){
    return this._httpClient.get<Product>(`${environment.apiUrl}admin/all-orders`);
  }


  GetDeliveredOrders(){
    return this._httpClient.get(`${environment.apiUrl}admin/delivered`)
  }
  GetToWareHouse(){
    return this._httpClient.get(`${environment.apiUrl}admin/delivered_to_warehouse`)
  }
  /////////////////// Orders ////////////////////////////


  
  
  ChangeStatus(data:any,id:number){
    return this._httpClient.post(`${environment.apiUrl}admin/change-shipment-statue/${id}`,data);
  }
  
  
  GetOrderById(id:number){
    return this._httpClient.get(`${environment.apiUrl}admin/order-details/${id}`);
  }

  GetOrdersCancelled(){
    return this._httpClient.get(`${environment.apiUrl}store/cancel-by-customer`)
  }

  GetOrdersPending(){
    return  this._httpClient.get(`${environment.apiUrl}admin/ViewPendingOrders`)
  }

  getAll() {
    return this._httpClient.get<User[]>(`${environment.apiUrl}/users`);
  }

  /**
   * Get user by id
   */
  getById(id: number) {
    return this._httpClient.get<User>(`${environment.apiUrl}/users/${id}`);
  }

}
