import { Router } from '@angular/router';
import { Category } from './../../../main/sample/modules/store-interface';
import { TagServiceService } from './../../tag/tag-service.service';
import { Value } from './../../../main/sample/modules/store-profile';
import { Categoryinterface, Subcategory} from './../../../main/sample/modules/categoryinterface';
import { CategoryservService } from './../categoryserv.service';
import { Component, OnInit, ViewChild, ViewEncapsulation } from "@angular/core";
import { ColumnMode, DatatableComponent } from "@swimlane/ngx-datatable";
import Swal from "sweetalert2";
import { Subject } from "rxjs";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { environment } from 'environments/environment';
import {UntypedFormGroup,UntypedFormBuilder,Validators} from "@angular/forms";
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// Shared Service 
import { SharedService } from 'app/components/Shared Servece/shared.service';


@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CategoryListComponent implements OnInit {




  private tempData: any;
  @ViewChild(DatatableComponent) table: DatatableComponent;
  @ViewChild("tableRowDetails") tableRowDetails: any;

  public isLoading = false;

  public sidebarToggleRef = false;
  public selectedOption: number = 10; 
  public rows: any[] = []; 
  public ColumnMode = ColumnMode;
  public temp: any;
  public searchValue = "";
  public modalReference:any;
  public modalReference2:any;
  public modalReference3:any;
  private _unsubscribeAll: Subject<any>;
  public file:File;
  public file2:File;
  public fileName2='';
  public fileName=''
  public category_id:number=0;
  public shipment_id:number=0
  public  category_name=''
  public previousVerifiedFilter = "";
  public previousSuspendedFilter = "";
  public previousDeletedFilter = "";

  public loadAddCat= true;

  public CreateNewCategoryForm: UntypedFormGroup;
  public CreateNewCategoryFormSubmitted = false;

  public UpdateCategoryForm: UntypedFormGroup;
  public UpdateCategoryFormSubmitted = false;



  public ReactiveSubCatForm: UntypedFormGroup;
  public ReactiveSubCatFormSubmitted = false;

  public ReactiveUpdateCatForm: UntypedFormGroup;
  public ReactiveUpdateCatFormSubmitted = false;

  // New 
  // public subData :Subcategory[] = []; 
  public  category_name_ar=''
  public  category_name_en=''



  constructor(
    private _CategoryServ: CategoryservService,
    private http:HttpClient,
    private modalService: NgbModal,
    private formBuilder: UntypedFormBuilder,
    private router: Router,
    private sharedService: SharedService
  ) {
    

     // Form New Category 
    this.CreateNewCategoryForm = this.formBuilder.group({
      name_en: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50),Validators.pattern(/^[A-Za-z0-9\s\-&()!'@_%$]+$/)]],
      name_ar: ['', [ Validators.required, Validators.minLength(2),Validators.maxLength(50), Validators.pattern(/^[\u0600-\u06FF0-9\s\-&()!'@_%$]+$/)]],
      image: ["", [Validators.required]],
    });

    // Form Update Category 
    this.UpdateCategoryForm = this.formBuilder.group({
      name_en: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50),Validators.pattern(/^[A-Za-z0-9\s\-&()!'@_%$]+$/)]],
      name_ar: ['', [ Validators.required, Validators.minLength(2),Validators.maxLength(50), Validators.pattern(/^[\u0600-\u06FF0-9\s\-&()!'@_%$]+$/)]],
      image: ["", [Validators.required]],
    });



    this.ReactiveUpdateCatForm = this.formBuilder.group({
      name: ['', [Validators.required,Validators.minLength(2),Validators.maxLength(50),]],
      image: ["", []],
    });

    this.ReactiveSubCatForm = this.formBuilder.group({
      title: ['', [Validators.required,Validators.minLength(2),Validators.maxLength(50),]],
      category_id: ['', []],
    });
  
  
  }

  ngOnInit(): void {
    this.getAllCategory();
    this.getAllSubCategory();
  }

// Navigate and send row id
navigateWithState(CategoryId: number): void {
  this.sharedService.changeId(CategoryId);
  console.log(CategoryId);
}

  // Get all Catogray 
  getAllCategory() {
    this._CategoryServ.getAllCategory().subscribe(
      (res: any) => {
        this.rows = res;
        this.tempData = res;
        // console.log(this.rows);
        
      },
      (er: any) => {
        console.log(er);
      }
    );
  }

  // Get All subcatogry 
  getAllSubCategory() {
    this._CategoryServ.getAllCategory().subscribe(
      data => {
        // console.log('subCategory Data:', data);
      },
      error => {
        console.error('Error:', error);
      }
    );
  }
  
  // photo at Add Cactegory 
  onFilechange(event: any) {
    this.file = event.target.files;
    this.fileName = this.file.name;
  }

  // photo at Update Cactegory
  onFileupdate(event: any) {
    this.file2 = event.target.files[0];
    this.fileName2 = this.file2.name;
    console.log( this.fileName2 );
  }
  

   


  filterUpdate(event) {
    // Get the search input value and convert it to lowercase
    const val = event.target.value.toLowerCase();
  
    // Filter data based on the 'name_en' field
    const temp = this.tempData.filter(function (d) {
      return (
        d.name_en.toLowerCase().indexOf(val) !== -1 ||
        d.name_ar.toLowerCase().indexOf(val) !== -1 ||
        !val
      );
    });

    this.rows = temp;
      this.table.offset = 0;
      
  }

   

  filterRows(verifiedFilter, suspendFilter, deletedFilter): any[] {
    // Reset search on select change
    this.searchValue = "";

    verifiedFilter = verifiedFilter.toLowerCase();
    suspendFilter = suspendFilter.toLowerCase();
    deletedFilter = deletedFilter.toLowerCase();

    return this.tempData.filter((row) => {
      const isPartialNameMatch =
        row.verified.toString().toLowerCase().indexOf(verifiedFilter) !== -1 ||
        !verifiedFilter;
      const isPartialGenderMatch =
        `${row.banned}`.toLowerCase().indexOf(suspendFilter) !== -1 ||
        !suspendFilter;
      const isPartialStatusMatch =
        row.isDeleted.toString().toLowerCase().indexOf(deletedFilter) !== -1 ||
        !deletedFilter;
      return isPartialNameMatch && isPartialGenderMatch && isPartialStatusMatch;
    });
  }


 
  get NewCategoryForm() {
    return this.CreateNewCategoryForm.controls;
  }
  get UpdateCategory() {
    return this.UpdateCategoryForm.controls;
  }

  get ReactiveSubForm() {
    return this.ReactiveSubCatForm.controls;
  }

  get ReactiveUpdForm() {
    return this.ReactiveUpdateCatForm.controls;
  }


  // Modal Add SubCategory
  modalAddSubCategory(modalAddSubCat,id) {
    this.ReactiveSubCatFormSubmitted = false;
    this.ReactiveSubCatForm.reset();
   this.modalReference2 = this.modalService.open(modalAddSubCat, {
      backdrop: false,
      centered: true,
    });

    this.category_id=id;

  }

  // Model Add New Category
  addCategoryModel(modalAddCategory) {
    this.loadAddCat= false;
     setTimeout(() => {this.loadAddCat= true 
     }, 300);
   
       this.CreateNewCategoryFormSubmitted = false;
       this.CreateNewCategoryForm.reset();
      this.modalReference = this.modalService.open(modalAddCategory, {
         backdrop: false,
         centered: true,
       });
   
     }
   
  //Add New Category 
  CreateNewCategoryMethod() {
    this.isLoading = true;

    console.log(this.NewCategoryForm.name_en.value);
    this.CreateNewCategoryFormSubmitted = true;

    if (this.CreateNewCategoryForm.invalid) {
      return;
    }
    console.log("Create New Category after if");

    if (this.file) {
      var formData = new FormData();
      formData.append("image",this.file);
      formData.append("name_en",this.NewCategoryForm.name_en.value);
      formData.append("name_ar",this.NewCategoryForm.name_ar.value);
    }
   console.log("formData");
   
    this._CategoryServ.addCategory(formData).subscribe(
        (re: any) => {
          this.isLoading = false;
          this.getAllCategory();
          this.fileName='';
          this.modalReference.close();
          Swal.fire({
            position: "center",
            icon: "success",
            title: "category added Successfully ",
            showConfirmButton: false,
            timer: 1500,
          });
        },

        (er: any) => {
          this.isLoading = false;
          Swal.fire({
            position: "center",
            icon: "error",
            title: "An Error Occurred While adding  !",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      );
  }

  //  Updata Category Modal
  modalUpdateCategory(modal , id , name_ar , name_en) {
  this.UpdateCategoryFormSubmitted = false;
  // this. ReactiveUpdateCatForm.reset();
   this.modalReference3 = this.modalService.open(modal, {
      backdrop: false,
      centered: true,
    });
    this.category_id=id;
    console.log(this.category_id ,this.category_name_ar ,   this.category_name_en);
  }

  //Update Category Method
  UpdateCategoryMethod() {
    this.isLoading = true;

    this.UpdateCategoryFormSubmitted = true;

    console.log("before if");
    console.log(this. UpdateCategoryForm.controls.name_ar.value);

    if (this.UpdateCategoryForm.invalid) {
      console.log("in if"); 
      return;
    }

    var formData = new FormData();
    if (this.file2) {
      formData.append("image",this.file2);
      formData.append("name_ar",this. UpdateCategoryForm.controls.name_ar.value);
      formData.append("name_en",this. UpdateCategory.name_en.value);
      // formData.append("_method", "PUT");
  
    }else{
      
      formData.append("name_ar",this. UpdateCategory.name_ar.value);
      formData.append("name_en",this. UpdateCategory.name_en.value);

    }
    console.log(this.fileName2);
    console.log(formData);
    
    
   this._CategoryServ
     .updateCategory(formData,this.category_id)
   .subscribe(
        (re: any) => {
          this.isLoading = false;
          this.getAllCategory();
          this.fileName2='';
          this.modalReference3.close();
          Swal.fire({
            position: "center",
            icon: "success",
            title: "category added Successfully ",
            showConfirmButton: false,
            timer: 1500,
          });
        },

        (er: any) => {
          this.isLoading = false;
          Swal.fire({
            position: "center",
            icon: "error",
            title: "An Error Occurred While adding  !",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      );
  }


  ReactiveSubFormOnSubmit() {
    this.ReactiveSubCatFormSubmitted = true;


    this.ReactiveSubForm.category_id.patchValue(this.category_id);

    if (this.ReactiveSubCatForm.invalid) {
      return;
    }


    this._CategoryServ
      .addSubCategory(this.ReactiveSubCatForm.value)
      .subscribe(
        (re: any) => {
          this.getAllCategory();
          this.modalReference2.close();
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Sub Category Has been Added Successfully ",
            showConfirmButton: false,
            timer: 1500,
          });
        },

        (er: any) => {
          Swal.fire({
            position: "center",
            icon: "error",
            title: "An Error Occurred While Add Sub Category !",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      );
  }

  
  DeleteCategory(id: number, name: string) {
    Swal.fire({
      title: `Are you sure Want To Delete Category : ${name} ?`,
      text: "You won't be able to revert this!",
      icon: "error",
      showCancelButton: true,
      confirmButtonColor: "#4c54f5",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes , Delete it",
    }).then((result) => {
      if (result.isConfirmed) {
        this._CategoryServ.deleteCategory(id).subscribe(
          (re: any) => {
            this.getAllCategory();
            Swal.fire(
              "Deleted!",
              "Category has been Deleted Successfully .",
              "success"
            );
          },
          (err: any) => {
            Swal.fire({
              position: "center",
              icon: "error",
              title: "An Error Occurred While Deleting The Category",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        );
      }
    });
  }


}
