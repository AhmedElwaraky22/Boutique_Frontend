import { Component, OnInit } from '@angular/core';
import { OrderservService } from '../orderserv.service';
import { ColumnMode } from "@swimlane/ngx-datatable";


@Component({
  selector: 'app-previous-shipment',
  templateUrl: './previous-shipment.component.html',
  styleUrls: ['./previous-shipment.component.scss']
})
export class PreviousShipmentComponent implements OnInit {
  public isLoading = false;
  public perviousShipments;
  public searchValue = "";
  public selectedOption = 10;
  public ColumnMode = ColumnMode;



  constructor(  
      private _orderServices: OrderservService,) 
      {}
  

  ngOnInit(): void {
    this.allPeriousShipment()
  }

  allPeriousShipment(){
    this.isLoading = true
    this._orderServices.getAllPerviousShipment().subscribe(
      (res:any)=>{
        this.isLoading = false
        this.perviousShipments = res.data
        console.log( this.perviousShipments);
      },
      (err)=>{
        this.isLoading = false
        console.log(err.error.message);
      }
    )
      
  }

  filterUpdate(e){}


  getStatusClass(status: string): string {
    switch (status) {
      case 'Delivered':
        return 'badge badge-success'; // لون أخضر للحالة "Delivered"
      case 'Pending':
        return 'badge badge-warning'; // لون أصفر للحالة "Pending"
      case 'Canceled':
        return 'badge badge-danger'; // لون أحمر للحالة "Canceled"
      default:
        return 'badge badge-secondary'; // لون رمادي للحالات الأخرى
    }
  }
}
