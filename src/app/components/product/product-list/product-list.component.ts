import { Product, Subcategory } from './../../../main/sample/modules/store-profile';
import { ProductsService } from "./../products.service";
import Swal from "sweetalert2";
import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { catchError, finalize } from 'rxjs/operators';
import { } from 'rxjs';
import { Router, ResolveEnd } from '@angular/router';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AllStores } from 'app/main/sample/modules/product';
import { timeout } from 'rxjs/operators';
import { of, throwError } from 'rxjs';

@Component({
  selector: "app-product-list",
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.scss"],
  encapsulation: ViewEncapsulation.None,
  host: { class: 'ecommerce-application' }
})



export class ProductListComponent implements OnInit {
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
  public modalReference;
  public files: File[] = [];
  public fileNames: string[] = [];
  public file: File | null = null;
  public product_has_discount;
  public allStores: any;
  public firstFeature: string;
  public secondFeature: string;
  public price: number;
  public quantity: number;
  public showSecondSubCategory: boolean = false;
  // public feature = { firstFeature: '', secondFeature: '' , quantity:'' , price:'' };
  public features = [{ firstFeature: '', secondFeature: '', quantity: '', price: '' }];
  public additional_features = [{ name_en: '', name_ar: '', value_en: '', value_ar: '' }];

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


  constructor(
    private _productServices: ProductsService,
    private router: Router,
    private fb: FormBuilder,
    private modalService: NgbModal,
  ) {
    // create Product Form
    this.createProductForm = this.fb.group({
      store_id: [null, Validators.required],
      selectedCategoryId: [null, Validators.required],
      selectedSubCategoryId: [null, Validators.required],
      product_category_id: [null],  //third level
      name_en: ['', [Validators.required, Validators.minLength(2)]],
      name_ar: ['', [Validators.required, Validators.minLength(2)]],
      product_price: [null, [Validators.required,]],
      product_discounted_price: [null, Validators.required],
      description_en: ['', [Validators.required, Validators.minLength(2)]],
      description_ar: ['', [Validators.required, Validators.minLength(2)]],
      images: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    this.getAllStores();
    this.loadProducts(this.limit, this.page);
    // this.loadProducts(this.limit,this.page);
  }

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
    this.additional_features.push({
      name_en: '',
      name_ar: '',
      value_en: '',
      value_ar: '',
    });
  }

  deleteAdditionalFeature(id) {
    for (let i = 0; i < this.additional_features.length; i++) {
      if (this.additional_features.indexOf(this.additional_features[i]) === id) {
        this.additional_features.splice(i, 1);
        break;
      }
    }
  }


  /**
   * Update to List View
   */
  listView() {
    this.gridViewRef = false;
  }

  /**
   * Update to Grid View
   */
  gridView() {
    this.gridViewRef = true;
  }

  //Upload Excl/
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      // console.log('Selected file:', file);
      this._productServices.uploadFile(file).subscribe(
        (response) => {
          if (response) {
            // console.log('File successfully uploaded!', response);
            Swal.fire('Success', 'File successfully uploaded!', 'success');
          }
        },
        (error) => {
          console.log("File doesnot upload!", error);
          Swal.fire('success', 'File doesnot upload!', 'success');
        }
      );
    }
  }

  // get All Product Method  
  loadProducts(limit: number, page: number) {
    this.loader = true;

    this._productServices.GetAllProductsByLimited(limit, page).subscribe(
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
    // console.log(this.limit, this.page);

    setTimeout(() => {
      this.isLoading = false;
      this.loadProducts(this.limit, this.page);
    }, 1000);
  }


  changePage(page) {
    // console.log(page);
    this.page = page
    this.loadProducts(this.limit, this.page);
  }

  getAllStores(): void {
    this._productServices.viewAllStores().subscribe(
      (res) => {
        this.allStores = res;
        // console.log('Stores fetched successfully:', this.allStores);
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
        // console.log("Categories :",this.rows);
      },
      (er: any) => {
        console.log(er);
      }
    );
  }

  getSubCategory(id: number) {
    // console.log("Category id :" , id);

    this._productServices.getSubCategory(id).subscribe(
      (res: any) => {
        this.data = res;
        this.subcategories = this.data[0].subcategories;
        // console.log("SubCategory :", this.data[0].subcategories);
      },
      (er: any) => {
        console.log(er);
      }
    );
  }

  getSecondSub(id: number) {
    this._productServices.getSubCategory(id).subscribe(
      (res: any) => {
        this.SecSub = res;
        this.SecondSubcategories = this.SecSub[0].subcategories;
        // console.log("Third Level :" , this.SecSub[0].subcategories);
      },
      (er: any) => {
        console.log(er);
      }
    );
  }

  getSubFeatures(id: number) {
    // console.log("SecSub id :",id);

    this._productServices.getFeatures(id).subscribe(
      (res: any) => {
        this.Features = res;
        // console.log(this.Features);

        // console.log(this.Features.features);
        this.SubFeatures = this.Features.features
        // console.log(this.SubFeatures);


      },
      (er: any) => {
        console.log(er);
      }
    );
  }

  // photo of Product
  onFileUpload(event: any) {
    const files = event.target.files;
    // console.log(files);

    if (files && files.length > 0) {
      this.files = Array.from(files);
      this.fileNames = this.files.map(file => file.name);
      // console.log("photos : " , this.fileNames);
      this.createProductForm.patchValue({
        images: this.files
      });
      this.createProductForm.get('images')?.updateValueAndValidity();
    }
  }

  // Model Add Product 
  ModelAddNewProduct(modalAddProduct) {
    // this.features=[{ firstFeature: '', secondFeature: '' , quantity:'' , price:'' }]
    this.createProductFormSubmitted = false;
    this.createProductForm.reset();
    this.modalReference = this.modalService.open(modalAddProduct, {
      backdrop: false,
      centered: true,
    });
  }

  //  Add Product Method 
  createProductFormMethod() {
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

      // Check for files and their size limit
  const maxFileSize = 1 * 1024 * 1024; // 1 MB in bytes
  const validFiles: File[] = [];
  if (this.files && this.files.length > 0) {
    // Filter out files larger than 1 MB
    this.files.forEach(file => {
      if (file.size <= maxFileSize) {
        validFiles.push(file);
      } else {
        alert(`File "${file.name}" is too large. Maximum size is 1 MB.`);
      }
    });
  }

  // If no valid files, prevent form submission
  if (validFiles.length === 0) {
    this.isLoading = false;
    return;
  }

  const images = [];
  images.push(...validFiles);

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










