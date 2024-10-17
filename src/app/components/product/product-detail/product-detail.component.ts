import { Product } from './../../../main/sample/modules/product';
import { ProductDetails } from './../../../main/sample/modules/product';
import { Router } from '@angular/router'; // Import the Router service
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from './../products.service';
import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import Swal from "sweetalert2";
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: { class: 'ecommerce-application' }
})
export class ProductDetailComponent implements OnInit {

    @Input() ProductDetails;

  public swiperCoverflow: SwiperConfigInterface = {
    effect: 'coverflow',
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 'auto',
    coverflowEffect: {
      rotate: 60,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true
    },
    pagination: {
      el: '.swiper-pagination'
    }
  };


  private id:any;
  public product:any;
  public productData:ProductDetails;                  
  public productId;                  
  public modalReference;   
  public firstSkuQuantity: string | undefined; // Define the property to hold the quantity
  public firstSkuColor: string | undefined; // Define the property to hold the quantity
               

  constructor(private _productServices: ProductsService,
    private route: ActivatedRoute ,  
    private router: Router,
    private modalService: NgbModal
  ){}

  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get('id');
    this.getProductDetails(this.productId);
  }

  getProductDetails(id: number): void {
      this._productServices.GetProductById(id).subscribe(
        (res: any) => {
          this.productData = res;
          // console.log('Product Details:', this.productData);
        },
        (error) => {
          Swal.fire({
                    position: "center",
                    icon: "error",
                    title: "NO PRODUCT found!",
                    showConfirmButton: true,
                  });
          console.error('Error fetching product details:', error);
        }
      );
  }

  getTotalQuantity(): number {
    if (!this.productData?.product_skus) {
      return 0;
    }

    // Summing the quantities from product_skus array
    return this.productData.product_skus.reduce((total: number, sku: any) => {
      return total + Number(sku.quantity); // Ensure quantity is treated as a number
    }, 0);
  }


  // Delete Product  
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
          this._productServices.DeleteProductById(id).subscribe(
            (re: any) => {
              this.router.navigate(['/view-all-products']); // Use Router for navigation
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

}
