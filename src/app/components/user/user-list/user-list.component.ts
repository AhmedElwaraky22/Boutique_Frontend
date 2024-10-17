import { UsersService } from './../users.service';
import { UserData } from './../../../main/sample/modules/user-data';
import { ColumnMode, DatatableComponent } from "@swimlane/ngx-datatable";
import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import Swal from "sweetalert2";
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  encapsulation: ViewEncapsulation.None,

})
export class UserListComponent implements OnInit {
  private tempData: any;
  @ViewChild(DatatableComponent) table: DatatableComponent;
  @ViewChild('tableRowDetails') tableRowDetails: any;

  public sidebarToggleRef = false;
  public rows: UserData;
  public selectedOption = 10;
  public ColumnMode = ColumnMode;
  public temp: any;
  public searchValue = "";
  constructor(private _userServices:UsersService ) { }

  ngOnInit(): void {
    this.GetAllUsers();
  }


  filterUpdate(event) {
    // Reset ng-select on search
    const val = event.target.value.toLowerCase();

    // Filter Our Data
    const temp = this.tempData.filter(function (d) {
      return (
        d.full_name.toLowerCase().indexOf(val) !== -1 ||
        d.email.toLowerCase().indexOf(val) !== -1 ||
        d.phone.toLowerCase().indexOf(val) !== -1 ||
        d.created_at.toLowerCase().indexOf(val) !== -1 ||
        !val
      );
    });

    // Update The Rows
    this.rows = temp;
    // Whenever The Filter Changes, Always Go Back To The First Page
    this.table.offset = 0;
  }

  GetAllUsers() {
    this._userServices.GetAllUsers().subscribe(
      (res: any) => {
        this.rows = res;
        this.tempData = res;
      },
      (er: any) => {
        Swal.fire({
          position: "center",
          icon: "info",
          title: "There Are No New User  ",
          showConfirmButton: true,
        });
        console.log(er);
      }
    );
  }




  SuspendUser(id: number, name: string) {
    Swal.fire({
      title: `Are you sure Want To Suspend User : ${name} ?`,
      text: "You won't be able to revert this!",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes , Suspend",
    }).then((result) => {
      if (result.isConfirmed) {
        this._userServices.BannedUser(id).subscribe(
          (re: any) => {
            this.GetAllUsers();
            Swal.fire(
              "Suspended!",
              "User has been Suspend Successfully .",
              "success"
            );
          },
          (err: any) => {
            Swal.fire({
              position: "center",
              icon: "error",
              title: "An Error Occurred While Suspending The User",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        );
      }
    });
  }

  ActiveUser(id: number, name: string) {
    Swal.fire({
      title: `Are you sure Want To Active User : ${name} ?`,
      text: "You won't be able to revert this!",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#4cbc84",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes , Active User ",
    }).then((result) => {
      if (result.isConfirmed) {
        this._userServices.ActiveUser(id).subscribe(
          (re: any) => {
            this.GetAllUsers();
            Swal.fire(
              "Activated!",
              "User has been Active Successfully .",
              "success"
            );
          },
          (err: any) => {
            Swal.fire({
              position: "center",
              icon: "error",
              title: "An Error Occurred While Activating The User",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        );
      }
    });
  }

  DeleteUser(id: number, name: string) {
    Swal.fire({
      title: `Are you sure Want To Delete User : ${name} ?`,
      text: "You won't be able to revert this!",
      icon: "error",
      showCancelButton: true,
      confirmButtonColor: "#4c54f5",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes , Delete IT ",
    }).then((result) => {
      if (result.isConfirmed) {
        this._userServices.DeleteUser(id).subscribe(
          (re: any) => {
            this.GetAllUsers();
            Swal.fire(
              "Deleted!",
              "User has been Deleted Successfully .",
              "success"
            );
          },
          (err: any) => {
            Swal.fire({
              position: "center",
              icon: "error",
              title: "An Error Occurred While Deleting The User",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        );
      }
    });
  }
  RestoreUser(id: number, name: string) {
    Swal.fire({
      title: `Are you sure Want To ReStore User : ${name} ?`,
      text: "You won't be able to revert this!",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#4c54f5",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes , ReStore ",
    }).then((result) => {
      if (result.isConfirmed) {
        this._userServices.RestoreUser(id).subscribe(
          (re: any) => {
            this.GetAllUsers();
            Swal.fire(
              "Restore!",
              "User has been ReStore Successfully .",
              "success"
            );
          },
          (err: any) => {
            
            Swal.fire({
              position: "center",
              icon: "error",
              title: "An Error Occurred While Restoring The User",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        );
      }
    });
  }
}
