// import { ThirdSubCategory } from './../../../main/sample/modules/sub-details-interface';
import { SubDetailsServiceService } from '../sub-details-service.service';
import { SubcategoryserviceService } from 'app/components/subcategory/subcategoryservice.service';

import { AdminSelectCategory } from './../../../main/sample/modules/admin-select-category';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { repeaterAnimation } from 'app/components/subcategory/subcategory-list/form-repeater.animation';
import Swal from 'sweetalert2';
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import {UntypedFormGroup,UntypedFormBuilder,Validators, FormGroup,} from "@angular/forms";
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
import { SharedService } from 'app/components/Shared Servece/shared.service';


@Component({
  selector: 'app-sub-details-list',
  templateUrl: './sub-details-list.component.html',
  styleUrls: ['./sub-details-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [repeaterAnimation]
})

export class SubDetailsListComponent implements OnInit {

  @ViewChild(DatatableComponent) table: DatatableComponent;
  @ViewChild("tableRowDetails") tableRowDetails: any;
  public isLoading = false
  private tempData: any;
  public sidebarToggleRef = false;
  public category: AdminSelectCategory;
  public rows: any;
  public selectedOption = 10;
  public ColumnMode = ColumnMode;
  public temp: any;
  public searchValue = "";
  public modalReference:any;
  public modalReference2:any;  
  public modalReference3:any;  
  public modalReference4:any;  
  public subcategory_id:number=0;
  public UpdatedThirdSubCategory_id:any;
  public UpdatedSubCategory_id:any;
  public UpdatedCategory_title:any;
  public ReactiveOrderStatusForm: UntypedFormGroup;
  public ReactiveOrderStatusFormSubmitted = false;
  public loading = false;
  public loadAddSub = true;
  // For Feature 
  public items = [{ itemName_en: '', itemName_ar: '' }];
  public item = { itemName_en: '', itemName_ar: '' };
  // Add Copy value 
  public featuresItems = [{ name_en: '', name_ar: '',from:'' }];
  public featureItems = {name_en: '', name_ar: '',from:''};
  public addCopyValueForm:FormGroup; 
  public addCopyValueFormSubmitted =false ; 
  public featureDate:any; 
  public category_id:number; 
  // Upload Photo Variable
  public file:File;
  public fileName=''
  public Category_id ;;
  // Received Category Id 
  public SubCategoryId: number | null = null;
  public secondSubData ;


  constructor(
    // private _Subcategoryserv: SubcategoryserviceService,
    private _SubDetailsServe : SubDetailsServiceService,
    private modalService: NgbModal,
    private formBuilder: UntypedFormBuilder,
    private sharedService: SharedService
  ) {


    this.ReactiveOrderStatusForm = this.formBuilder.group({
      parent_id: ["", [Validators.required]],
      name_en: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50),Validators.pattern(/^[A-Za-z0-9\s\-&()!'@_.%$]+$/)]],
      name_ar: ['', [ Validators.required, Validators.minLength(2),Validators.maxLength(50), Validators.pattern(/^[\u0600-\u06FF0-9\s\-&()!'@_.%$]+$/)]],
      image: ["", [Validators.required]],
    });

    
    this.addCopyValueForm = this.formBuilder.group({
      from: ['', Validators.required],
      name_en: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50),Validators.pattern(/^[A-Za-z0-9\s\-&()!'@_.%$]+$/)]],
      name_ar: ['', [ Validators.required, Validators.minLength(2),Validators.maxLength(50), Validators.pattern(/^[\u0600-\u06FF0-9\s\-&()!'@_.%$]+$/)]],
    });

   }

  ngOnInit(): void {
    this.getThirdSubCategory();  
  }

  // AddCopyFeatureValueControls
  get AddCopyFeatureValueControls() {
    return this.addCopyValueForm.controls;
  }
  
  get ReactiveOSForm() {
    return this.ReactiveOrderStatusForm.controls;
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

  GetAllFeature() {
    this._SubDetailsServe.getAllFeature().subscribe(
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


  // Get Second And Third Sub 
  getThirdSubCategory() {
    this._SubDetailsServe.getThirdSubCategory().subscribe(
      (res: any) => {
        this.rows = res;
        // console.log( this.rows[17].category_image);
        // console.log( this.rows[17].image);

        this.tempData = res;
        // console.log(this.rows);

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
    // Reset ng-select on search
    const val = event.target.value.toLowerCase();
    // Filter Our Data
    const temp = this.tempData.filter(function (d) {
      return (
        d.name_ar.toLowerCase().indexOf(val) !== -1 ||
        d.name_en.toLowerCase().indexOf(val) !== -1 ||
        !val
      );
    });

    // Update The Rows
    this.rows = temp;
    // Whenever The Filter Changes, Always Go Back To The First Page
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


//////////////////////////////////
// Add Sub Model
  modalOpenVC(modalVC) {
    
  //   this.loadAddSub=false;
    
  //   this._SubDetailsServe.getAllCategory().subscribe(
  //     (res: any) => {
  //       this.category = res;
  //       console.log(this.category);        
  //       this.ReactiveOrderStatusFormSubmitted = false;
  //       this.ReactiveOrderStatusForm.reset();
  //       this.modalReference = this.modalService.open(modalVC, {
  //         backdrop: false,
  //         centered: true,
  //       });
  //       this.loadAddSub=true;
        
  //     },
  //     (er: any) => {
  //       this.loadAddSub=true;
  //       Swal.fire({
  //         position: "center",
  //         icon: "error",
  //         title: "An Error Occurred While Get Category ",
  //         showConfirmButton: false,
  //         timer: 1500,
  //       });
      
        
  //     }
  //   );
  }

  // ReactiveOSFormOnSubmit() {
  //   this.ReactiveOrderStatusFormSubmitted = true;
  //   if (this.ReactiveOrderStatusForm.invalid) {
  //     return;
  //   }
  //   if (this.file) {
  //     var formData = new FormData();
  //     formData.append("image",this.file);
  //     formData.append("name_en",this.ReactiveOSForm.name_en.value);
  //     formData.append("name_ar",this.ReactiveOSForm.name_ar.value);
  //     formData.append("parent_id",this.ReactiveOSForm.parent_id.value);
  //   }
    
  //   this._Subcategoryserv.addSubCategory(formData).subscribe(
  //       (re: any) => {
  //         if(re.message == "category saved successfully"){
  //           Swal.fire({
  //             position: "center",
  //             icon: "success",
  //             title: "Sub Category Has been Added Successfully ",
  //             showConfirmButton: false,
  //             timer: 1500,
  //           });
  //         }
  //         this.getAllSubCategory();
  //         this.modalReference2.close();
  //       },
  //       (er: any) => {
  //         Swal.fire({
  //           position: "center",
  //           icon: "error",
  //           title: "An Error Occurred While Add Sub Category !",
  //           showConfirmButton: false,
  //           timer: 1500,
  //         });
  //       }
  //     );
  // }
/////////////////////////////////////////





  
  
  // Get all SubCategoryy
  getAllSubCategory() {
    this._SubDetailsServe.getAllSubCategory().subscribe(
      (res: any) => {
        // this.rows = res;
        this.tempData = res;

      },
      (er: any) => {
        console.log(er);
      }
    );
  }

  
  // <!-- Update Third SubCategory Model-->
   modalOpenUpdateSubC(updataThirdModel , parent_id , sub_id , UpdatedCategory_name_ar ,UpdatedCategory_name_en ) {
    this.Category_id=parent_id;      
    this.UpdatedThirdSubCategory_id = sub_id    
    console.log(this.Category_id);
    console.log(this.UpdatedThirdSubCategory_id);
    
    this._SubDetailsServe.getThirdSubCategory().subscribe(
      (res: any) => {
        this.category = res;
        
        this.ReactiveOrderStatusFormSubmitted = false;
        this.ReactiveOrderStatusForm.reset();
        this.modalReference3 = this.modalService.open(updataThirdModel, {
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
   
  // <!-- Update Sub Category -->
  UpdateThirdLevel() {
    this.isLoading = true;

    this.ReactiveOrderStatusFormSubmitted = true;
  
    if (this.ReactiveOSForm.invalid) {
      return;
    }
  
    if (this.file) {
      const formData = new FormData();
      formData.append("name_en", this.ReactiveOSForm.name_en.value);
      formData.append("name_ar", this.ReactiveOSForm.name_ar.value);
      formData.append("parent_id", this.Category_id);
      formData.append("image", this.file);  // Append the actual file instead of form control value
      formData.append("_method", "PUT");
  
      // Log the form data for debugging
      formData.forEach((value, key) => {
        console.log(key, value);
      });
  
      console.log("Parent ID:", formData.get("parent_id"));
  
      this._SubDetailsServe.updateThirdSubCategory(formData, this.UpdatedThirdSubCategory_id)
        .subscribe(
          (response: any) => {
            this.isLoading = false;

            this.getThirdSubCategory();
            this.modalReference3.close();
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Sub Category Has been Updated Successfully",
              showConfirmButton: false,
              timer: 1500,
            });
          },
          (error: any) => {
            this.isLoading = false;

            Swal.fire({
              position: "center",
              icon: "error",
              title: "An Error Occurred While Updating Sub Category!",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        );
    }
  }

  // Add Feature Model 
  modalAddFeature(modalCreateFeature: any, id: number) {
      this.items = [{ itemName_en: '', itemName_ar: '' }];
      this.subcategory_id = id;
    
      this.modalReference4 = this.modalService.open(modalCreateFeature, {
        backdrop: false,
        centered: true,
      });
      console.log("Modal opened with subcategory ID:", id);
  }

  // Add Feature Method
  AddFeatureMethod() {
      this.loading = true;
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
      
    
      this._SubDetailsServe.addSubFeature(data)
        .subscribe(
          (re: any) => {
            console.log(re.message)
            console.log(re)
            this.loading = false;

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
            this.loading = false;
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

  // Add Copy Feature value  Model (3)
  AddCopyFeatureValueModel(modelAddCopyValue, rowId) {
          this.category_id = rowId
          console.log(this.category_id );
            
            this._SubDetailsServe.getAllFeature().subscribe(
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


    this._SubDetailsServe.AddCopyFeatureValue(data).subscribe(
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

  
  // DeleteSubCategory Method
  DeleteSubCategory(id: number, name_ar: string): void {
        Swal.fire({
          title: `Are you sure Want To Delete ${name_ar}؟`,
          text: "You won't be able to revert this!",
          icon: "error",
          showCancelButton: true,
          confirmButtonColor: "#4c54f5",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes , Delete it",
        }).then((result) => {
          if (result.isConfirmed) {
            this._SubDetailsServe.deleteCategory(id).subscribe(
              () => {
                Swal.fire(
                  "Deleted!",
                  `${name_ar} has been Deleted Successfully .`,
                  "success"
                );
                this.getThirdSubCategory()
              },
              (error) => {
                Swal.fire({
                  position: "center",
                icon: "error",
                title: "An Error Occurred While Deleting ",
                showConfirmButton: false,
                timer: 1500
                });
                console.error("Error while deleting category:", error);
              }
            );
          }
        });
  }
      

}
