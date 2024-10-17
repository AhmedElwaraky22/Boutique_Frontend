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
export class TagServiceService {

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
  getAllCategory(){
    return this._httpClient.get<Categoryinterface>(`${environment.apiUrl}all/tag`).pipe(map(x=>x['tags']));
  }

  addTags(data:any){
    console.log(data);
    
    return this._httpClient.post(`${environment.apiUrl}all/tag`,{name:data});
  }

    
  updateTag(data:any,id:any){
     console.log(id);
     console.log(data);
     
    return this._httpClient.post(`${environment.apiUrl}all/update-tag/${id}`,data);
  }

  
  
deleteCategory(id:number){
    return this._httpClient.delete(`${environment.apiUrl}all/category/${id}`);
  }
  
  
  addSubCategory(data:any){
    return this._httpClient.post(`${environment.apiUrl}all/subcategory`,data);
  }

}
