import { TempProductResponse } from './../../main/sample/modules/temp-product-interface';
import { Categoryinterface, Subcategoryinterface, AllStores } from 'app/main/sample/modules/product';
import { Product, ProductDetails } from './../../main/sample/modules/product';
import { UserData } from './../../main/sample/modules/user-data';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { environment } from 'environments/environment';

import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import Swal from 'sweetalert2';






@Injectable()
export class ProductsService implements Resolve<any> {
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
      Promise.all([this.GetAllProducts()]).then(() => {
        resolve();
      }, reject);
    });
  }

  /**
   * Get rows
   */
  GetAllProducts() {
    return this._httpClient.get<Product>(`${environment.apiUrl}admin/all-products`);
  }

  GetAllProductsByLimited(limit: number, page: number) {
    return this._httpClient.get<Product>(`${environment.apiUrl}admin/all-products`, {
      params: {
        limit: limit.toString(),
        page: page.toString()
      }
    });
  }


  /**
   * Delete product by id
   */
  DeleteProductById(id: number): Observable<any> {
    const body = {
      product_id: id,
      _method: 'DELETE'
    };
    return this._httpClient.post(`${environment.apiUrl}admin/delete-product`, body);
  }

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

  /**
   * Add product to home page
   */
  GetProductById(id: number) {
    return this._httpClient.get<ProductDetails>(`${environment.apiUrl}admin/product/${id}`);
  }


  // Add To Home Product
  AddToHomeProduct(product_id: number, type: string, index: number) {
    return this._httpClient.post(`${environment.apiUrl}admin/home-products`, { product_id, type, index });
  }

  // Add New Product 
  AddNewProduct(data: any) {
    return this._httpClient.post(`${environment.apiUrl}admin/product`, data);
  }

  //Get All Category
  // viewAllCategory(){
  //   return this._httpClient.get<Categoryinterface>(`${environment.apiUrl}admin/admin-category`);
  // }

  //Get All Category by Store Id
  AllCategoryById(id: number) {
    return this._httpClient.get(`${environment.apiUrl}admin/get-categories-by-store-id/${id}`);
  }


  //get Third Level Subcategory
  getSubCategory(id: number) {
    return this._httpClient.get<Subcategoryinterface>(`${environment.apiUrl}admin/admin-third-level-category/${id}`);
  }

  // get Features
  getFeatures(id: number) {
    return this._httpClient.get<Subcategoryinterface>(`${environment.apiUrl}all/view-all-features-by-category-id/${id}`);
  }

  // view All Stores
  viewAllStores() {
    return this._httpClient.get<AllStores>(`${environment.apiUrl}admin/viewallstores`)
  }

// Get Temp Product
  getTempProduct(): Observable<TempProductResponse> {
    return this._httpClient.get<TempProductResponse>(`${environment.apiUrl}admin/all-temp-products`);
  }
  // Accept Temp Product
  acceptTempProduct(id: number) {
    return this._httpClient.post(`${environment.apiUrl}admin/temp-products/accept/${id}`, {});
  }

  rejectedTempProduct(id: number, data: any) {
    return this._httpClient.post(`${environment.apiUrl}admin/temp-products/reject/${id}`, data);
  }
  // Update Product Data
  UpdateProductData(id: number, data: any) {
    return this._httpClient.put(`${environment.apiUrl}all/update-products/${id}`, data)
  }
  // Update Product Feature
  UpdateProductFeature(id: number, data: any) {
    return this._httpClient.put(`${environment.apiUrl}all/product-feature/${id}`, data)
  }
  // Update Product Image
  UpdateProductImage(data) {
    return this._httpClient.post(`${environment.apiUrl}all/update-images`, data);
  }
  
}

