import { StoreInterface } from './../../main/sample/modules/store-interface';

import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { environment } from 'environments/environment';

import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class StoreSService implements Resolve<any> {
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
      Promise.all([this.GetAllStore()]).then(() => {
        resolve();
      }, reject);
    });
  }

  /**
   * Get rows
   */
  GetAllStore(){
    return this._httpClient.get<StoreInterface>(`${environment.apiUrl}admin/viewallstores`);
  }
  GetAllNewStoresRequest(){
    return this._httpClient.get<StoreInterface>(`${environment.apiUrl}admin/viewstorereq`);
  }


  BannedStore(id:number){

    return this._httpClient.post(`${environment.apiUrl}admin/banned-store`,{id});

  }
  ActiveStore(id:number){

    return this._httpClient.post(`${environment.apiUrl}admin/unbanned-store`,{id});

  }
  DeleteStore(id:number){

    return this._httpClient.post(`${environment.apiUrl}admin/delete-store`,{id});

  }
  RestoreStore(id:number){

    return this._httpClient.post(`${environment.apiUrl}admin/restore-store`,{id});

  }
  VerifyStore(id:number){

    return this._httpClient.post(`${environment.apiUrl}admin/accstorereq`,{id});

  }


}
