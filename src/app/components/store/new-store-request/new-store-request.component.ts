import { StoreSService } from './../store-s.service';
import { StoreInterface } from './../../../main/sample/modules/store-interface';
import { ColumnMode, DatatableComponent } from "@swimlane/ngx-datatable";
import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import Swal from "sweetalert2";

@Component({
  selector: 'app-new-store-request',
  templateUrl: './new-store-request.component.html',
  styleUrls: ['./new-store-request.component.scss'],
  encapsulation: ViewEncapsulation.None,

})
export class NewStoreRequestComponent implements OnInit {
  private tempData: any;
  @ViewChild(DatatableComponent) table: DatatableComponent;
  @ViewChild('tableRowDetails') tableRowDetails: any;

  public sidebarToggleRef = false;
  public rows: StoreInterface;
  public selectedOption = 10;
  public ColumnMode = ColumnMode;
  public temp: any;
  public searchValue = "";

  constructor(    private _storeServices: StoreSService
    ) { }

  ngOnInit(): void {
    this.getAllNewStoreReq();
  }

  // get All New Store Req
  getAllNewStoreReq() {
    this._storeServices.GetAllNewStoresRequest().subscribe(
      (res: any) => {
        this.rows = res;
        this.tempData = res;
        console.log(this.rows);
        
      },
      (er: any) => {
        Swal.fire({
          position: "center",
          icon: "info",
          title: "There Are No New Store Requests",
          showConfirmButton: true,
        });
        console.log(er);
      }
    );
  }


// Search  
  filterUpdate(event) {
    const val = event.target.value.toLowerCase();
    this.rows = this.tempData.filter(function (d) {
      return (
        d.store_name?.toLowerCase().indexOf(val) !== -1 ||
        d.store_slug?.toLowerCase().indexOf(val) !== -1 ||
        d.email?.toLowerCase().indexOf(val) !== -1 ||
        d.store_url?.toLowerCase().indexOf(val) !== -1 ||
        d.store_phone?.toLowerCase().indexOf(val) !== -1 ||
        !val
      );
    });

    // Update The Rows
    // this.rows = temp;
    // Whenever The Filter Changes, Always Go Back To The First Page
    if (this.table) {
      this.table.offset = 0;
    }
  }
  



  VerifyStore(id: number, name: string) {
    Swal.fire({
      title: `Are you sure Want To Verify Store : ${name} ?`,
      text: "You won't be able to revert this!",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#117864",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes , Verify Store ",
    }).then((result) => {
      if (result.isConfirmed) {
        this._storeServices.VerifyStore(id).subscribe(
          (re: any) => {
            this.getAllNewStoreReq();
            Swal.fire(
              "Verified!",
              "Store has been Verified Successfully .",
              "success"
            );
          },
          (err: any) => {
            Swal.fire({
              position: "center",
              icon: "error",
              title: "An Error Occurred While Verifying The Store",
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
            this.getAllNewStoreReq();
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
            this.getAllNewStoreReq();
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

  CancelRegister(id: number, name: string) {
    Swal.fire({
      title: `Are you sure you want to cancel registration for store: ${name}?`,
      html: `
        <textarea id="cancelReason" class="swal2-textarea" placeholder="Enter the reason for cancellation" style="width: 100%;"></textarea>
      `,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#117864",
      confirmButtonText: "Yes, Cancel Registration",
      cancelButtonText: "No, Keep Registration",
      preConfirm: () => {
        const reason = (document.getElementById("cancelReason") as HTMLTextAreaElement)?.value;
        if (!reason) {
          Swal.showValidationMessage("Please enter a reason for cancellation.");
          return null;
        }
        return reason;
      },
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        const reason = result.value; // Get the entered reason
        this._storeServices.RestoreStore(id).subscribe(
          (response: any) => {
            this.getAllNewStoreReq(); // Refresh the store requests
            Swal.fire(
              "Cancelled!",
              "Store registration has been cancelled successfully.",
              "success"
            );
          },
          (error: any) => {
            Swal.fire({
              position: "center",
              icon: "error",
              title: "An error occurred while cancelling the registration.",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        );
      }
    });
  }
  
}
