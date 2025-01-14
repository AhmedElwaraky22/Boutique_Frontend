import { ProblemServiceService } from './../problem-service.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DatatableComponent, ColumnMode } from '@swimlane/ngx-datatable';
import { TagServiceService } from 'app/components/tag/tag-service.service';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-problem-list',
  templateUrl: './problem-list.component.html',
  styleUrls: ['./problem-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ProblemListComponent implements OnInit {


  private tempData: any;
  @ViewChild(DatatableComponent) table: DatatableComponent;
  @ViewChild("tableRowDetails") tableRowDetails: any;

  public sidebarToggleRef = false;
  public rows: any;
  public selectedOption = 10;
  public ColumnMode = ColumnMode;
  public temp: any;
  public searchValue = "";
  public user_id: any;
  private _unsubscribeAll: Subject<any>;


  public previousVerifiedFilter = "";
  public previousSuspendedFilter = "";
  public previousDeletedFilter = "";

  public loadAddCat = true;




  public ReactiveUpdateCatForm: UntypedFormGroup;
  public ReactiveUpdateCatFormSubmitted = false;


  constructor(private _PoroblemServ: ProblemServiceService,
    private _TagsServ: TagServiceService,
    private http: HttpClient,
    private modalService: NgbModal,
    private formBuilder: UntypedFormBuilder
  ) {









  }

  ngOnInit(): void {
    // this.get_user();
    // this.getAllProblems();






  }

  get_user() {
    this.user_id = JSON.parse(localStorage.getItem("currentUser")).id;
    console.log(this.user_id);
  }


  filterUpdate(event) {
    // Reset ng-select on search
    const val = event.target.value.toLowerCase();
    // Filter Our Data
    const temp = this.tempData.filter(function (d) {
      return (
        d.user.user_name.toLowerCase().indexOf(val) !== -1 ||
        !val
      );
    });

    // Update The Rows
    this.rows = temp;
    // Whenever The Filter Changes, Always Go Back To The First Page
    this.table.offset = 0;
  }





  getAllProblems() {
    this._PoroblemServ.getAllProblem().subscribe(
      (res: any) => {
        this.rows = res;
        console.log(this.rows);
        this.tempData = res;
      },
      (er: any) => {
        console.log(er);
      }
    );
  }


  mark_solved(id) {
    this._PoroblemServ.changeStatus({ id: id, status: "solved" }).subscribe(
      (res: any) => {
        this.getAllProblems();

        Swal.fire({
          position: "center",
          icon: "success",
          title: "problem status chnged Successfully ",
          showConfirmButton: false,
          timer: 1500,
        });
      },
      (er: any) => {

        Swal.fire({
          position: "center",
          icon: "error",
          title: "An Error Occurred While Changing  !",
          showConfirmButton: false,
          timer: 1500,
        });

      }
    );
  }


  track(id) {
    this._PoroblemServ.changeStatus({ id: id, status: 'track' }).subscribe(
      (res: any) => {
        this.getAllProblems();

        Swal.fire({
          position: "center",
          icon: "success",
          title: "problem status chnged Successfully ",
          showConfirmButton: false,
          timer: 1500,
        });
      },
      (er: any) => {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "An Error Occurred While Changing  !",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    );







  }

  delete(id) { }





  // testpay()
  // {
  //   this._PoroblemServ.pay().subscribe(
  //     (res: any) => {


  //                 Swal.fire({
  //                   position: "center",
  //                   icon: "success",
  //                   title: "go ",
  //                   showConfirmButton: false,
  //                   timer: 1500,
  //                 });
  //                 console.log(res);

  //                 window.location.href =res.pay_link;


  //     },
  //     (er: any) => {

  //       Swal.fire({
  //                     position: "center",
  //                     icon: "error",
  //                     title: "An Error Occurred While Changing  !",
  //                     showConfirmButton: false,
  //                     timer: 1500,
  //                   });

  //     }
  //   );
  // }















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














  // add_tags(){



  // if(this.tags.length == 0)
  //  return;




  // console.log(this.tags)


  //   this._TagsServ
  //       . addTags(this.tags)
  //       .subscribe(
  //         (re: any) => {
  //           this.getAllCategory();
  //           this.tags=[]
  //           this.modalReference.close();
  //           Swal.fire({
  //             position: "center",
  //             icon: "success",
  //             title: "tags added Successfully ",
  //             showConfirmButton: false,
  //             timer: 1500,
  //           });
  //         },

  //         (er: any) => {
  //           Swal.fire({
  //             position: "center",
  //             icon: "error",
  //             title: "An Error Occurred While adding  !",
  //             showConfirmButton: false,
  //             timer: 1500,
  //           });
  //         }
  //       );





  // }







  //   ReactiveUpdateFormOnSubmit() {
  //     this.ReactiveUpdateCatFormSubmitted = true;

  //     if (this. ReactiveUpdateCatForm.invalid) {
  //       return;
  //     }


  //     // if( this.ReactiveUpdForm.name.value=='')
  //     //       return;


  // console.log(this.ReactiveUpdForm.name.value);

  //     const name=this.ReactiveUpdForm.name.value;



  //     this._TagsServ
  //       .updateTag({name:name} ,this.category_id)
  //       .subscribe(
  //         (re: any) => {
  //           this.getAllCategory();

  //           this.modalReference3.close();
  //           Swal.fire({
  //             position: "center",
  //             icon: "success",
  //             title: "tag added Successfully ",
  //             showConfirmButton: false,
  //             timer: 1500,
  //           });
  //         },

  //         (er: any) => {
  //           Swal.fire({
  //             position: "center",
  //             icon: "error",
  //             title: "An Error Occurred While adding  !",
  //             showConfirmButton: false,
  //             timer: 1500,
  //           });
  //         }
  //       );
  //   }


}
