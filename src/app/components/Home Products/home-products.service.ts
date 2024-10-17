import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { environment } from 'environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';





@Injectable({
  providedIn: 'root'
})


export class HomeProductsService {

  public rows: any;
  public onUserListChanged: BehaviorSubject<any>;

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
      Promise.all([this.GetNewArrival()]).then(() => {
        resolve();
      }, reject);
    });
  }

  ///////////////////////// Product ///////////////////////
  GetNewArrival(){
    return this._httpClient.get(`${environment.apiUrl}user/new-arrivals`);
  }

  GetTopProducts(){
    return this._httpClient.get(`${environment.apiUrl}user/top-products`);
  }
  
  GetNewDiscount(){
    return this._httpClient.get(`${environment.apiUrl}user/new-discounts`);
  }
  
 
  deleteHomeProduct(id: number) {
    // const body = { id, type, index };
    return this._httpClient.delete(`${environment.apiUrl}admin/home-products/${id}`);
  }
}
