import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';
import Swal from "sweetalert2";
import {  } from 'rxjs';
import { Router } from '@angular/router';
import {FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { timeout } from 'rxjs/operators';
import { TruncateWordsPipe } from 'app/main/sample/pipes/truncate-words.pipe';

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




  // Pagination 
  public page: number = 1;
  public pageSize : number  = 9;
  public totalProducts : number;
  public searchText = '';
  public loader:boolean = true;
  public displayedProducts: any[] = []; 
  // public currentPage; 
  public limit= 9; 
  public products: any[] = [];
  // public collectionSize: number = 0;  

  constructor(private _productServices: ProductsService ,
    private router: Router , 
    private fb: FormBuilder,
    private modalService: NgbModal  ,
  ) {}

  ngOnInit(): void {
    this.loadProducts(this.limit, this.page);
    // this.loadProducts(this.limit,this.page);
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
        console.log(this.products) ;
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

  // refreshData
  refreshData(): void {
    console.log(this.limit,this.page);
    this.limit 
    this.page  
    this.loadProducts(this.limit,this.page); 
  }

  changePage(page){
    // console.log(page);
    this.page =page
    this.loadProducts(this.limit,this.page);
  }


  getFirstFiveWords(name: string): string {
    if (!name) return '';
    const words = name.split(' ');
    console.log(words);
    
    return words.slice(0, 5).join(' ') + (words.length > 5 ? '...' : '');
  }

   AcceptAction() {
    alert("Action Accepted!");
  }
  
  RejectAction(name: string) {
    console.log('RejectAction called with name:', name);
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
          return null;
        }
        return reason;
      },
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        console.log('Reason submitted:', result.value);
        this._productServices.AddNewProduct(result.value).subscribe(
          (response: any) => {
            this.refreshData();
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
          }
        );
      }
    });
  }
  
  }
  
  

