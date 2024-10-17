import { Component, OnInit, ViewChild } from '@angular/core';
import { ColumnMode, DatatableComponent } from "@swimlane/ngx-datatable";
import Swal from "sweetalert2";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HomeProductsService } from '../home-products.service';

@Component({
  selector: 'app-new-arrival-list',
  templateUrl: './new-arrival-list.component.html',
  styleUrls: ['./new-arrival-list.component.scss']
})

export class NewArrivaListComponent implements OnInit {
  @ViewChild(DatatableComponent) table: DatatableComponent;

  public tempData: any[] = []; 
  public products: any; 
  public searchValue = "";
  public ColumnMode = ColumnMode;
  public loadProduct = true
  public selectedOption: number = 10;  
  public rows: any[] = []; 

  constructor(
    private _HomeProductService: HomeProductsService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.GetNewArrivalProducts(); 
  }

  filterUpdateCategory(): void {
    const selectedProduct = this.searchValue; 
    if (!selectedProduct) {
      // console.log('All Products selected, fetching all data...');
      this.GetNewArrivalProducts(); 
      return;
    }
    console.log('Selected Product:', selectedProduct);
    this.tempData = this.products.data.filter((product) => product.product_name === selectedProduct);
    this.rows = this.tempData; 
    this.table.offset = 0;
  }

  GetNewArrivalProducts(): void {
    this._HomeProductService.GetNewArrival().subscribe({
      next: (res) => {          
        this.products = res;  
        this.rows = this.products.data; 
        // console.log(this.rows);
      },
      error: (err) => {
        console.error(err);
        Swal.fire("Error", "Failed to load products", "error");
      }
    });
  }


  DeleteProduct(id:number , name:string):void {
    // console.log(id);
    // console.log(name);
    Swal.fire({
      title: `Are you sure Want To Delete Category : ${name} ?`,
      text: "You won't be able to revert this!",
      icon: "error",
      showCancelButton: true,
      confirmButtonColor: "#4c54f5",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes , Delete it",
    }).then((result) => {
      if (result.isConfirmed) {
        this._HomeProductService.deleteHomeProduct(id).subscribe(
          (re: any) => {
            this.GetNewArrivalProducts();
            Swal.fire(
              "Deleted!",
              "Category has been Deleted Successfully .",
              "success"
            );
          },
          (err: any) => {
            Swal.fire({
              position: "center",
              icon: "error",
              title: "An Error Occurred While Deleting The Category",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        );
      }
    });
  }
}
