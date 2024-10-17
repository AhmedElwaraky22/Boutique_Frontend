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
  public products: any[] = []; // To hold the refreshed product list
  public ProductData;
  public modalRefereence;
  public pageName :string;
  public index :number;
  public AddToHomeForm: FormGroup;
  public AddToHomeFormSubmitted = false;
  public productId : number ;
  

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
    // this.fetchAllProducts()
  }



  // Public Methods
  // -----------------------------------------------------------------------------------------------------
  
  /**
   * Remove Product
   *
   * @param productId
   */

  loadProducts(): void {
    this._ProductsService.GetAllProducts().subscribe((data: any) => {
      this.products = data;   
      // console.log(this.products);
         
    });
  }


// 

  fetchAllProducts(): void {
    this._ProductsService.GetAllProducts().subscribe(
      (response) => {
        this.ProductData= response;
        // console.log(this.ProductData);
        
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }

 

  removeProduct(id:number , name : string): void {
   Swal.fire({
      title: `Are you sure Want To Delete : ${name} ?`,
      text: "You won't be able to revert this!",
      icon: "error",
      showCancelButton: true,
      confirmButtonColor: "#4c54f5",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes , Delete it",
    }).then((result) => {
      if (result.isConfirmed) {
        this._ProductsService.DeleteProductById(id).subscribe(
          (re: any) => {
            this.fetchAllProducts()
            this.loadProducts()
            Swal.fire(
              "Deleted!",
              "Product has been Deleted Successfully .",
              "success"
            );
          },
          (err: any) => {
            Swal.fire({
              position: "center",
              icon: "error",
              title: "An Error Occurred While Deleting Product",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        );
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


