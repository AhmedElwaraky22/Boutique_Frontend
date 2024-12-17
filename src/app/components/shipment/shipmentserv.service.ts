import { Injectable ,  } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';



@Injectable({providedIn: 'root'})

export class ShipmentservService  implements Resolve<any> {
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
      Promise.all([this.getAllPendingShipment()]).then(() => {
        resolve();
      }, reject);
    });
  }

  // privious_shipments
  getAllPerviousShipment(){
    return this._httpClient.get(`${environment.apiUrl}admin/privious_shipments`)
  }

  // pending_shipments
  getAllPendingShipment(){
    return this._httpClient.get(`${environment.apiUrl}admin/pending_shipments`)
  }

  // preparing_shipments
  getAllPreparingShipment(){
    return this._httpClient.get(`${environment.apiUrl}admin/preparing_shipments`)
  }
  
  // on_way_shipments
  getAllOnTheWayShipment(){
    return this._httpClient.get(`${environment.apiUrl}admin/view_on_way_shipments`)
  }












}
