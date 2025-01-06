import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';
import Swal from "sweetalert2";
import { } from 'rxjs';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { timeout } from 'rxjs/operators';
import { TruncateWordsPipe } from 'app/main/sample/pipes/truncate-words.pipe';
import { TempProduct, TempProductResponse } from 'app/main/sample/modules/temp-product-interface';

@Component({
  selector: 'app-temp-product',
  templateUrl: './temp-product.component.html',
  styleUrls: ['./temp-product.component.scss']
})
export class TempProductComponent implements OnInit {

  public isLoading = false;
  public contentHeader: object;
  public rows;
  public data;
  public tempProducts: TempProduct[] = [];




  // Pagination 
  public page: number = 1;
  public pageSize: number = 9;
  public totalProducts: number;
  public searchText = '';
  public loader: boolean = true;
  public displayedProducts: any[] = [];
  // public currentPage; 
  public limit = 9;
  public products: any[] = [];
  // public collectionSize: number = 0;  

  constructor(private _productServices: ProductsService,
    private router: Router,
    private fb: FormBuilder,
    private modalService: NgbModal,
  ) { }

  ngOnInit(): void {
    // this.loadProducts(this.limit, this.page);
    this.getTemporaryProducts()
  }

  toggle() {
  }



  /**
 * Update to List View
 */
  listView() {
    // this.gridViewRef = false;
  }

  /**
   * Update to Grid View
   */
  gridView() {
    // this.gridViewRef = true;
  }
  //Upload Excl/

  // get All Product Method  
  loadProducts(limit: number, page: number) {
    this._productServices.GetAllProductsByLimited(limit, page).subscribe(
      (res: any) => {
        this.products = res.data;
        this.totalProducts = res.total
        console.log(this.products);
        // console.log(this.totalProducts );

        if (res.data && res.data.length > 0) {
          // console.log('Product By Pagination:', this.products);
          this.loader = false;
        } else {
          Swal.fire({
            position: "center",
            icon: "info",
            title: "There Are No Products Added Yet",
            showConfirmButton: true,
          });
        }
      },
      (er: any) => {
        console.log(er);
      }
    );
  }

  getTemporaryProducts(): void {
    this.loader = true
    console.log("انا  جوه");


    this._productServices.getTempProduct().subscribe({
      next: (response: any) => {
        this.loader = false
        console.log("كويس");

        this.tempProducts = response.data;
        console.log('Temp Products:', this.tempProducts)
      },
      error: (err) => {
        this.loader = false
        console.log("خراا");

        console.error('Error fetching products:', err);
      }
    });
  }


  // getTemporaryProducts(): void {
  //   this.loader = true
  //   console.log("انا  جوه");



  //   this.getTempProduct().subscribe({
  //     next: (response: TempProductResponse) => {
  //       console.log("API Response:", response);
  //       this.tempProducts = response.data; // Access the 'data' field of the response
  //       console.log("Temporary Products:", this.tempProducts);
  //       this.loader = false; // Stop the loader
  //     },
  //     error: (error) => {
  //       console.error('Error fetching temporary products:', error);
  //       this.loader = false; // Stop the loader even in case of error
  //     },
  //   });

  // }

  // refreshData
  refreshData(): void {
    console.log(this.limit, this.page);
    this.limit
    this.page
    this.loadProducts(this.limit, this.page);
    this.getTemporaryProducts
  }

  changePage(page) {
    // console.log(page);
    this.page = page
    this.loadProducts(this.limit, this.page);
  }


  getFirstFiveWords(name: string): string {
    if (!name) return '';
    const words = name.split(' ');
    return words.slice(0, 5).join(' ') + (words.length > 5 ? '...' : '');
  }

  acceptAction(productId: number): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to accept this product?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Accept!',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        // Call the API if the user confirms
        this._productServices.acceptTempProduct(productId).subscribe({
          next: (response) => {
            Swal.fire('Accepted!', 'The product has been accepted.', 'success');
            console.log('Product accepted successfully:', response);
            // Reload all temporary products
            this.getTemporaryProducts();
          },
          error: (error) => {
            Swal.fire('Error', 'There was an issue accepting the product.', 'error');
            console.error('Error accepting product:', error);
          },
        });
      } else {
        Swal.fire('Cancelled', 'The product was not accepted.', 'info');
      }
    });
  }


  RejectAction(id: number, name: string) {
    console.log('RejectAction called with name:', name);
    console.log('RejectAction called with id:', id);
    Swal.fire({
      title: `Are you sure you want to cancel this Temp Product: ${name}?`,
      html: `
        <textarea id="cancelReason" class="swal2-textarea" placeholder="Enter the reason for cancellation" style="width: 100%;"></textarea>
      `,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#117864",
      confirmButtonText: "Yes, Cancel this product",
      cancelButtonText: "No, Keep this product",
      preConfirm: () => {
        const reason = (document.getElementById("cancelReason") as HTMLTextAreaElement)?.value;
        console.log('Reason entered:', reason);
        if (!reason) {
          Swal.showValidationMessage("Please enter a reason for cancellation.");
          this.getTemporaryProducts();
          return null;
        }
        return reason;
      },
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        console.log('Reason submitted:', result.value);
        this._productServices.rejectedTempProduct(id, name).subscribe(
          (response: any) => {

            Swal.fire("Cancelled!", "Product has been cancelled successfully.", "success");
          },
          (error: any) => {

            Swal.fire({

              position: "center",
              icon: "error",
              title: "An error occurred while cancelling this product.",
              showConfirmButton: false,
              timer: 1500,
            });
            this.refreshData();
            this.getTemporaryProducts()
          }
        );
      }
    });
  }




}









