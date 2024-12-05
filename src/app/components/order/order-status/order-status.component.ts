import { Component, OnInit, ViewChild } from '@angular/core';
import { OrderservService } from '../orderserv.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { OrderInterface } from 'app/main/sample/modules/order-interface';
import { DatatableComponent, ColumnMode } from '@swimlane/ngx-datatable';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-order-status',
  templateUrl: './order-status.component.html',
  styleUrls: ['./order-status.component.scss']
})
export class OrderStatusComponent implements OnInit {
  private tempData: any;
  @ViewChild(DatatableComponent) table: DatatableComponent;
  @ViewChild("tableRowDetails") tableRowDetails: any;


  public sidebarToggleRef = false;
  public rows: OrderInterface;
  public selectedOption = 10;
  // public ColumnMode = this.ColumnMode;
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

  public OrderStatus: any = [
    { name: "New", value: "New" },
    { name: "Preparing", value: "Preparing" },
    { name: "On the way", value: "On the way"},
    { name: "Delivered", value: "Delivered" },
    { name: "Not Delivered", value:  "Not Delivered"},
    { name: "Canceled by User", value: "Canceled by User" },
    { name: "Canceled by Store", value: "Canceled by Store"},
  ];
  public OrderStatuss: any = [
    { name: "New", value: 6 },
    { name: "Preparing", value: 1 },
    { name: "On the way", value: 2},
    { name: "Delivered", value: 3 },
    { name: "Not Delivered", value:  4},
    { name: "Canceled by User", value: 5 },
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

  }
  ngOnInit(): void {
    this.getAllOrders();
  }

  getAllOrders() {
    this.loaders = true;
    this._orderServices.getAllOrders().subscribe(
      (res: any) => {
        this.loaders = false;

        this.rows = res.data;
        this.tempData = res;
        console.log( this.rows );
        
      },
      (er: any) => {
        console.log(er);
      }
    );
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

    
    this._orderServices
      .ChangeStatus(this.ReactiveOrderStatusForm.value, this.shipment_id)
      .subscribe(
        (re: any) => {
          this.getAllOrders();
          this.modalReference.close();
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Order Status Has been Changed Successfully ",
            showConfirmButton: false,
            timer: 1500,
          });
        },

        (er: any) => {
          Swal.fire({
            position: "center",
            icon: "error",
            title: "An Error Occurred While change Order Status !",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      );
  }



  navigate(id:number){
  console.log(id);

  }

}
