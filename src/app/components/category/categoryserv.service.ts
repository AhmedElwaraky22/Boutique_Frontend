import { map, filter } from 'rxjs/operators';
import { Categoryinterface } from './../../main/sample/modules/categoryinterface';
import { Product } from './../../main/sample/modules/store-profile';
import { UserData } from './../../main/sample/modules/user-data';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { environment } from 'environments/environment';

import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class CategoryservService implements Resolve<any> {
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
      Promise.all([this.getAllCategory()]).then(() => {
        resolve();
      }, reject);
    });
  }

  /**
   * Get rows
   */

  // old Get All Category 
  // getAllCategory(){
  //   return this._httpClient.get<Categoryinterface>(`${environment.apiUrl}all/category`).pipe(map(x=>x['data']));
  // }

  //New Get All Categor
  getAllCategory(){
    return this._httpClient.get<Categoryinterface>(`${environment.apiUrl}admin/admin-category`);
  }

  // Get All Sub Category
  getAllSubCategory(){
    return this._httpClient.get<Categoryinterface>(`${environment.apiUrl}admin/admin-subcategory`);
  }


  // old Add Category 
  // addCategory(data:FormData){
  //   return this._httpClient.post(`${environment.apiUrl}all/category`,data);
  // }

  // New Add Category 
  addCategory(data:FormData){
    return this._httpClient.post(`${environment.apiUrl}admin/category`,data);
  }

    
  updateCategory(data:FormData,id:any){
     console.log(id);
     
    return this._httpClient.post(`${environment.apiUrl}all/update-category/${id}`,data);
  }

 
 
  addSubCategory(data:any){
    return this._httpClient.post(`${environment.apiUrl}all/subcategory`,data);
  }
  
  
add_category(data){
console.log(data);
return this._httpClient.post(`${environment.apiUrl}all/category`,data);

}

deleteCategory(id:number){
  return this._httpClient.delete(`${environment.apiUrl}all/category/${id}`);
}

 
sortCategory(payload:any) {
  return this._httpClient.post(`${environment.apiUrl}admin/category/categories-sort`,  payload );
}



}
