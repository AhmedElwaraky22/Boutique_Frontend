import { UserData } from './../../main/sample/modules/user-data';

import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { environment } from 'environments/environment';

import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class UsersService implements Resolve<any> {
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
      Promise.all([this.GetAllUsers()]).then(() => {
        resolve();
      }, reject);
    });
  }

  /**
   * Get rows
   */
  GetAllUsers(){
    return this._httpClient.get<UserData>(`${environment.apiUrl}admin/all-user`);
  }

  

  DeleteUser(id:number){

    return this._httpClient.post(`${environment.apiUrl}admin/delete-user`,{id});

  }

  RestoreUser(id:number){

    return this._httpClient.post(`${environment.apiUrl}admin/restore-user`,{id});

  }
  BannedUser(id:number){

    return this._httpClient.post(`${environment.apiUrl}admin/banned-user`,{id});

  }
  ActiveUser(id:number){

    return this._httpClient.post(`${environment.apiUrl}admin/unbanned-user`,{id});

  }







}
