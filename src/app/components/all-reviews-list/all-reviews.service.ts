import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { environment } from 'environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AllReviewsService {
  public onUserListChanged: BehaviorSubject<any>;

  constructor(private _httpClient: HttpClient) { 
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



  getAllCategory(){
    return this._httpClient.get(`${environment.apiUrl}admin/admin-category`);
  }














}
