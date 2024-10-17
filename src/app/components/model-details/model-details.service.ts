import { Injectable } from '@angular/core';
import { Product } from './../../main/sample/modules/store-profile';
import { UserData } from './../../main/sample/modules/user-data';

import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { environment } from 'environments/environment';

import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})

export class ModelDetailsService {
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
    Promise.all([this.GetAllProducts()]).then(() => {
      resolve();
    }, reject);
  });
}



  /**
   * Get rows
   */
  GetAllProducts(){
    return this._httpClient.get<Product>(`${environment.apiUrl}admin/all-products`);
  }


    //New Get All Category
    getAllCategory(){
      return this._httpClient.get(`${environment.apiUrl}admin/admin-category`);
    }

      //New Subcategory
    getSubCategory(id:number){
      return this._httpClient.get(`${environment.apiUrl}admin/admin-third-level-category/${id}`);
    }
























}
