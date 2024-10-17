import { Featureinterface } from './../../main/sample/modules/featureinterface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { environment } from 'environments/environment';

import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class FeatureservService implements Resolve<any> {
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
      Promise.all([this.getAllFeature()]).then(() => {
        resolve();
      }, reject);
    });
  }

  /**
   * Get rows
   */
  getAllFeature(){
    return this._httpClient.get<Featureinterface>(`${environment.apiUrl}admin/admin-feature`);
  }
 
  addFeatureValues(values:any,feature_id:number){
    return this._httpClient.post(`${environment.apiUrl}all/feature_value`,{values ,feature_id});
  }



  updateFeatureValue(data,value_id:number){
    return this._httpClient.put(`${environment.apiUrl}all/feature_value/${value_id}`,data);
  }


  // updateFeature
  updateFeature(name_en:string,name_ar:string,feature_id:number){
    return this._httpClient.put(`${environment.apiUrl}all/feature/${feature_id}`,{name_ar,name_en});
  }

  
  DeleteFeature(feature_id:number){
    return this._httpClient.delete(`${environment.apiUrl}all/feature/${feature_id}`);
  }

  DeleteFeatureValue(feature_id:number){
    return this._httpClient.delete(`${environment.apiUrl}all/feature_value/${feature_id}`);
  }

  AddCopyFeatureValue(data:any){
    return this._httpClient.post(`${environment.apiUrl}all/feature_value/copy-values`,data);
  }

  

}
