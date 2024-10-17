// import { SecondSubDetailsInterface } from './../../main/sample/modules/sub-details-interface';
import { AdminSelectCategory } from './../../main/sample/modules/admin-select-category';
import { Subcategory } from './../../main/sample/modules/store-profile';
import { Subcategoryinterface } from './../../main/sample/modules/subcategoryinterface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Featureinterface } from 'app/main/sample/modules/featureinterface';
import { environment } from 'environments/environment';

import { BehaviorSubject, Observable } from 'rxjs';



@Injectable()

export class SubcategoryserviceService implements Resolve<any> {
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
      Promise.all([this.getAllSubCategory()]).then(() => {
        resolve();
      }, reject);
    });
  }

  /**
   * Get rows
   */


  
  // getAllSubCategory(){
  //   return this._httpClient.get<Subcategoryinterface>(`${environment.apiUrl}admin/admin-subcategory`);
  // }

  //New Subcategory
  getAllSubCategory(){
    return this._httpClient.get<Subcategoryinterface>(`${environment.apiUrl}admin/admin-second-level-category`);
  }


 

  //New Subcategory
  getSubCategory(id:number){
    return this._httpClient.get<Subcategoryinterface>(`${environment.apiUrl}admin/admin-third-level-category/${id}`);
  }

  //  Get All Category 
  getAllCategory(){
    return this._httpClient.get<AdminSelectCategory>(`${environment.apiUrl}admin/admin-category`);
  }

    // //New Get All Category 
    // getAllCategory(){
    //   return this._httpClient.get<AdminSelectCategory>(`${environment.apiUrl}admin/category`);
    // }
  
  
deleteCategory(id:number){
    return this._httpClient.delete(`${environment.apiUrl}all/category/${id}`);
  }
  
  
  addSubFeature(data:any){
    return this._httpClient.post(`${environment.apiUrl}all/feature`,data);
  }

  // Old Add Sub
  // addSubCategory(data:any){
  //   return this._httpClient.post(`${environment.apiUrl}all/subcategory`,data);
  // }

  // New Add Sub
  addSubCategory(data:any){

    return this._httpClient.post(`${environment.apiUrl}admin/subcategory`,data);
  }


  DeleteSubCategory(id:number){
    return this._httpClient.delete(`${environment.apiUrl}all/subcategory/${id}`);
  }
  
  
  updateSubCategory(data:FormData,id:number){
    return this._httpClient.post(`${environment.apiUrl}all/subcategory/${id}`,data);
  }


  //Second Sub Category
  // getSecondSubCategory(){
  // return this._httpClient.get<AdminSelectCategory>(`${environment.apiUrl}admin/admin-second-level-category`);
  // }

  
  //third Sub Category
  // getThirdsubCategory(id:number){
  // return this._httpClient.get<AdminSelectCategory>(`${environment.apiUrl}admin/admin-third-level-category/${id}`);
  // }


  AddCopyFeatureValue(data:any){
    return this._httpClient.post(`${environment.apiUrl}all/feature_value/copy-values`,data);
  }

  getAllFeature(){
    return this._httpClient.get<Featureinterface>(`${environment.apiUrl}admin/admin-feature`);
  }


}
