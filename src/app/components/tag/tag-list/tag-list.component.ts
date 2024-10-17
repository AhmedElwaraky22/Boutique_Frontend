import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DatatableComponent, ColumnMode } from '@swimlane/ngx-datatable';

import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { TagServiceService } from '../tag-service.service';

@Component({
  selector: 'app-tag-list',
  templateUrl: './tag-list.component.html',
  styleUrls: ['./tag-list.component.scss']
})
export class TagListComponent implements OnInit {

  private tempData: any;
  @ViewChild(DatatableComponent) table: DatatableComponent;
  @ViewChild("tableRowDetails") tableRowDetails: any;

  public sidebarToggleRef = false;
  public rows: any;
  public selectedOption = 10;
  public ColumnMode = ColumnMode;
  public temp: any;
  public searchValue = "";
  public modalReference:any;
  public modalReference2:any;
  public modalReference3:any;
  private _unsubscribeAll: Subject<any>;
 public tag_name="";
  public category_id:number=0;
  shipment_id:number=0

  public previousVerifiedFilter = "";
  public previousSuspendedFilter = "";
  public previousDeletedFilter = "";

  public loadAddCat= true;
  public ReactiveOrderStatusForm: UntypedFormGroup;
  public ReactiveOrderStatusFormSubmitted = false;
   ul = document.querySelector("ul");
  input = document.querySelector("input");
  tagNumb = document.querySelector(".details span");
   maxTags = 10;
  public tags = [];
count=10;



  public ReactiveUpdateCatForm: UntypedFormGroup;
  public ReactiveUpdateCatFormSubmitted = false;


  constructor(
    private _TagsServ:TagServiceService,
    private http:HttpClient,
    private modalService: NgbModal,
    private formBuilder: UntypedFormBuilder
  ) {

 



    this.ReactiveOrderStatusForm = this.formBuilder.group({
      name: ['', [Validators.required,Validators.minLength(2),Validators.maxLength(50),]],
      image: ["", [Validators.required]],
    });

    this.ReactiveUpdateCatForm = this.formBuilder.group({
      name: ['', [Validators.required,Validators.minLength(2),Validators.maxLength(50),]],
      image: ["", []],
    });

   
  
  
  }

  ngOnInit(): void {
    this.getAllCategory();
   this. countTags();
this. createTag();
const input= document.getElementById('tt');




    

  }

remove_all(){

  const list= document.getElementById('ui');

let childNodes= list.querySelectorAll('li')
for(let i = 0, j = childNodes.length; i < j; i++) {
  let childNode = childNodes[i]
  list.removeChild(childNode)
}


this.tags= [];
this.count=10;

}



  remov( tag){
    this.removetag(tag);
  
    document.getElementById(`${tag}`).parentElement.remove();
    this.countTags();
  }

  getAllCategory() {
    this._TagsServ.getAllCategory().subscribe(
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
  
test(){

  console.log('done');
  
}


  countTags(){
    document .getElementById('tt').focus();
   this. count=  this.maxTags - this.tags.length
   
   if (this.tagNumb instanceof HTMLElement) {
    this.tagNumb.innerText = `${this.maxTags - this.tags.length}`;
  }
    
}


createTag(){
  document .getElementById('ui')
  .querySelectorAll("li").forEach(li => li.remove());
  this.tags.slice().reverse().forEach(tag =>{
      let liTag = `<li  class=" text-light my-1 list-inline rounded-pill bg-info mx-2 px-2 py-2 " 
      list-style: none;
      border-radius: 5px !important;
       
      padding: 5px 8px 5px 10px !important;
      border: 1px solid #e3e1e1 !important;">${tag} <i  id='${tag}' class="uit uit-multiply cursor-pointer" "></i> </li>`;
      document .getElementById('ui').insertAdjacentHTML("afterbegin", liTag);
       
    let elm= document .getElementById(`${tag}`);
      
      
     elm .addEventListener("click", () =>{  elm.parentElement.remove();
      
      this.removetag(tag)
      this.countTags();
      console.log(this.tags);
      
    
    }
      );

  });
  this.countTags();
}




addTag(e){
  
  if(e.key == "Enter"){
    console.log(this.tags);
    
      let tag = e.target.value.replace(/\s+/g, ' ');
      console.log(tag);
      
      if(tag.length > 1 && !this.tags.includes(tag)){
          if(this.tags.length < 10){
              tag.split(',').forEach(tag => {
                if(!this.tags.includes(tag)){
                  this.tags.push(tag);
                  this.createTag();}
              });
          }
      }
      e.target.value = "";
  }
}
removetag(tag:string): void{ 
  this.tags= this.tags.filter(user => user !== tag)
}



  filterUpdate(event) {
    // Reset ng-select on search


    const val = event.target.value.toLowerCase();

    // Filter Our Data
    const temp = this.tempData.filter(function (d) {
      return (
        d.name.toLowerCase().indexOf(val) !== -1 ||
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






  modalOpenVC(modalVC) {
 this.loadAddCat= false;
 this.tags=[];
 this.count=10;
setTimeout(() => {this.loadAddCat= true
  
}, 300);
    this.ReactiveOrderStatusFormSubmitted = false;
    this.ReactiveOrderStatusForm.reset();
   this.modalReference = this.modalService.open(modalVC, {
      backdrop: false,
      centered: true,
    });

  }



  modalUpdaTag(modal,id,name) {
    this.ReactiveUpdateCatFormSubmitted = false;
   // this. ReactiveUpdateCatForm.reset();
   this.tag_name=name;

  //

  
   this.modalReference3 = this.modalService.open(modal, {
      backdrop: false,
      centered: true,
    });

    this.category_id=id;

  }





  get ReactiveOSForm() {
    return this.ReactiveOrderStatusForm.controls;
  }




  get ReactiveUpdForm() {
    return this.ReactiveUpdateCatForm.controls;
  }


  
  ReactiveOSFormOnSubmit() {
    this.ReactiveOrderStatusFormSubmitted = true;

    if (this.ReactiveOrderStatusForm.invalid) {
      return;
    }

    var formData = new FormData();






   
    this._TagsServ
      . addTags(formData)
      .subscribe(
        (re: any) => {
          this.getAllCategory();
          
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

add_tags(){



if(this.tags.length == 0)
 return;




console.log(this.tags)


  this._TagsServ
      . addTags(this.tags)
      .subscribe(
        (re: any) => {
          this.getAllCategory();
          this.tags=[]
          this.modalReference.close();
          Swal.fire({
            position: "center",
            icon: "success",
            title: "tags added Successfully ",
            showConfirmButton: false,
            timer: 1500,
          });
        },

        (er: any) => {
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







  ReactiveUpdateFormOnSubmit() {
    this.ReactiveUpdateCatFormSubmitted = true;

    if (this. ReactiveUpdateCatForm.invalid) {
      return;
    }
       

    // if( this.ReactiveUpdForm.name.value=='')
    //       return;

    
console.log(this.ReactiveUpdForm.name.value);

    const name=this.ReactiveUpdForm.name.value;


   
    this._TagsServ
      .updateTag({name:name} ,this.category_id)
      .subscribe(
        (re: any) => {
          this.getAllCategory();
         
          this.modalReference3.close();
          Swal.fire({
            position: "center",
            icon: "success",
            title: "tag added Successfully ",
            showConfirmButton: false,
            timer: 1500,
          });
        },

        (er: any) => {
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



}
