import { AdminSelectCategory } from './../../../main/sample/modules/admin-select-category';
import { repeaterAnimation } from './form-repeater.animation';
import { Subcategoryinterface, Value } from './../../../main/sample/modules/subcategoryinterface';
import { SubcategoryserviceService } from './../subcategoryservice.service';
import { Component, OnInit, ViewChild, ViewEncapsulation } from "@angular/core";
import { ColumnMode, DatatableComponent } from "@swimlane/ngx-datatable";
import Swal from "sweetalert2";
import { Subject } from "rxjs";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import {
  UntypedFormGroup,
  UntypedFormBuilder,
  Validators,
  FormGroup,
} from "@angular/forms";
import { Router } from '@angular/router';
import { SharedService } from 'app/components/Shared Servece/shared.service';


@Component({
  selector: 'app-subcategory-list',
  templateUrl: './subcategory-list.component.html',
  styleUrls: ['./subcategory-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [repeaterAnimation]

})
export class SubcategoryListComponent implements OnInit {
  private tempData: any;
  @ViewChild(DatatableComponent) table: DatatableComponent;
  @ViewChild("tableRowDetails") tableRowDetails: any;
  public isLoading = false 

  public sidebarToggleRef = false;
  public category: AdminSelectCategory;
  public rows: Subcategoryinterface;

  public data: Subcategoryinterface;

  public selectedOption = 10;
  public ColumnMode = ColumnMode;
  public temp: any;
  public searchValue = "";
  public modalReference:any;
  public modalReference2:any;  
  public modalReference3:any;  
  public modalReference4:any;  
  public modalReferenceAddSubCategoryThird:any;  
  public subcategory_id:number=0;
  
  public UpdatedCategory_id:any;
  public UpdatedSubCategory_id:any;
  public UpdatedCategory_title:any;


  public ReactiveOrderStatusForm: UntypedFormGroup;
  public ReactiveOrderStatusFormAddThird: UntypedFormGroup;
  public ReactiveOrderStatusFormSubmitted = false;


  public CreateSubCategoryForm: UntypedFormGroup;
  public CreateSubCategoryFormSubmitted = false;


// For Feature 
  public items = [{ itemName_en: '', itemName_ar: '' }];
  public item = { itemName_en: '', itemName_ar: '' };

  public subItems = [{subItemName: '' }];
  public subItem = {subItemName: '',}

  public loading = false;
  public loadAddSub = true;

  // Received Category Id 
  public CategoryId: number | null = null;
  public Category_Id: number | null = null;
  public subCategoryData ;

  // Upload Photo Variable
  public file:File;
  public fileName=''
   
  // Add Copy value 
  public featuresItems = [{ name_en: '', name_ar: '',from:'' }];
  public featureItems = {name_en: '', name_ar: '',from:''};
  public addCopyValueForm:FormGroup; 
  public addCopyValueFormSubmitted =false ; 
  public featureDate:any; 
  public category_id:number; 



  constructor(
    private _Subcategoryserv: SubcategoryserviceService,
    private modalService: NgbModal,
    private formBuilder: UntypedFormBuilder,
    private router: Router,
    private sharedService: SharedService
  ) {
    this.CreateSubCategoryForm = this.formBuilder.group({
      featuresItems: this.formBuilder.array([]) // إنشاء مصفوفة من الميزات
    });

    
    // Create SubCategory Form
    this.CreateSubCategoryForm = this.formBuilder.group({
      parent_id: ["", [Validators.required]],
      name_en: ['', [ Validators.required,Validators.minLength(2),Validators.maxLength(50), Validators.pattern(/^[A-Za-z0-9\s\-&()!'@_%$]+$/)]],
      name_ar: ['', [Validators.required, Validators.minLength(2),Validators.maxLength(50),Validators.pattern(/^[\u0600-\u06FF0-9\s\-&()!'@_%$]+$/)]],      
      // image: ["", []],
    });
    

    // <!-- Update Sub Category Form -->
    this.ReactiveOrderStatusForm = this.formBuilder.group({
      parent_id: ["", [Validators.required]],
      name_en: ['', [Validators.required,Validators.minLength(2), Validators.maxLength(50), Validators.pattern(/^[A-Za-z0-9\s\-&()!'@_%$]+$/)]],
      name_ar: ['', [ Validators.required,  Validators.minLength(2), Validators.maxLength(50), Validators.pattern(/^[\u0600-\u06FF0-9\s\-&()!'@_%$]+$/)]],
      // image: ["", []],
    });
    
    // <!-- Add Third SubCategory Form -->
    this.ReactiveOrderStatusFormAddThird = this.formBuilder.group({
      name_en: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50),Validators.pattern(/^[A-Za-z0-9\s\-&()!'@_%$]+$/)]],
      name_ar: ['', [ Validators.required, Validators.minLength(2),Validators.maxLength(50), Validators.pattern(/^[\u0600-\u06FF0-9\s\-&()!'@_%$]+$/)]],
      image: ["", []],
    });

    // <!-- Add Copy Value Form -->
    this.addCopyValueForm = this.formBuilder.group({
      from: ['', Validators.required],
      name_en: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50),Validators.pattern(/^[A-Za-z0-9\s\-&()!'@_%$]+$/)]],
      name_ar: ['', [ Validators.required, Validators.minLength(2),Validators.maxLength(50), Validators.pattern(/^[\u0600-\u06FF0-9\s\-&()!'@_%$]+$/)]],
    });
  
  }

    //

    // AddCopyFeatureValue Controls
    get AddCopyFeatureValueControls() {
      return this.addCopyValueForm.controls;
    }
  
    // CreateSubCategory Controls
    get CreateSubCategoryControls() {
      return this.CreateSubCategoryForm.controls;
    }

    // Update Sub Controls
    get ReactiveOSForm() {
      return this.ReactiveOrderStatusForm.controls;
    }

    // Add Third Level  Controls
    get ReactiveOSFormThird() {
      return this.ReactiveOrderStatusFormAddThird.controls;
  }




  ngOnInit(): void {
    this.getAllSubCategory();

      // Received Category Id
    // this.sharedService.currentId$.subscribe((id) => {
    //   this.CategoryId = id;
    //   if (this.CategoryId) {
    //     this.getAllSubCategory();
    //   }
    // });
    // this.getFirstSubCategory();
  }

  


  // Navigate and send row id
  navigateSubIdWithState(SubCategoryId: number): void {
    this.sharedService.changeId(SubCategoryId);
    console.log(SubCategoryId);
  }

  getFirstSubCategory() {
    console.log(this.CategoryId);
    this._Subcategoryserv.getSubCategory(this.CategoryId).subscribe(
      (res) => {
        console.log('Subcategory Data:', res);
       this.subCategoryData = res
       console.log(this.subCategoryData);
       
      },
      (error) => {
        console.error('Error fetching subcategory:', error);
      }
    );
  }


// Feature 
  deleteItem(id) {
    for (let i = 0; i < this.items.length; i++) {
      if (this.items.indexOf(this.items[i]) === id) {
        this.items.splice(i, 1);
        break;
      }
    }
  }

  addItem() {
    this.items.push({
      itemName_en: '',
      itemName_ar: ''
    });
  }


  GetAllFeature() {
    this._Subcategoryserv.getAllFeature().subscribe(
      (res: any) => {
        console.log(res);
        
      },
      (er: any) => {
        Swal.fire({
          position: "center",
          icon: "info",
          title: "There Are No Feature  ",
          showConfirmButton: true,
        });
        console.log(er);
      }
    );
  }

// Copy Feature Value
  deleteFeatureItem(id) {
    for (let i = 0; i < this.featuresItems.length; i++) {
      if (this.featuresItems.indexOf(this.featuresItems[i]) === id) {
        this.featuresItems.splice(i, 1);
        break;
      }
    }
  }
  
  addFeatureItem() {
    this.featuresItems.push({
      name_en: '',  
      name_ar: '',
      from: '', 
    });
  }

  

  
  // Get all SubCategoryy
  getAllSubCategory() {
    this._Subcategoryserv.getAllSubCategory().subscribe(
      (res: any) => {
        this.rows = res;
        this.tempData = res;
        console.log(this.rows );
        

      },
      (er: any) => {
        console.log(er);
      }
    );
  }

  // Upload Photo 
  onFilechange(event: any) {
    this.file = event.target.files[0];
    this.fileName = this.file.name;
    console.log(this.fileName);
  }

  filterUpdate(event) {
    const val = event.target.value.toLowerCase();
  
    // Filter our data based on both name_en and name_ar
    const temp = this.tempData.filter(function (d) {
      return (
        d.name_en.toLowerCase().indexOf(val) !== -1 || // Search by English name
        d.name_ar.toLowerCase().indexOf(val) !== -1 || // Search by Arabic name
        !val // Return all rows if search is empty
      );
    });
  
    // Update the rows
    this.rows = temp;
    // Reset to the first page whenever the filter changes
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


 // <!-- Add SubCategory  Model-->
  modalOpenVC(modalVC) {
    
    this.loadAddSub=false;
    
    this._Subcategoryserv.getAllCategory().subscribe(
      (res: any) => {
        this.category = res;
        
        this.CreateSubCategoryFormSubmitted = false;
        this.CreateSubCategoryForm.reset();
        this.modalReference = this.modalService.open(modalVC, {
          backdrop: false,
          centered: true,
        });
        this.loadAddSub=true;
        
      },
      (er: any) => {
        this.loadAddSub=true;
        Swal.fire({
          position: "center",
          icon: "error",
          title: "An Error Occurred While Get Category ",
          showConfirmButton: false,
          timer: 1500,
        });
      
        
      }
    );
  }
    // <!-- Add SubCategory  -->
    AddSubCategoryMethod() {
      this.isLoading = true;

      this.CreateSubCategoryFormSubmitted = true;
  
      if (this.CreateSubCategoryForm.invalid) {
        return;
      }
  
        var formData = new FormData();
        // formData.append("image",this.file);
        formData.append("name_en",this.CreateSubCategoryControls.name_en.value);
        formData.append("name_ar",this.CreateSubCategoryControls.name_ar.value);
        formData.append("parent_id",this.CreateSubCategoryControls.parent_id.value);
        formData.append("is_parent","1");

      
  
      this._Subcategoryserv.addSubCategory(formData).subscribe(
          (re: any) => {
            this.isLoading = false;
            this.modalReference.close();
            if(re.message == "category saved successfully"){
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Sub Category Has been Added Successfully ",
                showConfirmButton: false,
                timer: 1500,
              });
              this.getAllSubCategory();
            }
          },
  
          (er: any) => {
            this.isLoading = false;
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


  // <!-- Add SubCategory  (Sub El Sub)  -->
  ReactiveFormOnSubmit() {
    this.isLoading = true;

    console.log("Reactive Form OnSubmit - Parent ID:", this.subcategory_id);
    this.ReactiveOrderStatusFormSubmitted = true;

    if (this.ReactiveOrderStatusFormAddThird.invalid) {
      console.log("Invalid Form Control:", this.ReactiveOSFormThird);

      return;
    }

    if (this.file) {
      console.log("Reactive Form OnSubmit - IF:", this.subcategory_id);
      var formData = new FormData();
      formData.append("image",this.file);
      formData.append("name_en",this.ReactiveOSFormThird.name_en.value);
      formData.append("name_ar",this.ReactiveOSFormThird.name_ar.value);
      formData.append("parent_id",this.subcategory_id.toString());
      formData.append("is_parent","0");
    }
    
    console.log("Reactive Form OnSubmit - formData:", formData);

    this._Subcategoryserv.addSubCategory(formData).subscribe(
        (re: any) => {
          this.isLoading = false;

          if(re.message == "category saved successfully"){
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Sub Category Has been Added Successfully ",
              showConfirmButton: false,
              timer: 1500,
            });
            this.modalReferenceAddSubCategoryThird.close();
            this.getAllSubCategory();
          }
        },

        (er: any) => {
          this.isLoading = false;

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

  // <!-- Add SubCategory Model  -->
modalAddThirdSubCategory(modalSubThirdCat, id) {
  this.subItems = [{subItemName: ''}];
  this.ReactiveOrderStatusFormSubmitted = false;
  this.ReactiveOrderStatusFormAddThird.reset();
  this.modalReferenceAddSubCategoryThird = this.modalService.open(modalSubThirdCat, {
    backdrop: false,
    centered: true,
  });
  

  this.subcategory_id = id;
}

  //<!--  Delete SubCategory -->
  DeleteSubCategory(id: number, name: string) {
    console.log(id);

    Swal.fire({
      title: `Are you sure Want To Delete Sub Category : ${name} ?`,
      text: "You won't be able to revert this!",
      icon: "error",
      showCancelButton: true,
      confirmButtonColor: "#4c54f5",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes , Delete it",
    }).then((result) => {
      if (result.isConfirmed) {
        this._Subcategoryserv.DeleteSubCategory(id).subscribe(
          (re: any) => {
            this.getAllSubCategory();
            Swal.fire(
              "Deleted!",
              "Sub Category has been Deleted Successfully .",
              "success"
            );
          },
          (err: any) => {
            Swal.fire({
              position: "center",
              icon: "error",
              title: "An Error Occurred While Deleting Sub Category",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        );
      }
    });
  }


  // <!-- Add featuer Model -->
  modalAddFeature(modalCreateFeature: any, id: number) {
    this.items = [{ itemName_en: '', itemName_ar: '' }];
    this.subcategory_id = id;
  
    this.modalReference4 = this.modalService.open(modalCreateFeature, {
      backdrop: false,
      centered: true,
    });
    console.log("Modal opened with subcategory ID:", id);
  }

  // <!-- Add featuer  -->
  AddFeatureMethod() {
    this.isLoading = true;
  // this.Category_Id= id    

    const features = this.items.map(item => {
      return {
        name_en: item.itemName_en,
        name_ar: item.itemName_ar
      };
    });
    const data = {
      features: features,
      category_id: this.subcategory_id
    };
    
    console.log(features);
    console.log(this.subcategory_id);
    
  
    this._Subcategoryserv.addSubFeature(data)
      .subscribe(
        (re: any) => {
          this.isLoading = false;

          console.log(re.message)
          console.log(re)

          Swal.fire({
            position: "center",
            icon: "success",
            title: "Features Have Been Added Successfully",
            showConfirmButton: false,
            timer: 1500,
          });
          this.getAllSubCategory();
          this.modalReference4.close(); 
        },
        (er: any) => {
          this.isLoading = false;
          Swal.fire({
            position: "center",
            icon: "error",
            title: "An Error Occurred While Adding Features!",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      );
  }
  
  // <!-- Update Sub Category -->
  ReactiveUpdateSubCatFormOnSubmit() {
    this.isLoading = true;

    this.ReactiveOrderStatusFormSubmitted = true;
  
  
    // Check if the form is valid before proceeding
    if (this.ReactiveOSForm.invalid) {
      return;
    }

      // Prepare formData
      var formData = new FormData();
        
      formData.append("name_en", this.ReactiveOSForm.name_en.value);
      formData.append("name_ar", this.ReactiveOSForm.name_ar.value);
      formData.append("parent_id", this.ReactiveOSForm.parent_id.value);
      formData.append("_method", "PUT");


    this._Subcategoryserv
      .updateSubCategory(formData , this.UpdatedCategory_id).subscribe(
        (re: any) => {
          this.isLoading = false;
          this.getAllSubCategory();
          this.modalReference3.close();
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Sub Category Has been Updated Successfully ",
            showConfirmButton: false,
            timer: 1500,
          });
        },

        (er: any) => {
          this.isLoading = false;
          Swal.fire({
            position: "center",
            icon: "error",
            title: "An Error Occurred While Updated Sub Category !",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      );
  }

  // <!-- Update Category Model-->(3)
    modalOpenUpdateSubC(modelUpdateSubCat ,UpdatedCategory_id ) {

      this.UpdatedCategory_id=UpdatedCategory_id;      
  
      this._Subcategoryserv.getAllCategory().subscribe(
        (res: any) => {
          this.category = res;
          
          this.ReactiveOrderStatusFormSubmitted = false;
          this.ReactiveOrderStatusForm.reset();
          this.modalReference3 = this.modalService.open(modelUpdateSubCat, {
            backdrop: false,
            centered: true,
          });
          
        },
        (er: any) => {
          Swal.fire({
            position: "center",
            icon: "error",
            title: "An Error Occurred While Get Category ",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      );
  
    }



    // Add Copy Feature value  Model (2)
AddCopyFeatureValueModel(modelAddCopyValue, rowId) {
  this.category_id = rowId
  console.log(this.category_id );
    
    this._Subcategoryserv.getAllFeature().subscribe(
      (res: any) => {
        this.featureDate = res;
        this.modalReference2 = this.modalService.open(modelAddCopyValue, {
          backdrop: false,
          centered: true,
        });
        this.loading = false;        
      },
      (er: any) => {
        Swal.fire({
          position: "center",
          icon: "info",
          title: "There Are No Feature  ",
          showConfirmButton: true,
        });
        console.log(er);
      }
    );
  }
  
  // Add Copy Feature value  Method 
  AddCopyFeatureValue(){
    this.loading = true;
  console.log(this.featuresItems);
    const features = this.featuresItems.map(item => ({
      name_en: item.name_en, 
      name_ar: item.name_ar, 
      from: item.from 
    }));
    
    const data = {
      features: features,
      category_id: this.category_id 
    };
    
    console.log(data);


    this._Subcategoryserv.AddCopyFeatureValue(data).subscribe(
      (res: any) => {
        this.loading = false;
        this.GetAllFeature();
        this.modalReference2.close();
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Features have been added successfully",
          showConfirmButton: false,
          timer: 1500,
        });
      },
      (err: any) => {
        this.loading = false;
        Swal.fire({
          position: "center",
          icon: "error",
          title: "An error occurred while adding the feature!",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    );
  
  }
  




  



}
