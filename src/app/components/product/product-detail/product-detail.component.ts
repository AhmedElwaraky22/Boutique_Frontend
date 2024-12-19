import { Product } from './../../../main/sample/modules/product';
import { ProductDetails } from './../../../main/sample/modules/product';
import { Router } from '@angular/router'; // Import the Router service
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from './../products.service';
import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import Swal from "sweetalert2";
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup } from '@angular/forms';
import { timeout } from 'rxjs/operators';

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



  public isLoading = false;
  public contentHeader: object;
  public rows;
  public data;
  public subcategories;
  public SecSub;
  public SecondSubcategories;
  // public products;
  public shopSidebarToggle = false;
  public shopSidebarReset = false;
  public gridViewRef = true;
  public wishlist;
  public cartList;
  public createProductForm: FormGroup;
  public createProductFormSubmitted = false;
  public modalRefereence;
  public selectedCategoryID;
  public Features;
  public SubFeatures;
  public FeaturesByThird;
  public SubcategoryId;
  public files: File[] = [];
  public fileNames: string[] = [];
  public file: File | null = null;
  public product_has_discount;
  public allStores:any; 
  public firstFeature:string; 
  public secondFeature:string; 
  public price:number; 
  public quantity:number; 
  public showSecondSubCategory: boolean = false;
  // public feature = { firstFeature: '', secondFeature: '' , quantity:'' , price:'' };
  public features = [{ firstFeature: '', secondFeature: '' , quantity:'' , price:'' }];
  public additional_features = [{ name_en: '', name_ar: '' , value_en:'' , value_ar:'' }];
               

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


  // Edit Product 
  toggle() {
    this.showSecondSubCategory = !this.showSecondSubCategory;
  }

  addFeature() {
    this.features.push({
      firstFeature: '',
      secondFeature: '',
      price: '',
      quantity: '',
    });
  }

  deleteFeature(id) {
    for (let i = 0; i < this.features.length; i++) {
      if (this.features.indexOf(this.features[i]) === id) {
        this.features.splice(i, 1);
        break;
      }
    }
  }

  addAdditionalFeature() {
    this. additional_features.push({
      name_en: '',
      name_ar: '',
      value_en: '',
      value_ar: '',
    });
  }

  deleteAdditionalFeature(id) {
    for (let i = 0; i < this. additional_features.length; i++) {
      if (this. additional_features.indexOf(this. additional_features[i]) === id) {
        this. additional_features.splice(i, 1);
        break;
      }
    }
  }

  getAllStores(): void {
    this._productServices.viewAllStores().subscribe(
      (res) => {
        this.allStores = res;  
        console.log('Stores fetched successfully:', this.allStores);
      },
      (error) => {
        console.error('Error fetching stores:', error);
      }
    );
  }

  onStoreSelect(storeId): void {
    // console.log('Selected store ID:', storeId);

      this._productServices.AllCategoryById(storeId).subscribe(
      (res: any) => {
        this.rows = res;
        console.log("Categories :",this.rows);
      },
      (er: any) => {
        console.log(er);
      }
    );
  }
  getSubCategory(id: number ){
    // console.log("Category id :" , id);

      this._productServices.getSubCategory(id).subscribe(
        (res: any) => {
          this.data = res;
          this.subcategories = this.data[0].subcategories;
          console.log("SubCategory :", this.data[0].subcategories);
        },
        (er: any) => {
          console.log(er);
        }
      );
  }

  getSecondSub(id: number ){
      this._productServices.getSubCategory(id).subscribe(
        (res: any) => {
          this.SecSub = res;
          this.SecondSubcategories = this.SecSub[0].subcategories;
          console.log("Third Level :" , this.SecSub[0].subcategories);
        },
        (er: any) => {
          console.log(er);
        }
      );
  }

  getSubFeatures(id: number ){
      // console.log("SecSub id :",id);

      this._productServices.getFeatures( id).subscribe(
        (res: any) => {
          this.Features = res;
          // console.log(this.Features);
          // console.log(this.Features.features);
          this.SubFeatures= this.Features.features
          console.log(this.SubFeatures);
        },
        (er: any) => {
          console.log(er);
        }
      );
  }

  // photo of Product
  onFileUpload(event: any) {
    const files = event.target.files;
    console.log(files);
    
    if (files && files.length > 0) {
      this.files = Array.from(files); 
      this.fileNames = this.files.map(file => file.name);
      console.log("photos : " , this.fileNames);
      this.createProductForm.patchValue({
        images: this.files
      });
      this.createProductForm.get('images')?.updateValueAndValidity();
    }
  }

  
  // modelEditProduct
  modelEditProduct(modalEditProduct , id , name){
    this.createProductFormSubmitted = false;
    this.createProductForm.reset();
    this.modalReference = this.modalService.open(modalEditProduct, {
      backdrop: false,
      centered: true,
    });
  }

 
  editProductMethod() {
    this.isLoading = true;
    const startTime = new Date().getTime();
  
    this.createProductFormSubmitted = true;
    if (this.createProductForm.invalid) {
      return;
    }
  
    if (this.createProductForm.get('product_discounted_price').value > 0) {
      this.product_has_discount = 1;
    } else {
      this.product_has_discount = 0;
    }
  
    const images = [];
    if (this.files) {
      images.push(this.files);
    }
  
    const transformedFeatures = this.features.map((feature) => ({
      feature_values_ids: [feature.firstFeature, feature.secondFeature],
      price: feature.price,
      quantity: feature.quantity,
    }));
  
    const transformAdditionalFeaterus = this.additional_features
      .map((additional) => {
        const feature = {
          ...(additional.name_ar ? { name_ar: additional.name_ar } : {}),
          ...(additional.name_en ? { name_en: additional.name_en } : {}),
          ...(additional.value_en ? { value_en: additional.value_en } : {}),
          ...(additional.value_ar ? { value_ar: additional.value_ar } : {}),
        };
        if (Object.keys(feature).length > 0) {
          return feature;
        }
        return null;
      })
      .filter((feature) => feature !== null);
  
    const productCategoryId = this.showSecondSubCategory
      ? this.createProductForm.get('product_category_id').value
      : this.createProductForm.get('selectedSubCategoryId').value;
  
    let formData = new FormData();
    formData.append('product_category_id', productCategoryId);
    formData.append('store_id', this.createProductForm.get('store_id').value);
    formData.append('name_en', this.createProductForm.get('name_en').value);
    formData.append('name_ar', this.createProductForm.get('name_ar').value);
    formData.append('product_price', this.createProductForm.get('product_price').value);
    formData.append('product_discounted_price', this.createProductForm.get('product_discounted_price').value);
    formData.append('description_en', this.createProductForm.get('description_en').value);
    formData.append('description_ar', this.createProductForm.get('description_ar').value);
    formData.append('product_has_discount', String(this.product_has_discount));
  
    transformedFeatures.forEach((feature, index) => {
      if (feature.feature_values_ids && feature.feature_values_ids.length > 0) {
        feature.feature_values_ids.forEach((id, subIndex) => {
          if (id !== null && id !== undefined && id !== '') {
            formData.append(`features[${index}][feature_values_ids][${subIndex}]`, String(id));
          }
        });
      }
      if (feature.price !== null && feature.price !== undefined && feature.price !== '') {
        formData.append(`features[${index}][price]`, String(feature.price));
      }
  
      if (feature.quantity !== null && feature.quantity !== undefined && feature.quantity !== '') {
        formData.append(`features[${index}][quantity]`, String(feature.quantity));
      }
    });
  
    transformAdditionalFeaterus.forEach((additionalFeature, index) => {
      formData.append(`product_additional_features[${index}][name_ar]`, additionalFeature.name_ar);
      formData.append(`product_additional_features[${index}][name_en]`, additionalFeature.name_en);
      formData.append(`product_additional_features[${index}][value_ar]`, additionalFeature.value_ar);
      formData.append(`product_additional_features[${index}][value_en]`, additionalFeature.value_en);
    });
  
    if (this.files && this.files.length > 0) {
      this.files.forEach((file, index) => {
        formData.append(`images[${index}]`, file, file.name);
      });
    }

    this._productServices.AddNewProduct(formData)
    .pipe(
      timeout(60000) 
    )
    .subscribe({
      next: (re: any) => {
        this.isLoading = false;
        const endTime = new Date().getTime();
        const duration = endTime - startTime;

        this.modalReference.close();
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Product added successfully',
          showConfirmButton: false,
          timer: 1500,
        });
        this.createProductForm.reset();
        this.createProductFormSubmitted = false;
        this.createProductForm.patchValue({ product_category_id: productCategoryId });
        this.files = [];
        this.fileNames = [];
        (document.getElementById('fileInput') as HTMLInputElement).value = ''; // Reset the file input element

        this.features = this.features.map(() => ({
          firstFeature: '',
          secondFeature: '',
          price: '',
          quantity: '',
        }));

        this.additional_features = [{ name_en: '', name_ar: '', value_en: '', value_ar: '' }];
      },

      error: (er: any) => {
        this.isLoading = false;
        console.log(er.error.message);
        let errorMessage = er.error.message || 'The request timed out. Please try again.';
        if (er.name === 'TimeoutError') {
          Swal.fire({
            position: 'center',
            icon: 'warning',
            title: 'The request timed out. Please try again.',
            showConfirmButton: true,    // Show the button
            confirmButtonText: 'OK'    // Button text              confirmButtonText: 'OK'    // Button text,

          });
        } else {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: errorMessage,
            timer: 1500,
            showConfirmButton: true,    // Show the button
            confirmButtonText: 'OK'    // Button text
          });
        }
      },
    });
      
  }


}
