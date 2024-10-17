import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Categoryinterface } from 'app/main/sample/modules/categoryinterface';
import { environment } from 'environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProblemServiceService {


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
      Promise.all([this.getAllProblem()]).then(() => {
        resolve();
      }, reject);
    });
  }

  /**
   * Get rows
   */
  getAllProblem(){
    return this._httpClient.get(`${environment.apiUrl}admin/get-all-problems`);
  }


  
  
deleteCategory(id:number){
    return this._httpClient.delete(`${environment.apiUrl}all/category/${id}`);
  }
  
  
  changeStatus(data:any){
    return this._httpClient.post(`${environment.apiUrl}admin/change-Problem-status`,data);
  }

  pay(){
  
    return this._httpClient.post(`${environment.apiUrl}all/pay`,[]);


  }

  
}
