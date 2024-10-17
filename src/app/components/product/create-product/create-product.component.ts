import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, UntypedFormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';




@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})


export class CreateProductComponent implements OnInit {

  public file:File;
  public fileName=''
  public createProductForm: UntypedFormGroup;
  public createProductFormSubmitted = false;
  discountPercentage: number = 0;
  discountedPrice: number = 0;



  constructor(private fb: FormBuilder) {

    // createProductForm
    this.createProductForm = this.fb.group({
      productNameAr: ['', [Validators.required, Validators.minLength(2)]],
      productNameEn: ['', [Validators.required, Validators.minLength(2)]],
      productDescriptionAr: ['', Validators.required],
      productDescriptionEn: ['', Validators.required],
      productPrice: ['', [Validators.required, Validators.min(1)]],
      productColor: ['', Validators.required],
      productImage: [null, Validators.required],
      discountPercentage: [null, Validators.required]
  });


  }


   
  ngOnInit(): void { }


  calculateDiscount(): void {
    let productPrice = this.createProductForm.get('productPrice').value;
    let discountPercentage = this.createProductForm.get('discountPercentage').value;

    console.log(productPrice , discountPercentage);
    
    
    if (productPrice && discountPercentage) {
      let discount = (productPrice * discountPercentage) / 100;
      this.discountedPrice = productPrice - discount;
    } else {
      this.discountedPrice = 0; 
    }
  }

  get NewProduct() {
    return this.createProductForm.controls;
  }

  // Upload photo 
  onFileSelected(event: any): void {
   this.file = event.target.files[0]
    this,this.fileName = this.file.name;
    console.log(this.fileName);
  }


  onSubmit(): void {
    this.createProductFormSubmitted = true;
    if (this.createProductForm.valid && this.fileName) {
      const formData = new FormData();
      formData.append('productNameAr', this.createProductForm.get('productNameAr')?.value);
      formData.append('productNameEn', this.createProductForm.get('productNameEn')?.value);
      formData.append('productDescriptionAr', this.createProductForm.get('productDescriptionAr')?.value);
      formData.append('productDescriptionEn', this.createProductForm.get('productDescriptionEn')?.value);
      formData.append('productPrice', this.createProductForm.get('productPrice')?.value);
      formData.append('productColor', this.createProductForm.get('productColor')?.value);
      formData.append('productImage', this.fileName); 
      console.log(formData);
    }
  }

  applyDiscount() {
    const productPrice = this.createProductForm.get('productPrice')?.value;
    
    if (productPrice && this.discountPercentage) {
      this.discountedPrice = productPrice - (productPrice * this.discountPercentage / 100);
    }
  }
}
