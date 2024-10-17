import { Category } from './../../../main/sample/modules/store-interface';
import { Component, OnInit ,ViewEncapsulation } from '@angular/core';
import { Product } from './../../../main/sample/modules/product';
import { ActivatedRoute } from '@angular/router';
import Swal from "sweetalert2";
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { ModelDetailsService } from '../model-details.service';
import { SharedService } from 'app/components/Shared Servece/shared.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
 



@Component({
  selector: 'app-model-details-list',
  templateUrl: './model-details-list.component.html',
  styleUrls: ['./model-details-list.component.scss']
})
export class ModelDetailsListComponent implements OnInit {

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

  public categories: any[] = [];
  public CategoryId ; 
  public subCategories: any[] = [];
  public modalReference2:any;  
  public modalReference3:any;  
  public modalService: NgbModal
  public items = [{itemName: '' }];
  public loading = false;




  constructor(private _modelDetails: ModelDetailsService, private _SharedService : SharedService ,private route: ActivatedRoute) { }

  ngOnInit(): void {
  
        // this.getProductById(this.id);
        this.getAllCategories();
        this._SharedService.currentId$.subscribe((id) => {
          this.CategoryId = id;
        });
        console.log(this.CategoryId);
        this.getAllSubCategory(this.CategoryId)
  }





  getAllProduscts(){
    this._modelDetails.GetAllProducts().subscribe({
      next: (res: any) => {
        console.log(res);
      },
      error: (er: any) => {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "NO PRODUCT found!",
          showConfirmButton: true,
        });
        console.log(er);
      },
    })
  }

  getAllCategories() {
    this._modelDetails.getAllCategory().subscribe({
      next: (res: any) => {
        this.categories = res;  // Assign the response to categories array
        console.log('Categories:', res); // Log the response for debugging
      },
      error: (err: any) => {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Failed to load categories!',
          showConfirmButton: true
        });
        console.log('Error:', err); // Log the error for debugging
      }
    });
  }



  getAllSubCategory(id: number) {
    this._modelDetails.getSubCategory(this.CategoryId).subscribe({
      next: (res: any) => {
        this.subCategories = res;  // Assign response to subCategories array
        console.log('SubCategories:', res); // Log response for debugging
      },
      error: (err: any) => {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Failed to load subcategories!',
          showConfirmButton: true
        });
        console.log('Error:', err); // Log error for debugging
      }
    });
  }

// <!-- Add featuer Model -->
modalAddFteature(modalSubCat,id) {

  this.items=[{itemName: ''}];

 this.modalReference2 = this.modalService.open(modalSubCat, {
    backdrop: false,
    centered: true,
  });

  // this.subcategory_id=id;

}


  // <!-- Add featuer  -->
  // ReactiveSubFormOnSubmit() {
  //   this.loading=true
  //   this.items.map(a => a.itemName)
  //   console.log( this.items.map(a => a.itemName));
    
  //   this._Subcategoryserv.addSubFeature(this.items.map(a => a.itemName ),this.subcategory_id)
  //     .subscribe(
  //       (re: any) => {
  //         // this.getAllSubCategory();
  //         this.modalReference3.dismiss();
  //         Swal.fire({
  //           position: "center",
  //           icon: "success",
  //           title: "Features Has been Added Successfully ",
  //           showConfirmButton: false,
  //           timer: 1500,
  //         });
  //       },
  //       (er: any) => {
  //         this.loading=false
  //         Swal.fire({
  //           position: "center",
  //           icon: "error",
  //           title: "An Error Occurred While Add Feature !",
  //           showConfirmButton: false,
  //           timer: 1500,
  //         });
  //       }
  //     );
  // }







}

