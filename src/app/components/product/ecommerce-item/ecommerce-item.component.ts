import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { ProductsService } from '../products.service';
import Swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-ecommerce-item',
  templateUrl: './ecommerce-item.component.html',
  styleUrls: ['./ecommerce-item.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: { class: 'ecommerce-application' }
})
export class EcommerceItemComponent implements OnInit {

  // Input Decorator
  @Input() product;
  @Input() isWishlistOpen = false;

  // Public
  public isInCart = false;
  public products: any[] = []; 
  public ProductData;
  // public product;
  public modalRefereence;
  public pageName :string;
  public index :number;
  public AddToHomeForm: FormGroup;
  public AddToHomeFormSubmitted = false;
  public productId : number ;
  public isLoading = false;
  public loader:boolean = true;
  // Pagination 
  public page: number = 1;
  public pageSize : number  = 9;
  public totalProducts : number;
  public searchText = '';
  public displayedProducts: any[] = []; 
  // public currentPage; 
  public limit= 9; 
  // public collectionSize: number = 0;  


  

  /**
   * Constructor
   *
   * @param {ProductsService} _ProductsService
   */
  constructor(
    private _ProductsService: ProductsService,
    private modalService: NgbModal  ,
    private route: ActivatedRoute ,  
    private router: Router,  
    private formBuilder: FormBuilder,
 
  ) {

    // Form Add To Home  
    this.AddToHomeForm = this.formBuilder.group({
      selectedPage: ['', Validators.required],
      index: ['', [Validators.required, Validators.min(0)]],
    });
  }

  
  ngOnInit(): void {
    // this.refreshData()
    // this.fetchAllProducts()
  }



  // Public Methods
  // -----------------------------------------------------------------------------------------------------
  
  /**
   * Remove Product
   *
   * @param productId
   */





  // fetchAllProducts(): void {
  //   // console.log("fetchAllProducts");

  //   this._ProductsService.GetAllProducts().subscribe(
  //     (response) => {
  //       this.ProductData= response;
  //       // console.log(this.ProductData);
        
  //     },
  //     (error) => {
  //       console.error('Error fetching products:', error);
  //     }
  //   );
  // }


     // get All Product Method  
     loadProducts(limit: number, page: number) {
      this.loader = true;
  
      this._ProductsService.GetAllProductsByLimited(limit, page).subscribe(
        (res: any) => {
          this.products = res.data;
          this.totalProducts = res.total
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
          this.loader = false;
  
        }
      );
    }
  
    // refreshData
    refreshData(): void {
      this.isLoading = true; 
      this.loadProducts(this.limit, this.page);
    }
    
 
    // remove Product
    removeProduct(id: number, name: string): void {
      this.isLoading = true;
    
      Swal.fire({
        title: `Are you sure you want to delete: ${name}?`,
        text: "You won't be able to revert this!",
        icon: "error",
        showCancelButton: true,
        confirmButtonColor: "#4c54f5",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it",
      }).then((result) => {
        if (result.isConfirmed) {
          this.isLoading = true;
    
          this._ProductsService.DeleteProductById(id).subscribe(
            (response: any) => {
              this.isLoading = false;
    
              // Show success message
              Swal.fire(
                "Deleted!",
                "Product has been deleted successfully.",
                "success"
              );
    
              // Reload the product list
              this.loadProducts(this.limit, this.page);
            },
            (error: any) => {
              this.isLoading = false;
    
              // Show error message
              Swal.fire({
                position: "center",
                icon: "error",
                title: "An error occurred while deleting the product.",
                showConfirmButton: false,
                timer: 1500,
              });
            }
          );
        } else {
          this.isLoading = false; // Reset loading if canceled
        }
      });
    }
    
  
    // Model Add To Home Product 
    modelAddTo(addToHome , id){
      this.AddToHomeFormSubmitted = false;
      this.AddToHomeForm.reset();
    this.modalRefereence = this.modalService.open(addToHome, {
        backdrop: false,
        centered: true,
      });
      this.productId = id;
      console.log(this.productId);    
    }

    addToPage() {
      this.AddToHomeFormSubmitted = true;

      if (this.AddToHomeForm.invalid) {
        return;
      }

    // Get the form values
    let formValues = this.AddToHomeForm.value;
    let selectedPage = formValues.selectedPage;
    let index = formValues.index;
  
  console.log(formValues ,selectedPage , index );
 
    this._ProductsService.AddToHomeProduct(this.productId, selectedPage, index).subscribe({
      next: (response) => {
        Swal.fire('Success', 'Product added to home page successfully!', 'success');
        console.log('Response:', response);
        this.modalRefereence.close();

      },
      error: (error) => {
        Swal.fire('Error', 'Failed to add product to home page.', 'error');
        console.error('Error:', error);
      },
      complete: () => {
        console.log('AddToHomeProduct request completed.');
      }
    });
  }

}


