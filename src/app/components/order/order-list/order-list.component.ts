import { OrderInterface } from "./../../../main/sample/modules/order-interface";
import { OrderservService } from "./../orderserv.service";
import { Component, OnInit, ViewChild, ViewEncapsulation } from "@angular/core";
import { ColumnMode, DatatableComponent } from "@swimlane/ngx-datatable";
import Swal from "sweetalert2";
import { Subject } from "rxjs";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import {
  UntypedFormGroup,
  UntypedFormBuilder,
  Validators,
} from "@angular/forms";

import { formatDate } from "@angular/common";
import { subscribeOn } from "rxjs/operators";

@Component({
  selector: "app-order-list",
  templateUrl: "./order-list.component.html",
  styleUrls: ["./order-list.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class OrderListComponent implements OnInit {
  private tempData: any;
  @ViewChild(DatatableComponent) table: DatatableComponent;
  @ViewChild("tableRowDetails") tableRowDetails: any;


  
  public isLoading = false;
  public id = 1;
  public rows = []; // Data source for the table

  public sidebarToggleRef = false;
  // public rows: OrderInterface;
  public selectedOption = 10;
  public ColumnMode = ColumnMode;
  public temp: any;
  public searchValue = "";
  public modalReference:any;
  private _unsubscribeAll: Subject<any>;

  shipment_id:number=0
  public previousVerifiedFilter = "";
  public previousSuspendedFilter = "";
  public previousDeletedFilter = "";

  public ReactiveOrderStatusForm: UntypedFormGroup;
  public ReactiveOrderStatusFormSubmitted = false;
  public loaders:boolean = true;

  public IsSuspended: any = [
    { name: "All", value: "" },
    { name: "True", value: "true" },
    { name: "false", value: "false" },
  ];

  // OrderStatus
  public OrderStatus: any = [
    { name: "New", value: "New" },
    { name: "Preparing", value: "Preparing" },
    { name: "On the way", value: "On the way"},
    { name: "Delivered", value: "Delivered" },
    { name: "Not Delivered", value:  "Not Delivered"},
    { name: "Canceled by User", value: "Canceled by User" },
    { name: "Canceled by Store", value: "Canceled by Store"},
  ];
  // New ///////////////////////////////////////////////////

  // public isLoading = false;
  // public rows = [];
  // public selectedStatus: string = this.newOrderStatus[0]?.value || '';

  public selectedStatus = 'Pending'; // Default active status
  public newOrderStatus = [
    { name: 'Pending', value: 'Pending' },
    // { name: 'On the way', value: 'On the way' },
    { name: 'Delivered', value: 'Delivered' },
    // { name: 'To Ware House', value: 'To Ware House' },
  ];


 // New ///////////////////////////////////////////////////
  public OrderStatuss: any = [
    { name: "Preparing", value: 1 },
    { name: "On the way", value: 2},
    { name: "Delivered", value: 3 },
    { name: "Not Delivered", value:  4},
    { name: "Canceled by User", value: 5 },
    { name: "New", value: 6 },
    { name: "Canceled by Store", value: 7},
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

  constructor(
    private _orderServices: OrderservService,
    private modalService: NgbModal,
    private formBuilder: UntypedFormBuilder
  ) {

    this.ReactiveOrderStatusForm = this.formBuilder.group({
      change_id: ["", [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.getAllOrders();
    this.getAll();
    this.onStatusChange(this.selectedStatus); // Load default status data
    // this.getCanceled(); 


  }

  onStatusChange(status: string): void {
    this.selectedStatus = status; // Update the selected status
    console.log(this.selectedStatus);

    this.isLoading = true;

    switch (status) {
      case "Pending":
        this.getPendingData();
        break;
      // case "On the way":
      //   this.getAllOnTheWayOrders();
      //   break;
      case "Delivered":
        this.getAllDeliveredOrders();
        break;
      // case "To Ware House":
      //   this.getAlltoWareHouse();
      //   break;
      default:
        this.isLoading = false;
        console.log("Unknown status:", status);
    }
  }

  // All Order 
  getAllOrders() {
    this.loaders = true;
    this._orderServices.getAllOrders().subscribe(
      (res: any) => {
        this.loaders = false;
        
        this.rows = res.data;
        this.tempData = res;
        console.log(this.rows);
  
      },
      (er: any) => {
        console.log(er);
      }
    );
  }

  // get All Pervious Orders
  getAllDeliveredOrders(){
    this.loaders = true;
    this._orderServices.GetDeliveredOrders().subscribe(
      (res: any) => {
        this.loaders = false;
           this.rows = res.data;
        this.tempData = res;
        
      },
      (er: any) => {
        console.log(er);
      }
    );
  }

  // get All to WareHouse
  getAlltoWareHouse(){
    this.loaders = true;
    this._orderServices.GetToWareHouse().subscribe(
      (res: any) => {
        this.loaders = false;
        console.log(res)
        this.rows = res.data;
        this.tempData = res;
        console.log( this.rows );
        
      },
      (er: any) => {
        console.log(er);
      }
    );
  }

  getAll(){
    this.loaders = true;
    this._orderServices.getById(this.id).subscribe(
      (res: any) => {
        this.loaders = false;
        console.log(res)
        this.rows = res.data;
        this.tempData = res;
        console.log( this.rows );
        
      },
      (er: any) => {
        console.log(er);
      }
    );
  }

  getAllOnTheWayOrders(){}

  getPendingData(){
    this.loaders = true;
    this._orderServices.GetOrdersPending().subscribe( 
      (res: any) => {
        this.loaders = false;
        console.log(res)
        this.rows = res.data;
        this.tempData = res;
        console.log( this.rows );
      },
      (er: any) => {
        console.log(er);
      }
    )
  }


  getCanceled(){
    // alert("Canceled")
    this._orderServices.GetOrdersCancelled().subscribe(
      (res)=>{
        console.log(res);
      },
      (err)=>{
        console.log(err);
      }
    )
  }

  filterUpdate(event: any) {
    // Reset ng-select filters
    this.selectedVerified = this.IsVerified[0];
    this.selectedSuspend = this.IsSuspended[0];
    this.selectedDeleted = this.IsDeleted[0];
  
    // Get the search input value and convert to lowercase
    const val = event.target.value.toLowerCase();
  
    // Filter through tempData based on the search value
    this.rows = this.tempData.filter((d) => {
      return (
        d.store_name?.toLowerCase().includes(val) ||
        d.shipment_uid?.toLowerCase().includes(val) ||
        d.placed_on?.toLowerCase().includes(val) ||
        d.client_name?.toLowerCase().includes(val) ||
        d.client_phone?.toLowerCase().includes(val) ||
        d.store_phone?.toLowerCase().includes(val) ||
        d.order_status?.toLowerCase().includes(val) ||
        !val // Show all data if search value is empty
      );
    });
  
    // Reset pagination to the first page after filtering
    if (this.table) {
      this.table.offset = 0;
    }
  }

  filterRows(verifiedFilter, suspendFilter, deletedFilter): any[] {
    // Reset search on select change
    this.searchValue = "";

    verifiedFilter = verifiedFilter.toLowerCase();
    suspendFilter = suspendFilter.toLowerCase();
    deletedFilter = deletedFilter.toLowerCase();

    return this.tempData.filter((row) => {
      const isPartialNameMatch =
        row.order_status.toString().toLowerCase().indexOf(verifiedFilter) !== -1 ||
        !verifiedFilter;
      const isPartialGenderMatch =
        `${row.store_name}`.toLowerCase().indexOf(suspendFilter) !== -1 ||
        !suspendFilter;
      const isPartialStatusMatch =
        row.client_name.toString().toLowerCase().indexOf(deletedFilter) !== -1 ||
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

  // Model Change status 
  modalOpenVC(modalVC,id) {
    this.ReactiveOrderStatusFormSubmitted = false;
    this.ReactiveOrderStatusForm.reset();
   this.modalReference = this.modalService.open(modalVC, {
      backdrop: false,
      centered: true,
    });

    this.shipment_id=id;
  }

  get ReactiveOSForm() {
    return this.ReactiveOrderStatusForm.controls;
  }

  // changeStatus 
  ReactiveOSFormOnSubmit() {
    this.ReactiveOrderStatusFormSubmitted = true;

    if (this.ReactiveOrderStatusForm.invalid) {
      return;
    }
    console.log(this.ReactiveOrderStatusForm.value);

    this.ReactiveOSForm.change_id.patchValue(
      this.ReactiveOSForm.change_id.value.map(function (item) {
        return item["value"];
      })
    );
    this.ReactiveOSForm.change_id.patchValue(
      this.ReactiveOSForm.change_id.value.toString()
    );
    console.log(this.ReactiveOrderStatusForm.value);
    // return;
    // this._orderServices
    //   .ChangeStatus(this.ReactiveOrderStatusForm.value, this.shipment_id)
    //   .subscribe(
    //     (re: any) => {
    //       this.getAllOrders();
    //       this.modalReference.close();
    //       Swal.fire({
    //         position: "center",
    //         icon: "success",
    //         title: "Order Status Has been Changed Successfully ",
    //         showConfirmButton: false,
    //         timer: 1500,
    //       });
    //     },
    //     (er: any) => {
    //       Swal.fire({
    //         position: "center",
    //         icon: "error",
    //         title: "An Error Occurred While change Order Status !",
    //         showConfirmButton: false,
    //         timer: 1500,
    //       });
    //     }
      // );
  }


  navigate(id:number){
  console.log(id);
  }


  
}
