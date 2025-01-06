import { Product } from './../../../main/sample/modules/product';
import { ProductDetails } from './../../../main/sample/modules/product';
import { Router } from '@angular/router'; // Import the Router service
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from './../products.service';
import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import Swal from "sweetalert2";
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

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


  public product: any;
  public productData: ProductDetails;
  public productId;
  public modalReference;
  public firstSkuQuantity: string | undefined; // Define the property to hold the quantity
  public firstSkuColor: string | undefined; // Define the property to hold the quantity





  // public products;
  public shopSidebarToggle = false;
  public shopSidebarReset = false;
  public gridViewRef = true;
  public wishlist;
  public cartList;

  public updateProductForm: FormGroup;
  public selectedOption: string = '';
  public updateProductFormSubmitted = false;
  public showPriceInput: boolean = false;
  public features = [{ firstFeature: '', secondFeature: '', quantity: '', price: '' }];
  public additional_features = [{ name_en: '', name_ar: '', value_en: '', value_ar: '' }];
  public has_discount: any | null = null;




  public categoryId: number
  public getFeatures
  public Features
  public SubFeatures



  constructor(private _productServices: ProductsService,
    private route: ActivatedRoute,
    private router: Router,
    private modalService: NgbModal,
    private FormBuilder: FormBuilder,

  ) {

    this.updateProductForm = this.FormBuilder.group({
      selectedOption: ['',],
      name_en: ['', [Validators.minLength(2)]],
      name_ar: ['', [Validators.minLength(2)]],
      product_price: [null, []],
      discounted_price: [null,],
      description_en: ['', [Validators.minLength(2)]],
      description_ar: ['', [Validators.minLength(2)]],
      images: [null,],
    });

  }

  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get('id');
    this.getProductDetails(this.productId);
    // this.getSubFeatures()
  }

  // Product details 
  getProductDetails(id: number): void {
    this._productServices.GetProductById(id).subscribe(
      (res: any) => {
        this.productData = res;
        // console.log('Product Details:', this.productData);
        this.categoryId = this.productData.category.id
        console.log("Category Id :", this.categoryId);
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
  // Total Quantity 
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
  removeProduct(id: number, name: string): void {
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

  //Option Change
  onOptionChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedOption = selectElement.value;
  }

  // Discount Change
  onDiscountChange(event: Event): void {
    // const value = (event.target as HTMLSelectElement).value;
    // this.has_discount = value === '1';
    this.updateProductForm.patchValue({ discounted_price: this.has_discount });
    const target = event.target as HTMLSelectElement;
    this.has_discount = target.value;
    console.log('has_discount:', this.has_discount);

  }


  // Add Feature
  addFeature() {
    this.features.push({
      firstFeature: '',
      secondFeature: '',
      price: '',
      quantity: '',
    });
  }
  // Delete Feature
  deleteFeature(id) {
    for (let i = 0; i < this.features.length; i++) {
      if (this.features.indexOf(this.features[i]) === id) {
        this.features.splice(i, 1);
        break;
      }
    }
  }

  // Get Features 
  // getSubFeatures() {
  //   console.log("أنا جوه ");

  //   this._productServices.getFeatures(this.categoryId).subscribe(
  //     (res: any) => {
  //       console.log("أنا رجعت ");

  //       this.Features = res;
  //       console.log(this.Features);
  //       console.log(this.Features.features[0].name);
  //       this.SubFeatures = this.Features.features
  //       console.log(this.SubFeatures);

  //     },
  //     (er: any) => {
  //       console.log(er);
  //       console.log("أنا مرجعتa  ");

  //     }
  //   );
  // }

  // Add Additional Feature //
  addAdditionalFeature() {
    this.additional_features.push({
      name_en: '',
      name_ar: '',
      value_en: '',
      value_ar: '',
    });
  }

  // Delete Additional Feature
  deleteAdditionalFeature(id) {
    for (let i = 0; i < this.additional_features.length; i++) {
      if (this.additional_features.indexOf(this.additional_features[i]) === id) {
        this.additional_features.splice(i, 1);
        break;
      }
    }
  }


  // modelEditProduct
  modelEditProduct(
    modalEditProduct: any,
    id: number,
    name_en: string,
    name_ar: string,
    product_price: number,
    has_discount: boolean,
    discounted_price: number,
    description_en: string,
    description_ar: string,
  ): void {
    this.updateProductFormSubmitted = false;
    this.updateProductForm.reset();

    // Populate the form with existing product data
    this.updateProductForm.patchValue({
      product_id: id,
      name_en: name_en,
      name_ar: name_ar,
      product_price: product_price,
      has_discount: has_discount,
      discounted_price: discounted_price,
      description_ar: description_ar,
      description_en: description_en
      // Add other fields you want to pre-fill
    });

    // Open the modal
    this.modalReference = this.modalService.open(modalEditProduct, {
      backdrop: false,
      centered: true,
    });
  }

  // Method Edit Poduct 
  onSubmit(): void {
    console.log(this.productId);

    this.updateProductFormSubmitted = true;

    if (this.updateProductForm.invalid) {
      console.log('Form is invalid');
      return;
    }
   
    const discountedPrice = this.updateProductForm.get('discounted_price')?.value;
    console.log('Discounted Price from form:', discountedPrice);
    
    const payload: any = {
      name_en: this.updateProductForm.get('name_en')?.value,
      name_ar: this.updateProductForm.get('name_ar')?.value,
      price: this.updateProductForm.get('product_price')?.value,
      description_ar: this.updateProductForm.get('description_ar')?.value,
      description_en: this.updateProductForm.get('description_en')?.value,
      has_discount: this.has_discount,
      ...(this.has_discount === 1 && { discounted_price: discountedPrice }),
    };
    
    if (this.additional_features?.length > 0) {
      payload.product_additional_features = this.additional_features
        .filter((feature) => feature.name_en && feature.name_ar)
        .map((feature) => ({
          name_en: feature.name_en,
          name_ar: feature.name_ar,
          value_en: feature.value_en,
          value_ar: feature.value_ar,
        }));
    }
    
    console.log('Payload just before sending:', payload);


    // Call the service to save or update the product
    this._productServices.UpdateProductData(this.productId, payload).subscribe({
      next: (response) => {
        console.log('Product updated successfully', response);
        this.modalReference.close();
        this.getProductDetails(this.productId);
      },
      error: (error) => {
        console.error('Error updating product', error);
      },
    });


    // this._productServices.UpdateProductFeature(this.productId, payload2).subscribe({
    //   next: (response) => {
    //     console.log('Product updated successfully', response);
    //     this.modalReference.close();
    //     this.getProductDetails(this.productId);
    //   },
    //   error: (error) => {
    //     console.error('Error updating product', error);
    //   },
    // });








  }






















}
