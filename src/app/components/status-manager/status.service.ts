import { Categoryinterface , Subcategoryinterface , AllStores} from 'app/main/sample/modules/product';
import { Product, ProductDetails } from '../../main/sample/modules/product';
import { UserData } from '../../main/sample/modules/user-data';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { environment } from 'environments/environment';

import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, finalize, map } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Injectable()
export class TransactionsService implements Resolve<any> {
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
      Promise.all([this.GetAllTransactions()]).then(() => {
        resolve();
      }, reject);
    });
  }


  /**
   * Get rows
   */
  GetAllTransactions = () => this._httpClient.get(`${environment.apiUrl}admin/store-transactions`);
  

  /**
   * Upload file
   */
  uploadFile(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file, file.name);

    return this._httpClient.post(`${environment.apiUrl}admin/products-import`, formData).pipe(
      catchError((error) => {
        console.error('Error uploading file!', error);
        if (error.status === 400) {
          Swal.fire('Server Error', 'There was an error on the server. Please try again later.', 'error');
        } else if (error.status === 500) {
          Swal.fire('Server Error', 'Internal server error. Please contact support.', 'error');
        } else if (error.status === 401 || error.status === 403) {
          Swal.fire('Authorization Error', 'You are not authorized to perform this action.', 'error');
        } else {
          Swal.fire('Error', 'Failed to upload file.', 'error');
        }
        return of(null);
      }),
      finalize(() => {
        Swal.fire('Success', 'Upload process completed', 'success');
        console.log('File upload process completed.');
      })
    );
  }
}
