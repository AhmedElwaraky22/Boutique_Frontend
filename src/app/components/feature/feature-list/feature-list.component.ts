import { repeaterAnimation } from './../../subcategory/subcategory-list/form-repeater.animation';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FeatureservService } from './../featureserv.service';
import { Featureinterface } from './../../../main/sample/modules/featureinterface';
import { ColumnMode, DatatableComponent } from "@swimlane/ngx-datatable";
import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import Swal from "sweetalert2";
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-feature-list',
  templateUrl: './feature-list.component.html',
  styleUrls: ['./feature-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [repeaterAnimation]
})

export class FeatureListComponent implements OnInit {
  private tempData: any;
  @ViewChild(DatatableComponent) table: DatatableComponent;
  @ViewChild('tableRowDetails') tableRowDetails: any;

  public sidebarToggleRef = false;
  public rows: Featureinterface;
  public selectedOption = 10;
  public ColumnMode = ColumnMode;
  public temp: any;
  public searchValue = "";
  public feature_id:number=0;
  public value_id:number=0;
  public modalReference:any;  
  public modalReference2:any;  
  public modalReference3:any;  
  public modalReference4:any;  
  public modalReference5:any;  
  public modalReference6:any;  
  public modalUpdateValue:any;  
  public loading = false;
  public updatedValue :any;        

  
  public items = [{ value_en: '', value_ar: '' }];
  public item = {value_en: '', value_ar: ''};
  
  public featuresItems = [{ name_en: '', name_ar: '',from:'' }];
  public featureItems = {name_en: '', name_ar: '',from:''};
  public name_en: string = ''; 
  public name_ar: string = ''; 
  public value_ar: string = ''; 
  public value_en: string = ''; 
  public addCopyValueForm:FormGroup; 
  public addCopyValueFormSubmitted =false ; 
  public featureDate; 
  public category_id; 



