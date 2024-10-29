import { StoreInterface } from "./../../../main/sample/modules/store-interface";
import { StoreSService } from "./../store-s.service";
import { CoreConfigService } from "./../../../../@core/services/config.service";
import { Component, OnInit, ViewChild, ViewEncapsulation } from "@angular/core";
import { ColumnMode, DatatableComponent } from "@swimlane/ngx-datatable";
import Swal from "sweetalert2";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from "rxjs";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { filter } from "rxjs/operators";
import { log } from 'console';
@Component({
  selector: "app-all-stores",
  templateUrl: "./all-stores.component.html",
  styleUrls: ["./all-stores.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class AllStoresComponent implements OnInit {
  private tempData: any;
  @ViewChild(DatatableComponent) table: DatatableComponent;
  @ViewChild("tableRowDetails") tableRowDetails: any;
 
  public sidebarToggleRef = false;
  public rows: StoreInterface;
  public isLoading: boolean = false;
  public selectedOption = 10;
  public ColumnMode = ColumnMode;
  public productProperties:any;
  public data:any;
  public storeCats: any;
  public selectedStoreId:any;
  public selectedStoreName:any;
  public fo: FormGroup;
  public category: any;
  public loadAddCat: any;
  public catSelected:any;
  public temp: any;
  public modalReference: any;
  public searchValue = "";
  public CreateNewCategoryFormSubmitted = "";
  public CreateNewCategoryForm = "";
  private _unsubscribeAll: Subject<any>;

  public previousVerifiedFilter = "";
  public previousSuspendedFilter = "";
  public previousDeletedFilter = "";

  public IsSuspended: any = [
    { name: "All", value: "" },
    { name: "True", value: "true" },
    { name: "false", value: "false" },
  ];

  public IsVerified: any = [
    { name: "All", value: "" },
    { name: "True", value: "true" },
    { name: "False", value: "false" },
  ];
  public IsDeleted: any = [
    { name: "All", value: "" },
    { name: "True", value: "true" },
    { name: "False", value: "false" },
  ];

  public selectedSuspend = [];
  public selectedVerified = [];
  public selectedDeleted = [];
  public storeId;

  constructor(
    private _storeServices: StoreSService,
    private modalService: NgbModal,
    private fb: FormBuilder
  ) {
    this.fo = this.fb.group({
      parent_id: [[]], 
    });
  }

  ngOnInit(): void {
    this.getAllStoreData();
    this.getAllCategory();
  }

    // get all Store 
  getAllStoreData() {
    this._storeServices.GetAllStore().subscribe(
      (res: any) => {
        this.rows = res;
        this.tempData = res;
      },
      (er: any) => {
        console.log(er);
      }
    );
  }
  // get all catgegory 
  getAllCategory() {
    this._storeServices.getAllCategory().subscribe(
      (res: any) => {
        this.category = res;
      },
      (er: any) => {
        console.log(er);
      }
    );
  }



  // Model Add New Category to store
  addCategoryModel(editCategoryStore, id) {
      this.productProperties = this.tempData.filter(pro => pro.id == id);
      if (this.productProperties) { 
        this.selectedStoreName = this.productProperties[0]?.store_name;
    }

      this.modalReference = this.modalService.open(editCategoryStore, {
        backdrop: "static",
        centered: true,
      });


      this.storeId= id
      console.log( id);
      // console.log(this.storeCats);
      
  }

  addCategoryToStore() {
    const selectedCategories = this.fo.get('parent_id')?.value;
    console.log("Selected Categories:", selectedCategories);
    this._storeServices.addCategoryToStore(this.storeId ,selectedCategories).subscribe(
      (res:any)=>{
        this.isLoading=false;
        this.modalReference.close();
        this.getAllStoreData();

        Swal.fire({
          position: "center",
          icon: "success",
          title: "category added Successfully ",
          showConfirmButton: false,
          timer: 1500,
        });
      },
      (err)=>{
        this.isLoading=false;
        Swal.fire({
          position: "center",
          icon: "error",
          title: "An Error Occurred While adding  !",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    )
  }
  
  SuspendUser(id: number, name: string) {
    Swal.fire({
      title: `Are you sure Want To Suspend Store : ${name} ?`,
      text: "You won't be able to revert this!",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes , Suspend",
    }).then((result) => {
      if (result.isConfirmed) {
        this._storeServices.BannedStore(id).subscribe(
          (re: any) => {
            this.getAllStoreData();
            Swal.fire(
              "Suspended!",
              "Store has been Suspend Successfully .",
              "success"
            );
          },
          (err: any) => {
            Swal.fire({
              position: "center",
              icon: "error",
              title: "An Error Occurred While Suspending The Store",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        );
      }
    });
  }

  ActiveStore(id: number, name: string) {
    Swal.fire({
      title: `Are you sure Want To Active Store : ${name} ?`,
      text: "You won't be able to revert this!",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#4cbc84",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes , Active Store ",
    }).then((result) => {
      if (result.isConfirmed) {
        this._storeServices.ActiveStore(id).subscribe(
          (re: any) => {
            this.getAllStoreData();
            Swal.fire(
              "Activated!",
              "Store has been Active Successfully .",
              "success"
            );
          },
          (err: any) => {
            Swal.fire({
              position: "center",
              icon: "error",
              title: "An Error Occurred While Activating The Store",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        );
      }
    });
  }

  DeleteStore(id: number, name: string) {
    Swal.fire({
      title: `Are you sure Want To Delete Store : ${name} ?`,
      text: "You won't be able to revert this!",
      icon: "error",
      showCancelButton: true,
      confirmButtonColor: "#4c54f5",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes , Delete IT ",
    }).then((result) => {
      if (result.isConfirmed) {
        this._storeServices.DeleteStore(id).subscribe(
          (re: any) => {
            this.getAllStoreData();
            Swal.fire(
              "Deleted!",
              "Store has been Deleted Successfully .",
              "success"
            );
          },
          (err: any) => {
            Swal.fire({
              position: "center",
              icon: "error",
              title: "An Error Occurred While Deleting The Store",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        );
      }
    });
  }

  RestoreStore(id: number, name: string) {
    Swal.fire({
      title: `Are you sure Want To Restore Store : ${name} ?`,
      text: "You won't be able to revert this!",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#4c54f5",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes , Restore IT ",
    }).then((result) => {
      if (result.isConfirmed) {
        this._storeServices.RestoreStore(id).subscribe(
          (re: any) => {
            this.getAllStoreData();
            Swal.fire(
              "Restored!",
              "Store has been Restore Successfully .",
              "success"
            );
          },
          (err: any) => {
            Swal.fire({
              position: "center",
              icon: "error",
              title: "An Error Occurred While Restoring The Store",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        );
      }
    });
  }

  filterUpdate(event) {
    // Reset ng-select on search

    this.selectedVerified = this.IsVerified[0];
    this.selectedSuspend = this.IsSuspended[0];
    this.selectedDeleted = this.IsDeleted[0];
    const val = event.target.value.toLowerCase();

    // Filter Our Data
    const temp = this.tempData.filter(function (d) {
      return (
        d.store_name.toLowerCase().indexOf(val) !== -1 ||
        d.store_slug.toLowerCase().indexOf(val) !== -1 ||
        d.email.toLowerCase().indexOf(val) !== -1 ||
        d.store_url.toLowerCase().indexOf(val) !== -1 ||
        d.store_phone.toLowerCase().indexOf(val) !== -1 ||
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

  filterByVerified(event) {
    const filter = event ? event.value : "";
    this.previousVerifiedFilter = filter;
    this.temp = this.filterRows(
      filter,
      this.previousSuspendedFilter,
      this.previousDeletedFilter
    );
    this.rows = this.temp;
  }

  filterBySuspended(event) {
    const filter = event ? event.value : "";
    this.previousSuspendedFilter = filter;
    this.temp = this.filterRows(
      this.previousVerifiedFilter,
      filter,
      this.previousDeletedFilter
    );
    this.rows = this.temp;
  }

  filterByDeleted(event) {
    const filter = event ? event.value : "";
    this.previousDeletedFilter = filter;
    this.temp = this.filterRows(
      this.previousVerifiedFilter,
      this.previousSuspendedFilter,
      filter
    );
    this.rows = this.temp;
  }

  // ngOnDestroy(): void {
  //   // Unsubscribe from all subscriptions
  //   this._unsubscribeAll.next();
  //   this._unsubscribeAll.complete();
  // }
}
