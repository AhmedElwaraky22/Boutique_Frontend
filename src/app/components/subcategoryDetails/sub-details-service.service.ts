import { SubDetailsinterface } from './../../main/sample/modules/sub-details-interface';
import { Subcategoryinterface } from '../../main/sample/modules/subcategoryinterface';
import { Injectable } from '@angular/core';
import { AdminSelectCategory } from '../../main/sample/modules/admin-select-category';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({ providedIn: 'root'})

export class SubDetailsServiceService {
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

   //Get All SubCategory 
  getAllSubCategory(){
    return this._httpClient.get<SubDetailsinterface>(`${environment.apiUrl}admin/admin-subcategory`);
  }

  //Get All Category 
  getAllCategory(){
    return this._httpClient.get<AdminSelectCategory>(`${environment.apiUrl}admin/admin-category`);
  }

  // Delete Category 
  deleteCategory(id:number){
    return this._httpClient.delete(`${environment.apiUrl}all/category/${id}`);
  }
  
  // Add Feature
  addSubFeature(data:any){
    return this._httpClient.post(`${environment.apiUrl}all/feature`,data);
  }

  // Add SubCategory
  addSubCategory(data:any){
    return this._httpClient.post(`${environment.apiUrl}admin/subcategory`,data);
  }

// Delete SubCategory 
  DeleteSubCategory(id:number){
    return this._httpClient.delete(`${environment.apiUrl}all/subcategory/${id}`);
  }
  
// update SubCategory 
  updateSubCategory(data:any,id:number){
    return this._httpClient.put(`${environment.apiUrl}all/subcategory/${id}`,data);
  }

    //third SubCategory
    getThirdSubCategory(){
    return this._httpClient.get<AdminSelectCategory>(`${environment.apiUrl}admin/admin-all-third-level-category`);
  }

    //update Third SubCategory
    updateThirdSubCategory(data:FormData,id:number){
    return this._httpClient.post(`${environment.apiUrl}all/subcategory/${id}`,data);
  }


   //New Subcategory
   getSubCategory(id:number){
    return this._httpClient.get<SubDetailsinterface>(`${environment.apiUrl}admin/admin-third-level-category/${id}`);
  }
  
  AddCopyFeatureValue(data:any){
    return this._httpClient.post(`${environment.apiUrl}all/feature_value/copy-values`,data);
  }

  getAllFeature(){
    return this._httpClient.get(`${environment.apiUrl}admin/admin-feature`);
  }



}