  constructor(private _featureServices:FeatureservService,    private modalService: NgbModal,private fb: FormBuilder) { 

    this.addCopyValueForm = this.fb.group({
      from: ['', Validators.required],
      name_en: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50),Validators.pattern(/^[A-Za-z0-9\s\-&()!'@_%$]+$/)]],
      name_ar: ['', [ Validators.required, Validators.minLength(2),Validators.maxLength(50), Validators.pattern(/^[\u0600-\u06FF0-9\s\-&()!'@_%$]+$/)]],
    });
  }
    

  // AddCopyFeatureValueControls
  get AddCopyFeatureValueControls() {
    return this.addCopyValueForm.controls;
  }

  ngOnInit(): void {
    this.GetAllFeature();
  }


  filterUpdate(event) {
    // Reset ng-select on search
    const val = event.target.value.toLowerCase();

    // Filter Our Data
    const temp = this.tempData.filter(function (d) {
      return (
        d.feature_name.toLowerCase().indexOf(val) !== -1 ||
        d.category_name.toLowerCase().indexOf(val) !== -1 ||
        d.subCategory_title.toLowerCase().indexOf(val) !== -1 ||
        !val
      );
    });

    this.rows = temp;
    this.table.offset = 0;
  }

  GetAllFeature() {
    this._featureServices.getAllFeature().subscribe(
      (res: any) => {
        this.rows = res;
        this.tempData = res;
        // console.log(this.rows);
        
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

  addItem() {
    this.items.push({
      value_en: '',  
      value_ar: ''   
    });
  }

  deleteItem(id) {
    for (let i = 0; i < this.items.length; i++) {
      if (this.items.indexOf(this.items[i]) === id) {
        this.items.splice(i, 1);
        break;
      }
    }
  }
  
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


// Add New Feature value  Model (2)
AddFeatureValueModel(modelAddValue, id) {
  this.items = [{ value_en: '', value_ar: '' }];
  this.modalReference2 = this.modalService.open(modelAddValue, {
    backdrop: false,
    centered: true,
  });
  this.feature_id = id;
  console.log(this.feature_id);
}

// Add New Feature Value Method
AddNewFeatureValue() {
  this.loading = true;
  
  // console.log(this.items.map(a => ({ name_en: a.name_en, name_ar: a.name_ar })));

  let values = this.items.map(a => ({
    value_en: a.value_en,
    value_ar: a.value_ar
  }));
  console.log(values ,this.feature_id);

  if (values.length === 0) {
    console.error("Values array is empty!");
    return; 
  }

  this._featureServices.addFeatureValues(values, this.feature_id).subscribe(
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

// Add Copy Feature value  Model (3)
AddCopyFeatureValueModel(modelAddCopyValue, rowId) {
  
this.category_id = rowId      //feature Id 
console.log(this.category_id );

  
  this._featureServices.getAllFeature().subscribe(
    (res: any) => {
      this.featureDate = res;
      this.addCopyValueFormSubmitted = false;
      // this.addCopyValueForm.reset();
      this.modalReference3 = this.modalService.open(modelAddCopyValue, {
        backdrop: false,
        centered: true,
      });
      this.loading = false;
      console.log(this.featureDate);
      
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
  // this.addCopyValueFormSubmitted= true
  this.loading = true;
    
// var formData = new FormData();
// var features = [];
// formData.append('from', this.addCopyValueForm.get('from').value); 
// formData.append('name_ar', this.addCopyValueForm.get('name_ar').value);
// formData.append('name_en', this.addCopyValueForm.get('name_en').value);
// features
// formData.forEach((value, key) => {
  
//   console.log(`${key}: ${value}`);
// });


const features = this.featuresItems.map(item => ({
  name_en: item.name_en, 
  name_ar: item.name_ar, 
  from: item.from 
}));
console.log(features);


// Create the final data object
const data = {
  features: features,
  category_id: this.category_id 
};

// Log the data object
// console.log(data);

  this._featureServices.AddCopyFeatureValue(data).subscribe(
    (res: any) => {
      this.loading = false;
      this.GetAllFeature();
      this.modalReference3.close();
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


// Edit Feature Value Name Model (5)
EditFeatureValueModel(modelEditValue , valueId: number, value_en:string , value_ar:string ){

  this.value_id = valueId; 
  this.value_en = value_en;
  this.value_ar = value_ar; 
  console.log(this.value_id ,this.value_en ,this.value_ar );

  this.modalReference5 = this.modalService.open(modelEditValue, {
    backdrop: false,
    centered: true,
  });
  this.items = [
    { value_en: value_en, value_ar: value_ar }
  ];
}

// Edit Feature Value Name Method
EditFeatureValue() {
  this.loading = true;

  if (this.items.length === 0) {
    console.error("Values array is empty!");
    this.loading = false;
    return;
  }

  for (const item of this.items) {
    if (!item.value_en || !item.value_ar) {
      console.error("Both English and Arabic values are required.");
      this.loading = false;
      return;
    }
  }

  var payload = {
    value_en: this.items[0].value_en,  
    value_ar: this.items[0].value_ar  
  };
  console.log(payload);
  

  
  this._featureServices.updateFeatureValue(payload,this.value_id).subscribe(
    (res: any) => {   
      this.modalReference5.close();
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Feature has been updated successfully",
        showConfirmButton: false,
        timer: 1500,
      });
      this.loading = false;
      this.GetAllFeature();
    },
    (err: any) => {
      console.error("Error:", err);
      this.loading = false;
      Swal.fire({
        position: "center",
        icon: "error",
        title: "An error occurred while updating the feature!",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  );
}


// Edit Feature Model (0)
EditFeatureModel(modelEditFeature: any, id: number, value_en: string, value_ar: string) {
  this.feature_id = id; 
  this.name_en = value_en;
  this.name_ar = value_ar; 

  this.modalReference = this.modalService.open(modelEditFeature, {
    backdrop: false,
    centered: true,
  });
}

// Edit Feature Method 
  EditFeatureName(id: number) {
    this.loading = true;

  console.log('Updated English Name:', this.name_en);
  console.log('Updated Arabic Name:', this.name_ar);  

  const payload = {
    name_en: this.name_en, 
    name_ar: this.name_ar  
  };
  console.log(this.name_en);
  console.log(this.name_ar);
  

  // Check if the names are empty (optional validation)
  if (!this.name_en || !this.name_ar) {
    console.error("Name fields are empty!");
    return;
  }
  console.log(payload); 


  // this._featureServices.updateFeature( this.name_en , this.name_ar  , this.feature_id).subscribe(
  //   (res: any) => {
    
  //     Swal.fire({
  //       position: "center",
  //       icon: "success",
  //       title: "Feature has been updated successfully",
  //       showConfirmButton: false,
  //       timer: 1500,
  //     });
  //     this.loading = false;
  //     this.modalReference.close(); 
  //     this.GetAllFeature(); 
  //   },
  //   (err: any) => {
  //     this.loading = false;
  //     Swal.fire({
  //       position: "center",
  //       icon: "error",
  //       title: "An error occurred while updating the feature!",
  //       showConfirmButton: false,
  //       timer: 1500,
  //     });
  //   }
  // );
}

// Delete Feature Method
  DeleteFeature(id: number, name: string) {
    Swal.fire({
      title: `Are you sure Want To Delete Feature : ${name} ?`,
      text: "You won't be able to revert this!",
      icon: "error",
      showCancelButton: true,
      confirmButtonColor: "#4c54f5",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes , Delete it",
    }).then((result) => {
      if (result.isConfirmed) {
        this._featureServices.DeleteFeature(id).subscribe(
          (re: any) => {
            this.GetAllFeature();
            Swal.fire(
              "Deleted!",
              "Feature has been Deleted Successfully .",
              "success"
            );
          },
          (err: any) => {
            Swal.fire({
              position: "center",
              icon: "error",
              title: "An Error Occurred While Deleting Feature",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        );
      }
    });
  }

// Delete Feature Value Method
  DeleteFeatureValue(id: number, name: string) {
    Swal.fire({
      title: `Are you sure Want To Delete Feature Value : ${name} ?`,
      text: "You won't be able to revert this!",
      icon: "error",
      showCancelButton: true,
      confirmButtonColor: "#4c54f5",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes , Delete it",
    }).then((result) => {
      if (result.isConfirmed) {
        this._featureServices.DeleteFeatureValue(id).subscribe(
          (re: any) => {
            this.GetAllFeature();
            Swal.fire(
              "Deleted!",
              "Feature Value has been Deleted Successfully .",
              "success"
            );
          },
          (err: any) => {
            Swal.fire({
              position: "center",
              icon: "error",
              title: "An Error Occurred While Deleting Feature Value",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        );
      }
    });
  }


}

